package com.liftts.backend.controllers;

import com.liftts.backend.domain.dtos.AuthenticationResponse;
import com.liftts.backend.domain.dtos.LoginRequest;
import com.liftts.backend.domain.entities.User;
import com.liftts.backend.domain.entities.VerificationToken;
import com.liftts.backend.repositories.UserRepository;
import com.liftts.backend.repositories.VerificationTokenRepository;
import com.liftts.backend.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping(path = "/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final VerificationTokenRepository verificationTokenRepository;
    private final UserRepository userRepository;

    @PostMapping(path = "/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequest loginRequest) {
        UserDetails userDetails = authenticationService.login(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );
        String token = authenticationService.generateToken(userDetails);
        AuthenticationResponse authenticationResponse = AuthenticationResponse.builder()
                .token(token)
                .expiresIn(86400)
                .build();
        return ResponseEntity.ok(authenticationResponse);
    }

    @PostMapping(path = "/signup")
    public ResponseEntity<AuthenticationResponse> signup(@RequestBody LoginRequest loginRequest) {
        UserDetails userDetails = authenticationService.signup(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );
        String token = authenticationService.generateToken(userDetails);
        AuthenticationResponse authenticationResponse = AuthenticationResponse.builder()
                .token(token)
                .expiresIn(86400)
                .build();
        return new ResponseEntity<>(authenticationResponse, HttpStatus.CREATED);
    }

    @GetMapping(path = "/verify")
    public ResponseEntity<Void> confirmEmailVerification(@RequestParam String token) {
        VerificationToken verificationToken = verificationTokenRepository.findByToken(token).orElseThrow(
                () -> new IllegalArgumentException("Invalid token provided")
        );

        if (verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("Token has expired");
        }

        User user = verificationToken.getUser();
        user.setEnabled(true);
        userRepository.save(user);

        verificationTokenRepository.delete(verificationToken);

//        AuthenticationResponse authenticationResponse = AuthenticationResponse.builder()
//                .token(token)
//                .expiresIn(86400)
//                .build();

        return new ResponseEntity<>(HttpStatus.OK);
//        return new ResponseEntity<>(authenticationResponse, HttpStatus.OK);
    }
}
