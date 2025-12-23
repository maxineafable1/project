package com.liftts.backend.controllers;

import com.liftts.backend.domain.dtos.AuthenticationResponse;
import com.liftts.backend.domain.dtos.LoginRequest;
import com.liftts.backend.domain.dtos.LoginResponse;
import com.liftts.backend.domain.entities.User;
import com.liftts.backend.domain.entities.VerificationToken;
import com.liftts.backend.repositories.VerificationTokenRepository;
import com.liftts.backend.services.AuthenticationService;
import com.liftts.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final VerificationTokenRepository verificationTokenRepository;
    private final UserService userService;
    private final UserDetailsService userDetailsService;

    @PostMapping(path = "/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        Optional<UserDetails> userDetails = authenticationService.login(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );
        if (userDetails.isPresent()) {
            String token = authenticationService.generateToken(userDetails.get());

            AuthenticationResponse authenticationResponse = AuthenticationResponse.builder()
                    .token(token)
                    .expiresIn(86400)
                    .build();

            LoginResponse loginResponse = LoginResponse.builder()
                    .authenticationResponse(authenticationResponse)
                    .message(null)
                    .build();

            return ResponseEntity.ok(loginResponse);
        } else {
            LoginResponse loginResponse = LoginResponse.builder()
                    .authenticationResponse(null)
                    .message("Verification link has been resent")
                    .build();
            return ResponseEntity.ok(loginResponse);
        }
    }

    @PostMapping(path = "/signup")
    public ResponseEntity<String> signup(@RequestBody LoginRequest loginRequest) {
        authenticationService.signup(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );

        return new ResponseEntity<>("Verification link has been sent", HttpStatus.CREATED);
    }

    @GetMapping(path = "/verify")
    public ResponseEntity<AuthenticationResponse> confirmEmailVerification(@RequestParam String token) {
        VerificationToken verificationToken = verificationTokenRepository.findByToken(token).orElseThrow(
                () -> new IllegalArgumentException("Invalid token provided")
        );

        if (verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("Token has expired");
        }

        User user = verificationToken.getUser();
        if (user.isEnabled()) {
            throw new IllegalStateException("User is already enabled");
        }

        userService.verifyUser(user, verificationToken.getId());

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());

        String jwtToken = authenticationService.generateToken(userDetails);

        AuthenticationResponse authenticationResponse = AuthenticationResponse.builder()
                .token(jwtToken)
                .expiresIn(86400)
                .build();

        return new ResponseEntity<>(authenticationResponse, HttpStatus.OK);
    }
}
