package br.ifmg.cultivatech.auth.controller;

import br.ifmg.cultivatech.auth.model.Property;
import br.ifmg.cultivatech.auth.repository.PropertyRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


// Carrega o contexto completo da aplicação para um teste de ponta a ponta
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
// Configura o MockMvc para simular requisições HTTP sem precisar de um servidor real
@AutoConfigureMockMvc
// (Opcional, mas recomendado) Usa um perfil de teste para, por exemplo, usar um banco H2
@ActiveProfiles("test")
class PropertyControllerIT { // IT = Integration Test

    @Autowired
    private MockMvc mockMvc; // Ferramenta para fazer as chamadas HTTP

    @Autowired
    private PropertyRepository propertyRepository; // Acesso ao repositório para verificar o resultado no banco

    @Autowired
    private ObjectMapper objectMapper; // Converte objetos Java para JSON e vice-versa

    @BeforeEach
    void setUp() {
        // Limpa o repositório antes de cada teste para garantir isolamento
        propertyRepository.deleteAll();
    }

    // --- TESTE DE INTEGRAÇÃO 1: ACESSO NÃO AUTORIZADO ---
    @Test
    @DisplayName("Deve retornar 403 Forbidden ao tentar criar propriedade sem autenticação")
    void createProperty_WhenNotAuthenticated_ShouldReturnForbidden() throws Exception {
        // Cenário (Given)
        Property newProperty = new Property();
        newProperty.setName("Fazenda Ilegal");

        // Ação (When) & Verificação (Then)
        // Simula uma requisição POST sem um usuário autenticado
        mockMvc.perform(post("/api/properties")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newProperty)))
                .andExpect(status().isForbidden()); // Espera o status HTTP 403 (Proibido)
    }


    // --- TESTE DE INTEGRAÇÃO 2: CRIAÇÃO COM SUCESSO ---
    @Test
    @DisplayName("Deve criar propriedade com sucesso quando o usuário está autenticado")
    // Simula um usuário autenticado com username "1" e role "USER"
    // ATENÇÃO: Este teste também falhará por causa do bug em `setOwner`.
    // Ele passará após a correção do bug.
    @WithMockUser(username = "1", roles = "USER")
    void createProperty_WhenAuthenticated_ShouldReturnCreatedProperty() throws Exception {
        // Cenário (Given)
        Property propertyRequest = new Property();
        propertyRequest.setName("Fazenda do Usuário 1");
        propertyRequest.setLocation("-20.456,-43.789");
        propertyRequest.setAreaHectares(120.5);
        propertyRequest.setType("MISTA");

        // Ação (When) & Verificação (Then)
        mockMvc.perform(post("/api/properties")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(propertyRequest)))
                .andExpect(status().isOk()) // No seu controller você retorna ResponseEntity.ok() -> 200 OK
                .andExpect(jsonPath("$.id").exists()) // Verifica se a resposta JSON tem um ID
                .andExpect(jsonPath("$.name", is("Fazenda do Usuário 1")));
    }
}