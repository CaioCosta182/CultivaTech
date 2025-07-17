package microservices_esofii.discovery_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;
import org.springframework.context.annotation.Bean;

@SpringBootApplication

@EnableEurekaServer
public class DiscoveryServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(DiscoveryServerApplication.class, args);
        
	}

	// Bean para healthcheck personalizado
    @Bean
    public HealthIndicator discoveryServerHealth() {
        return () -> Health.up().withDetail("status", "Eureka Server Ready").build();
    }

}
