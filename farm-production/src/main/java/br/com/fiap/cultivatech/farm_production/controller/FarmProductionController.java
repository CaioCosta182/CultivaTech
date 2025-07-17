package br.com.fiap.cultivatech.farm_production.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/farm-production")
public class FarmProductionController {

    @GetMapping("/hello")
    public String hello() {
        return "Olá do Farm Production Microsserviço CultivaTech!";
    }
}