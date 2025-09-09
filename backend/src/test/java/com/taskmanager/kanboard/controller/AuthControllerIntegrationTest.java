package com.taskmanager.kanboard.controller;

import com.taskmanager.kanboard.dto.request.LoginRequest;
import com.taskmanager.kanboard.dto.request.RegisterRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class AuthControllerIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void shouldRegisterUser_WhenValidRequest() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("testuser" + System.currentTimeMillis());
        request.setEmail("test" + System.currentTimeMillis() + "@example.com");
        request.setPassword("password123");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<RegisterRequest> entity = new HttpEntity<>(request, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(
                "http://localhost:" + port + "/api/auth/register",
                entity,
                String.class);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody()).contains("token");
        assertThat(response.getBody()).contains(request.getUsername());
    }

    @Test
    void shouldLogin_WhenValidCredentials() {
        // First register a user
        String uniqueUsername = "loginuser" + System.currentTimeMillis();
        String email = "login" + System.currentTimeMillis() + "@example.com";

        RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setUsername(uniqueUsername);
        registerRequest.setEmail(email);
        registerRequest.setPassword("password123");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<RegisterRequest> registerEntity = new HttpEntity<>(registerRequest, headers);

        restTemplate.postForEntity(
                "http://localhost:" + port + "/api/auth/register",
                registerEntity,
                String.class);

        // Then login
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername(uniqueUsername);
        loginRequest.setPassword("password123");

        HttpEntity<LoginRequest> loginEntity = new HttpEntity<>(loginRequest, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(
                "http://localhost:" + port + "/api/auth/login",
                loginEntity,
                String.class);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody()).contains("token");
        assertThat(response.getBody()).contains(uniqueUsername);
    }
}
