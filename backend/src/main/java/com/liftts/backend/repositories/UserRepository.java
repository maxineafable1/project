package com.liftts.backend.repositories;

import com.liftts.backend.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
//    User findUserById(UUID id);
    Optional<User> findByEmail(String email);
}
