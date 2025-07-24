package br.com.fiap.cultivatech.farm_production.repository;

import br.com.fiap.cultivatech.farm_production.model.Production;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ProductionRepository extends JpaRepository<Production, Long> {

    List<Production> findByEspecie(String especie);
    
    List<Production> findByNomeContainingIgnoreCase(String nome);
    
    List<Production> findByDataInicioBetween(LocalDate inicio, LocalDate fim);
    
    List<Production> findByAtivoTrue();
    
    @Query("SELECT p FROM Production p WHERE p.dataFim IS NULL OR p.dataFim > CURRENT_DATE")
    List<Production> findProducoesAtivas();
    
    @Query("SELECT p FROM Production p WHERE p.especie = :tipo AND p.ativo = true")
    List<Production> findByTipoAndAtivo(@Param("tipo") String tipo);
}