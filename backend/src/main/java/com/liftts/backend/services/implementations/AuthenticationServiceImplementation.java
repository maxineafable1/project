package com.liftts.backend.services.implementations;

import com.liftts.backend.domain.entities.User;
import com.liftts.backend.repositories.UserRepository;
import com.liftts.backend.services.AuthenticationService;
import com.liftts.backend.services.EmailService;
import com.liftts.backend.services.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImplementation implements AuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final UserService userService;

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${app.environment}")
    private String environment;

    private final String baseUrl = isProd()
            ? "https://liftts.app"
//            ? "http://localhost:3001"
            : "http://localhost:3000";

    @Override
    public UserDetails authenticate(String email, String password) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );
        return userDetailsService.loadUserByUsername(email);
    }

    @Override
    @Transactional
    public void signup(String email, String password) {
        Optional<User> userExists = userRepository.findByEmail(email);
        if (userExists.isEmpty()) {
            User user = new User();
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(password));
            user.setName(email.toLowerCase().split("@")[0]);
            user.setEnabled(false);
            userRepository.save(user);

            // todo send verify email
            String token = UUID.randomUUID().toString();
            userService.createVerificationToken(user, token);

            String verificationLink = baseUrl + "/verify-email?token=" + token;
            emailService.sendVerificationEmail(email, verificationLink);
        } else  {
            User user = userExists.get();
            if (user.isEnabled()) {
                throw new IllegalArgumentException("Account already exists with email: " + email);
            }

            resendVerificationToken(email, user);
        }
    }

    @Override
    @Transactional
    public Optional<UserDetails> login(String email, String password) {
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException("Invalid email or password"));

        boolean matches = passwordEncoder.matches(password, user.getPassword());
        if (!matches) {
            throw new UsernameNotFoundException("Invalid email or password");
        } else {
            if (user.isEnabled()) {
                authenticate(email, password);
                return Optional.of(userDetailsService.loadUserByUsername(email));
            }

            resendVerificationToken(email, user);
            return Optional.empty();
        }
    }

    private void resendVerificationToken(String email, User user) {
        // if user token is expired
        if (user.getVerificationToken().getExpiryDate().isBefore(LocalDateTime.now())) {
            user.setVerificationToken(null);
            userRepository.save(user);

            String token = UUID.randomUUID().toString();
            userService.createVerificationToken(user, token);

            String verificationLink = baseUrl + "/verify-email?token=" + token;
            emailService.sendVerificationEmail(email, verificationLink);
        } else {
            // resend current user token
            String verificationLink = baseUrl + "/verify-email?token=" + user.getVerificationToken().getToken();

            emailService.sendVerificationEmail(email, verificationLink);
        }
    }

    @Override
    public String generateToken(UserDetails userDetails, Boolean rememberMe) {
        Map<String, Object> claims = new HashMap<>();

        long rememberMeExpiryMs = Duration.ofDays(30).toMillis();
        long jwtExpiryMs = Duration.ofDays(1).toMillis();

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + (rememberMe ? rememberMeExpiryMs : jwtExpiryMs)))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    @Override
    public UserDetails validateToken(String token) {
        String username = extractUsername(token);
        if (isTokenExpired(token)) {
//            throw new BadCredentialsException("Expired Token");
            return null;
        }
        return userDetailsService.loadUserByUsername(username);
    }

    private String extractUsername(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    private Date extractExpiration(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getExpiration();
    }

    private boolean isTokenExpired(String token) {
        Date expiration = extractExpiration(token);
        return expiration.before(new Date());
    }

    private Key getSigningKey() {
        byte[] keyBytes = secretKey.getBytes();
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private boolean isProd() {
        return "prod".equals(environment);
    }
}
