package com.fiap.cultivatech.farm_production.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Production {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String species;
    
    @Column(name = "planting_season", nullable = false)
    private String plantingSeason;
    
    @Column(name = "harvest_days")
    private Integer harvestDays;
}