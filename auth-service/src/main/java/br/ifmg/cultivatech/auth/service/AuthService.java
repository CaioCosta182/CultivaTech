package br.ifmg.cultivatech.auth.service;

import br.ifmg.cultivatech.auth.exception.EmailAlreadyExistsException;
import br.ifmg.cultivatech.auth.exception.CpfAlreadyExistsException;
import br.ifmg.cultivatech.auth.exception.AuthenticationFailedException;
import br.ifmg.cultivatech.auth.model.User;
import br.ifmg.cultivatech.auth.model.User.Role;
import br.ifmg.cultivatech.auth.payload.LoginRequest;
import br.ifmg.cultivatech.auth.payload.LoginResponse;
import br.ifmg.cultivatech.auth.payload.RegisterRequest;
import br.ifmg.cultivatech.auth.repository.UserRepository;
import br.ifmg.cultivatech.auth.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public void register(RegisterRequest request) {
        log.info("Tentando registrar usuário: {}", request.email());

        validateUserRegistration(request);

        User user = buildUserFromRequest(request);
        userRepository.save(user);

        log.info("Usuário registrado com sucesso. ID: {}, Email: {}", user.getId(), user.getEmail());
    }

    private void validateUserRegistration(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            log.warn("Email já registrado: {}", request.email());
            throw new EmailAlreadyExistsException("Email já está em uso: " + request.email());
        }

        if (userRepository.existsByCpf(request.cpf())) {
            log.warn("CPF já registrado: {}", request.cpf());
            throw new CpfAlreadyExistsException("CPF já está em uso: " + request.cpf());
        }
    }

    private User buildUserFromRequest(RegisterRequest request) {
        return User.builder()
                .name(request.name())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .cpf(request.cpf())
                .phone(request.phone())
                .role(Role.PRODUCER)
                .build();
    }

    public LoginResponse login(LoginRequest request) {
        try {
            authenticateUser(request);
            User user = findUserByEmail(request.email());
            String jwtToken = jwtUtil.generateToken(user);

            log.info("Login bem-sucedido para: {}", request.email());
            return new LoginResponse(jwtToken, user.getEmail());

        } catch (AuthenticationException e) {
            log.error("Falha na autenticação para: {}", request.email(), e);
            throw new AuthenticationFailedException("Credenciais inválidas");
        }
    }

    private void authenticateUser(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()));
    }

    private User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.error("Usuário não encontrado após autenticação: {}", email);
                    return new AuthenticationFailedException("Usuário não encontrado");
                });
    }
}