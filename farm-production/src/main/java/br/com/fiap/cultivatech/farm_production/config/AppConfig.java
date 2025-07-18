package br.com.fiap.cultivatech.farm_production.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.ui.ModelMap;

@Configuration
public class AppConfig {
    @Bean
    public ModelMap modelMapper() {
        return new ModelMap();
    }
}