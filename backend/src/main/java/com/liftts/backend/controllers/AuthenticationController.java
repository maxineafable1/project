package com.liftts.backend.controllers;

import com.liftts.backend.domain.dtos.LoginRequest;
import com.liftts.backend.domain.dtos.LoginResponse;
import com.liftts.backend.domain.entities.User;
import com.liftts.backend.domain.entities.VerificationToken;
import com.liftts.backend.repositories.VerificationTokenRepository;
import com.liftts.backend.services.AuthenticationService;
import com.liftts.backend.services.UserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
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
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest loginRequest,
            HttpServletResponse response
    ) {
        Optional<UserDetails> userDetails = authenticationService.login(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );
        if (userDetails.isPresent()) {
            String jwtToken = authenticationService.generateToken(userDetails.get());

            ResponseCookie cookie = ResponseCookie.from("liftts-session", jwtToken)
                    .httpOnly(true)
                    .secure(false) // todo change in prod to true
                    .sameSite("Lax")
                    .path("/")
//                .domain("http://localhost:3000")
                    .maxAge(Duration.ofDays(7)) // todo change in prod
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            LoginResponse loginResponse = LoginResponse.builder()
                    .authenticationResponse(null)
                    .message(null)
                    .build();

            return ResponseEntity.ok(loginResponse);
        }

        LoginResponse loginResponse = LoginResponse.builder()
                .authenticationResponse(null)
                .message("Verification link has been resent")
                .build();

        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping(path = "/signup")
    public ResponseEntity<LoginResponse> signup(@RequestBody LoginRequest loginRequest) {
        authenticationService.signup(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );

        LoginResponse loginResponse = LoginResponse.builder()
                .authenticationResponse(null)
                .message("Verification link has been sent")
                .build();

        return new ResponseEntity<>(loginResponse, HttpStatus.CREATED);
    }

    @GetMapping(path = "/verify")
    public ResponseEntity<Void> confirmEmailVerification(
            @RequestParam String token,
            HttpServletResponse response
    ) {
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

        ResponseCookie cookie = ResponseCookie.from("liftts-session", jwtToken)
                .httpOnly(true)
                .secure(false) // todo change in prod to true
                .sameSite("Lax")
                .path("/")
//                .domain("http://localhost:3000")
                .maxAge(Duration.ofDays(7)) // todo change in prod
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        response.setHeader(
                HttpHeaders.LOCATION,
                "http://localhost:3000/dashboard"
        );

        return new ResponseEntity<>(HttpStatus.FOUND);
    }
}
