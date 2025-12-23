package com.liftts.backend.repositories;

import com.liftts.backend.domain.entities.Exercise;
import com.liftts.backend.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    List<Exercise> findAllByUserOrderByCreatedAtDesc(User user);
    Optional<Exercise> findByIdAndUser(Long id, User user);
}
