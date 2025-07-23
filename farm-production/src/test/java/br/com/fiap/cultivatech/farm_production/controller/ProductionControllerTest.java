package br.com.fiap.cultivatech.farm_production.controller;

import br.com.fiap.cultivatech.farm_production.model.Production;
import br.com.fiap.cultivatech.farm_production.service.ProductionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Testes unitários para o ProductionController.
 * Esta classe usa @WebMvcTest para testar a camada do controlador isoladamente,
 * fazendo o mock da camada de serviço.
 */
@WebMvcTest(ProductionController.class)
@TestPropertySource(properties = {"spring.cloud.config.enabled=false"})
class ProductionControllerTest {

    @Autowired
    private MockMvc mockMvc; // Usado para simular requisições HTTP

    @MockBean
    private ProductionService productionService; // Mock da dependência do serviço

    @Autowired
    private ObjectMapper objectMapper; // Usado para converter objetos para JSON e vice-versa

    private Production production1;
    private Production production2;

    @BeforeEach
    void setUp() {
        // Inicializa os objetos Production de mock antes de cada teste
        // Corrigido para usar o construtor correto e setters
        production1 = new Production("Tomato", "PLANTA", LocalDate.of(2025, 7, 20));
        production1.setId(1L);
        production1.setDataFim(LocalDate.of(2025, 9, 20));
        production1.setDiasColheita(60);

        production2 = new Production("Lettuce", "PLANTA", LocalDate.of(2025, 7, 21));
        production2.setId(2L);
    }

    @Test
    @DisplayName("Deve retornar todas as produções quando GET /api/production/cultivares for chamado")
    void getAllCultivars_shouldReturnAllProductions() throws Exception {
        // Arrange
        List<Production> allProductions = Arrays.asList(production1, production2);
        // Configura o serviço de mock para retornar nossa lista predefinida de produções
        when(productionService.findAll()).thenReturn(allProductions);

        // Act & Assert
        mockMvc.perform(get("/api/production/cultivares")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()) // Espera HTTP 200 OK
                .andExpect(content().json(objectMapper.writeValueAsString(allProductions))); // Espera a lista de produções em formato JSON

        // Verifica se o método findAll do serviço foi chamado exatamente uma vez
        verify(productionService, times(1)).findAll();
    }

    @Test
    @DisplayName("Deve criar uma nova produção quando POST /api/production/cultivares for chamado com dados válidos")
    void createCultivar_shouldCreateProduction() throws Exception {
        // Arrange
        // Corrigido para usar o construtor correto e setters
        Production newProduction = new Production("Corn", "PLANTA", LocalDate.of(2025, 7, 22));
        newProduction.setDataFim(LocalDate.of(2025, 10, 22));
        newProduction.setDiasColheita(90);

        // Simula a produção salva com um ID atribuído pelo banco de dados
        Production savedProduction = new Production("Corn", "PLANTA", LocalDate.of(2025, 7, 22));
        savedProduction.setId(3L);
        savedProduction.setDataFim(LocalDate.of(2025, 10, 22));
        savedProduction.setDiasColheita(90);

        // Configura o serviço de mock para retornar a produção 'salva' quando save for chamado com qualquer objeto Production
        when(productionService.save(any(Production.class))).thenReturn(savedProduction);

        // Act & Assert
        mockMvc.perform(post("/api/production/cultivares")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newProduction))) // Envia a nova produção como JSON no corpo da requisição
                .andExpect(status().isOk()) // Espera HTTP 200 OK
                .andExpect(content().json(objectMapper.writeValueAsString(savedProduction))); // Espera a produção salva no corpo da resposta

        // Verifica se o método save do serviço foi chamado exatamente uma vez com o objeto newProduction
        verify(productionService, times(1)).save(any(Production.class));
    }
}