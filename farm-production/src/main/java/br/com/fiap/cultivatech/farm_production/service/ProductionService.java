package br.com.fiap.cultivatech.farm_production.service;

import br.com.fiap.cultivatech.farm_production.model.Production;
import br.com.fiap.cultivatech.farm_production.repository.ProductionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class ProductionService {

    private final ProductionRepository productionRepository;

    public ProductionService(ProductionRepository productionRepository) {
        this.productionRepository = productionRepository;
    }

    @Transactional(readOnly = true)
    public Production findById(Long id) {
        return productionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produção não encontrada com o ID: " + id));
    }

    @Transactional(readOnly = true)
    public List<Production> findByEspecie(String especie) {
        return productionRepository.findByEspecie(especie);
    }

    @Transactional(readOnly = true)
    public List<Production> findProducoesAtivas() {
        return productionRepository.findProducoesAtivas();
    }

    @Transactional
    public Production criarProducao(Production production) {
        return productionRepository.save(production);
    }

    @Transactional
    public Production atualizarProducao(Long id, Production productionDetails) {
        Production production = productionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produção não encontrada"));
        
        production.setNome(productionDetails.getNome());
        production.setEspecie(productionDetails.getEspecie());
        production.setDataInicio(productionDetails.getDataInicio());
        production.setDataFim(productionDetails.getDataFim());
        production.setDiasColheita(productionDetails.getDiasColheita());
        production.setQuantidade(productionDetails.getQuantidade());
        production.setUnidadeMedida(productionDetails.getUnidadeMedida());
        
        return productionRepository.save(production);
    }

    @Transactional
    public void desativarProducao(Long id) {
        Production production = productionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produção não encontrada"));
        production.setAtivo(false);
        productionRepository.save(production);
    }

    @Transactional(readOnly = true)
    public List<Production> buscarPorPeriodo(LocalDate inicio, LocalDate fim) {
        return productionRepository.findByDataInicioBetween(inicio, fim);
    }
}