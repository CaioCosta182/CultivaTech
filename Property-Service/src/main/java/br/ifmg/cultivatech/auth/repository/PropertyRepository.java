package br.ifmg.cultivatech.auth.repository;

import br.ifmg.cultivatech.auth.model.Property;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import br.ifmg.cultivatech.auth.model.Property;

public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findByOwnerId(Long ownerId);
}