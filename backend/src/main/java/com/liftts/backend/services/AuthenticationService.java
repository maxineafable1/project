package com.liftts.backend.services;

import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface AuthenticationService {
    UserDetails authenticate(String email, String password);
    void signup(String email, String password);
    Optional<UserDetails> login(String email, String password);
    String generateToken(UserDetails userDetails);
    UserDetails validateToken(String token);
}
