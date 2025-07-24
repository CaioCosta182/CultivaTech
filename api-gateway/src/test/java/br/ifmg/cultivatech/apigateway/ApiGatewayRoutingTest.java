package br.ifmg.cultivatech.apigateway;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.contract.wiremock.AutoConfigureWireMock;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.reactive.server.WebTestClient;

import static com.github.tomakehurst.wiremock.client.WireMock.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, properties = {
    "spring.cloud.discovery.client.simple.instances.auth-service[0].uri=http://localhost:${wiremock.server.port}",
    "spring.cloud.discovery.client.simple.instances.property-service[0].uri=http://localhost:${wiremock.server.port}",
    "spring.cloud.discovery.client.simple.instances.production-service[0].uri=http://localhost:${wiremock.server.port}"
})
@AutoConfigureWireMock(port = 0)
@ActiveProfiles("test")
public class ApiGatewayRoutingTest {

    @Autowired
    private WebTestClient webTestClient;

    @Test
    @DisplayName("Deve rotear requisições de /api/auth/** para o auth-service")
    void whenLoginRequest_thenRouteToAuthService() {
        // CORREÇÃO: Removido o prefixo /api da URL do stub
        stubFor(post(urlEqualTo("/auth/login")) // <-- AQUI
                .willReturn(aResponse()
                        .withStatus(200)
                        .withHeader("Content-Type", "application/json")
                        .withBody("{\"token\": \"fake-jwt-token\"}")));

        webTestClient.post().uri("/api/auth/login") // A chamada ao gateway continua com /api
                .bodyValue("{\"email\":\"test@test.com\", \"password\":\"123\"}")
                .header("Content-Type", "application/json")
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$.token").isEqualTo("fake-jwt-token");
    }

    @Test
    @DisplayName("Deve rotear requisições de /api/properties/** para o property-service")
    void whenGetProperties_thenRouteToPropertyService() {
        // CORREÇÃO: Removido o prefixo /api da URL do stub
        stubFor(get(urlEqualTo("/properties/my-properties")) // <-- AQUI
                .willReturn(aResponse()
                        .withStatus(200)
                        .withHeader("Content-Type", "application/json")
                        .withBody("[{\"id\": 1, \"name\": \"Fazenda Teste\"}]")));

        webTestClient.get().uri("/api/properties/my-properties")
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$[0].name").isEqualTo("Fazenda Teste");
    }

    @Test
    @DisplayName("Deve retornar 404 Not Found para uma rota não configurada")
    void whenInvalidRoute_thenReturnsNotFound() {
        webTestClient.get().uri("/api/invalid-service/some-path")
                .exchange()
                .expectStatus().isNotFound();
    }

    @Test
    @DisplayName("Deve rotear corretamente mesmo sem um token (sem filtro de segurança)")
    void whenProtectedEndpointWithoutToken_thenRouteSuccessfully() {
        // CORREÇÃO: Removido o prefixo /api da URL do stub
        stubFor(get(urlEqualTo("/properties/my-properties")) // <-- AQUI
                .willReturn(aResponse().withStatus(200)));

        webTestClient.get().uri("/api/properties/my-properties")
                .exchange()
                .expectStatus().isOk(); // O esperado é 200 OK, pois não há filtro de segurança
    }
}