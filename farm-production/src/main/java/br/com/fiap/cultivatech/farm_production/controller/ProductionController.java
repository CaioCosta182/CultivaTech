package br.com.fiap.cultivatech.farm_production.controller;

import br.com.fiap.cultivatech.farm_production.model.Production;
import br.com.fiap.cultivatech.farm_production.service.ProductionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/producoes")
public class ProductionController {

    private final ProductionService productionService;

    public ProductionController(ProductionService productionService) {
        this.productionService = productionService;
    }

    @GetMapping
    public ResponseEntity<List<Production>> listarTodas() {
        return ResponseEntity.ok(productionService.findProducoesAtivas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Production> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(productionService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Production> criar(@RequestBody Production production) {
        Production novaProducao = productionService.criarProducao(production);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(novaProducao.getId())
                .toUri();
        return ResponseEntity.created(location).body(novaProducao);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Production> atualizar(
            @PathVariable Long id, 
            @RequestBody Production production) {
        return ResponseEntity.ok(productionService.atualizarProducao(id, production));
    }

    @GetMapping("/por-especie")
    public ResponseEntity<List<Production>> porEspecie(@RequestParam String especie) {
        return ResponseEntity.ok(productionService.findByEspecie(especie));
    }

    @GetMapping("/por-periodo")
    public ResponseEntity<List<Production>> buscarPorPeriodo(
            @RequestParam LocalDate inicio,
            @RequestParam LocalDate fim) {
        return ResponseEntity.ok(productionService.buscarPorPeriodo(inicio, fim));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> desativar(@PathVariable Long id) {
        productionService.desativarProducao(id);
        return ResponseEntity.noContent().build();
    }
}