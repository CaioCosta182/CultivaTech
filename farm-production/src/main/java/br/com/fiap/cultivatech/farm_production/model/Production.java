package br.com.fiap.cultivatech.farm_production.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Production {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nome;
    
    @Column(nullable = false)
    private String especie; // "PLANTA" ou "ANIMAL"
    
    @Column(name = "data_inicio", nullable = false)
    private LocalDate dataInicio;
    
    @Column(name = "data_fim")
    private LocalDate dataFim;
    
    @Column(name = "dias_colheita")
    private Integer diasColheita;

    // Construtor padrão (obrigatório para JPA)
    public Production() {
    }

    // Construtor com campos obrigatórios
    public Production(String nome, String especie, LocalDate dataInicio) {
        this.nome = nome;
        this.especie = especie;
        this.dataInicio = dataInicio;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEspecie() {
        return especie;
    }

    public void setEspecie(String especie) {
        this.especie = especie;
    }

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataFim() {
        return dataFim;
    }

    public void setDataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
    }

    public Integer getDiasColheita() {
        return diasColheita;
    }

    public void setDiasColheita(Integer diasColheita) {
        this.diasColheita = diasColheita;
    }

    // Método para calcular se está em produção
    public boolean estaEmProducao() {
        LocalDate hoje = LocalDate.now();
        return hoje.isAfter(dataInicio) && (dataFim == null || hoje.isBefore(dataFim));
    }
}