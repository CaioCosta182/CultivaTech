package br.com.fiap.cultivatech.farm_production.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "producoes")
public class Production {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String nome;
    
    @Column(nullable = false, length = 50)
    private String especie; // "PLANTA" ou "ANIMAL"
    
    @Column(name = "data_inicio", nullable = false)
    private LocalDate dataInicio;
    
    @Column(name = "data_fim")
    private LocalDate dataFim;
    
    @Column(name = "dias_colheita")
    private Integer diasColheita;
    
    @Column(name = "quantidade")
    private Double quantidade;
    
    @Column(name = "unidade_medida", length = 20)
    private String unidadeMedida;
    
    @Column(name = "ativo", nullable = false)
    private Boolean ativo = true;

    // Construtores
    public Production() {
    }

    public Production(String nome, String especie, LocalDate dataInicio) {
        this.nome = nome;
        this.especie = especie;
        this.dataInicio = dataInicio;
    }

    public Production(String nome, String especie, LocalDate dataInicio, 
                    LocalDate dataFim, Integer diasColheita, Double quantidade, 
                    String unidadeMedida) {
        this.nome = nome;
        this.especie = especie;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.diasColheita = diasColheita;
        this.quantidade = quantidade;
        this.unidadeMedida = unidadeMedida;
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

    public Double getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Double quantidade) {
        this.quantidade = quantidade;
    }

    public String getUnidadeMedida() {
        return unidadeMedida;
    }

    public void setUnidadeMedida(String unidadeMedida) {
        this.unidadeMedida = unidadeMedida;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

    // Métodos de negócio
    public boolean estaEmProducao() {
        LocalDate hoje = LocalDate.now();
        return hoje.isAfter(dataInicio) && (dataFim == null || hoje.isBefore(dataFim));
    }

    // Métodos utilitários
    @Override
    public String toString() {
        return "Production{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", especie='" + especie + '\'' +
                ", dataInicio=" + dataInicio +
                ", dataFim=" + dataFim +
                ", diasColheita=" + diasColheita +
                ", quantidade=" + quantidade +
                ", unidadeMedida='" + unidadeMedida + '\'' +
                ", ativo=" + ativo +
                '}';
    }
}