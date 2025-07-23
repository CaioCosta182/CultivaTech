package br.com.fiap.cultivatech.farm_production.model;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import java.time.LocalDate;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Testes unitários para a classe de modelo Production.
 * Esta classe valida os construtores, getters e setters da entidade.
 */
class ProductionTest {

    @Test
    @DisplayName("Deve criar uma instância de Production usando o construtor parametrizado")
    void shouldCreateProductionWithParameterizedConstructor() {
        // Arrange
        String nome = "Alface Crespa";
        String especie = "Hortaliça";
        LocalDate dataInicio = LocalDate.of(2025, 8, 1);

        // Act
        Production production = new Production(nome, especie, dataInicio);

        // Assert
        assertNotNull(production, "A produção não deve ser nula.");
        assertEquals(nome, production.getNome(), "O nome deve ser igual ao fornecido no construtor.");
        assertEquals(especie, production.getEspecie(), "A espécie deve ser igual à fornecida no construtor.");
        assertEquals(dataInicio, production.getDataInicio(), "A data de início deve ser igual à fornecida no construtor.");
    }

    @Test
    @DisplayName("Deve criar uma instância de Production usando o construtor padrão")
    void shouldCreateProductionWithDefaultConstructor() {
        // Arrange & Act
        Production production = new Production();

        // Assert
        assertNotNull(production, "A produção não deve ser nula.");
        assertNull(production.getId(), "O ID deve ser nulo inicialmente.");
        assertNull(production.getNome(), "O nome deve ser nulo inicialmente.");
    }

    @Test
    @DisplayName("Deve definir e obter corretamente todos os atributos da produção")
    void shouldSetAndGetAllAttributes() {
        // Arrange
        Production production = new Production();
        Long id = 1L;
        String nome = "Tomate Cereja";
        String especie = "Fruta";
        LocalDate dataInicio = LocalDate.of(2025, 7, 1);
        LocalDate dataFim = LocalDate.of(2025, 9, 30);
        Integer diasColheita = 90;

        // Act
        production.setId(id);
        production.setNome(nome);
        production.setEspecie(especie);
        production.setDataInicio(dataInicio);
        production.setDataFim(dataFim);
        production.setDiasColheita(diasColheita);

        // Assert
        assertEquals(id, production.getId(), "O getter de ID deve retornar o valor definido.");
        assertEquals(nome, production.getNome(), "O getter de nome deve retornar o valor definido.");
        assertEquals(especie, production.getEspecie(), "O getter de espécie deve retornar o valor definido.");
        assertEquals(dataInicio, production.getDataInicio(), "O getter de data de início deve retornar o valor definido.");
        assertEquals(dataFim, production.getDataFim(), "O getter de data de fim deve retornar o valor definido.");
        assertEquals(diasColheita, production.getDiasColheita(), "O getter de dias de colheita deve retornar o valor definido.");
    }
}