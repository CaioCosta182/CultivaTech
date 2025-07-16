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

    public void setOwner(User owner) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}