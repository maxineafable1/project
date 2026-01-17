package com.liftts.backend.services;

import com.liftts.backend.domain.entities.User;

import java.util.UUID;

public interface UserService {
    User getUserById(UUID id);
    void createVerificationToken(User user, String token);
    void verifyUser(User user,Long id);
}
