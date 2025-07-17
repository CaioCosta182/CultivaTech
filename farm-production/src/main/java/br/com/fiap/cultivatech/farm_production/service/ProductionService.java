package com.fiap.cultivatech.farm_production.service;

import com.fiap.cultivatech.farm_production.model.Production;
import com.fiap.cultivatech.farm_production.repository.ProductionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductionService {

    private final ProductionRepository productionRepository;

    public ProductionService(ProductionRepository productionRepository) {
        this.productionRepository = productionRepository;
    }

    @Transactional(readOnly = true)
    public List<Production> findAll() {
        return productionRepository.findAll();
    }

    @Transactional
    public Production save(Production production) {
        return productionRepository.save(production);
    }
}