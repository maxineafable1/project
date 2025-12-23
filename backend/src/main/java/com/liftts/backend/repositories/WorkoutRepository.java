package com.liftts.backend.repositories;

import com.liftts.backend.domain.entities.User;
import com.liftts.backend.domain.entities.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    Optional<Workout> findByExerciseDateAndUser(LocalDate date, User user);
    List<Workout> findAllByUserOrderByExerciseDateDesc(User user);
}
