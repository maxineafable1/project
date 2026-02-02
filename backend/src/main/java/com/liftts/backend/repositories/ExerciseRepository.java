package com.liftts.backend.repositories;

import com.liftts.backend.domain.dtos.ExercisePr;
import com.liftts.backend.domain.entities.Exercise;
import com.liftts.backend.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    List<Exercise> findAllByUserOrderByCreatedAtDesc(User user);
    Optional<Exercise> findByIdAndUser(Long id, User user);

    @Query(value = """
    SELECT
        MAX(e.weight) AS weight,
        e.name AS name,
        e.isKilogram AS isKilogram,
        w.exerciseDate AS exerciseDate
    FROM Exercise e
    JOIN e.workout w
    WHERE e.user.id = :userId AND e.sets = 1 AND e.reps = 1 AND LOWER(e.name) IN (:lifts)
    GROUP BY e.name, e.isKilogram, w.exerciseDate
    """)
    List<ExercisePr> getExercisePrs(
            @Param("userId") UUID userId,
            @Param("lifts") List<String> lifts
    );
}
