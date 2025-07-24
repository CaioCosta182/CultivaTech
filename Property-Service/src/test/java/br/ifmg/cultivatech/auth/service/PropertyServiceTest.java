package br.ifmg.cultivatech.auth.service;

import br.ifmg.cultivatech.auth.model.Property;
import br.ifmg.cultivatech.auth.repository.PropertyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.User;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PropertyServiceTest {

    @Mock
    private PropertyRepository propertyRepository;

    @InjectMocks
    private PropertyService propertyService;

    private User validUser;
    private User invalidUser;
    private Property property;

    @BeforeEach
    void setUp() {
        // Cenário com um usuário válido (username é um número)
        validUser = new User("10", "password", Collections.emptyList());

        // Cenário com um usuário inválido (username não é um número)
        invalidUser = new User("testuser", "password", Collections.emptyList());

        property = new Property();
        property.setName("Fazenda Teste");
    }

    // --- TESTE UNITÁRIO 1 (CORRIGIDO) ---
    @Test
    @DisplayName("Deve salvar e retornar a propriedade com sucesso")
    void createProperty_WhenUserIsValid_ShouldSaveAndReturnProperty() {
        // Comportamento do Mock (Arrange)
        // Dizemos ao mock para retornar a propriedade que ele recebe, simulando um 'save'.
        when(propertyRepository.save(any(Property.class))).thenReturn(property);

        // Ação (When)
        Property result = propertyService.createProperty(property, validUser);

        // Verificação (Then)
        assertNotNull(result);
        assertEquals(10L, result.getOwnerId(), "O ID do proprietário deve ser 10.");
        verify(propertyRepository, times(1)).save(property); // Verifica se save() foi chamado 1 vez.
    }


    // --- TESTE UNITÁRIO 2 (CORRIGIDO) ---
    @Test
    @DisplayName("Deve lançar IllegalArgumentException para usuário com username inválido")
    void createProperty_WhenUsernameIsNotNumeric_ShouldThrowException() {
        // Ação (When) & Verificação (Then)
        // Verificamos se a exceção correta é lançada quando o username não é um número.
        assertThrows(IllegalArgumentException.class, () -> {
            propertyService.createProperty(property, invalidUser);
        }, "Deveria lançar IllegalArgumentException para username não numérico.");

        // Garantimos que, em caso de erro, o método save NUNCA é chamado.
        verify(propertyRepository, never()).save(any(Property.class));
    }
}