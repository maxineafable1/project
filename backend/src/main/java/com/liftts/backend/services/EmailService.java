package com.liftts.backend.services;

public interface EmailService {
    void sendVerificationEmail(String to, String link);
}
