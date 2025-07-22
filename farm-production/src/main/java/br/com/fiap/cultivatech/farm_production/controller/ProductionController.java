package br.com.fiap.cultivatech.farm_production.controller;

import br.com.fiap.cultivatech.farm_production.model.Production;
import br.com.fiap.cultivatech.farm_production.service.ProductionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/production/cultivares")
public class ProductionController {

    private final ProductionService productionService; // Renomeado para productionService

    public ProductionController(ProductionService productionService) {
        this.productionService = productionService;
    }

    @GetMapping
    public ResponseEntity<List<Production>> getAllCultivars() {
        return ResponseEntity.ok(productionService.findAll());
    }

    @PostMapping
    public ResponseEntity<Production> createCultivar(@RequestBody Production production) { // Alterado parâmetro
        return ResponseEntity.ok(productionService.save(production)); // Corrigido para productionService
    }
}