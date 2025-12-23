package com.liftts.backend.services;

import org.springframework.security.core.userdetails.UserDetails;

public interface AuthenticationService {
    UserDetails authenticate(String email, String password);
    UserDetails signup(String email, String password);
    UserDetails login(String email, String password);
    String generateToken(UserDetails userDetails);
    UserDetails validateToken(String token);

}
