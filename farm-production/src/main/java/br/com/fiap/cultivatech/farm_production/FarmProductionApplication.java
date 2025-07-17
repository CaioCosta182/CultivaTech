package br.com.fiap.cultivatech.farm_production;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@EnableDiscoveryClient
@SpringBootApplication
public class FarmProductionApplication {
	public static void main(String[] args) {
		SpringApplication.run(FarmProductionApplication.class, args);
	}
}
