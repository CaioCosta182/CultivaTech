package com.fiap.cultivatech.farm_production.repository;

import com.fiap.cultivatech.farm_production.model.Production;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductionRepository extends JpaRepository<Production, Long> {
    List<Production> findBySpecies(String species);
}