package br.ifmg.cultivatech.auth.controller;


import br.ifmg.cultivatech.auth.payload.LoginRequest;
import br.ifmg.cultivatech.auth.payload.LoginResponse;
import br.ifmg.cultivatech.auth.payload.RegisterRequest;
import br.ifmg.cultivatech.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.apache.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

 @PostMapping("/register")
public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
    try {
        authService.register(request);
        return ResponseEntity.ok("User registered successfully");
    } catch (IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.SC_CONFLICT).body(e.getMessage());
    }
}

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Auth Service is healthy");
    }
}