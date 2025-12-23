package com.liftts.backend.repositories;

import com.liftts.backend.domain.entities.Bodyweight;
import com.liftts.backend.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BodyweightRepository extends JpaRepository<Bodyweight, Long> {
    List<Bodyweight> findAllByUserOrderByDateDesc(User user);
    boolean existsByDateAndUser(LocalDate date, User user);
    Optional<Bodyweight> findByIdAndUser(Long id, User user);
}
