package br.ifmg.cultivatech.auth.payload;

public record LoginRequest(String email, String password) {}