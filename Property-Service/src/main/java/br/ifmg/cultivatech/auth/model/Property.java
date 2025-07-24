package br.ifmg.cultivatech.auth.model;

import org.springframework.security.core.userdetails.User;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "properties")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String location;
    private Double areaHectares;
    private String type;
    
    @Column(name = "owner_id")
    private Long ownerId; // Referência ao usuário no auth-service

    /**
     * CORREÇÃO: Este método agora define o ID do proprietário da propriedade
     * com base no nome de usuário do objeto User autenticado.
     * * Ele assume que o username do principal é o ID numérico do usuário.
     *
     * @param owner O objeto User injetado pelo Spring Security, representando o proprietário.
     * @throws IllegalArgumentException se o usuário for nulo ou se o nome de usuário não for um ID numérico válido.
     */
    public void setOwner(User owner) {
        if (owner == null || owner.getUsername() == null) {
            throw new IllegalArgumentException("O proprietário (User) não pode ser nulo e deve conter um nome de usuário.");
        }
        try {
            // Converte o username (que deve ser o ID do usuário, ex: "1", "2") para Long.
            this.ownerId = Long.parseLong(owner.getUsername());
        } catch (NumberFormatException e) {
            // Lança uma exceção clara se o username não for um número, indicando um problema de configuração.
            throw new IllegalArgumentException("O nome de usuário do proprietário não é um ID numérico válido: " + owner.getUsername(), e);
        }
    }
}