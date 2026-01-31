package com.liftts.backend.repositories;

import com.liftts.backend.domain.entities.User;
import com.liftts.backend.domain.entities.Workout;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    Optional<Workout> findByExerciseDateAndUser(LocalDate date, User user);

    @Query("""
        SELECT DISTINCT w 
        FROM Workout w 
        JOIN FETCH w.exercises e 
        WHERE w.user = :user
        AND (
            :name IS NULL OR :name = ''
            OR LOWER(e.name) LIKE LOWER(CONCAT('%', :name, '%'))
        )
    """)
    Page<Workout> findParentsWithChildrenByChildName(
            @Param("name") String name,
            Pageable pageable,
            User user);

    Optional<Workout> findFirstByUserOrderByExerciseDateDesc(User user);
}
