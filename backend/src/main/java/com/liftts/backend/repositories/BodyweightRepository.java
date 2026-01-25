package com.liftts.backend.repositories;

import com.liftts.backend.domain.dtos.WeeklyBodyweight;
import com.liftts.backend.domain.entities.Bodyweight;
import com.liftts.backend.domain.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BodyweightRepository extends JpaRepository<Bodyweight, Long> {
    Page<Bodyweight> findAllByUserOrderByDateDesc(User user, Pageable pageable);
    boolean existsByDateAndUser(LocalDate date, User user);
//    date_trunc('week', b.date)
    @Query(value = """
    SELECT
        date_bin('7 days', b.date, timestamp '2023-1-1') AS week,
        AVG(b.weight) AS average,
        MIN(b.weight) AS minWeight,
        MAX(b.weight) AS maxWeight
    FROM bodyweights b
    WHERE b.user_id = :userId
    GROUP BY week
    ORDER BY week DESC
    """, nativeQuery = true)
    List<WeeklyBodyweight> getWeeklyWeightStat(@Param("userId") UUID userId);

    @Query(value = """
    SELECT
        date_bin('7 days', b.date, timestamp '2023-1-1') AS week,
        AVG(b.weight) AS average,
        MIN(b.weight) AS minWeight,
        MAX(b.weight) AS maxWeight
    FROM bodyweights b
    WHERE b.user_id = :userId
    GROUP BY week
    ORDER BY week DESC
    LIMIT 1
    """, nativeQuery = true)
    Optional<WeeklyBodyweight> getLatestWeeklyWeightStat(@Param("userId") UUID userId);

    Optional<Bodyweight> findByIdAndUser(Long id, User user);
    Optional<Bodyweight> findFirstByUserOrderByDateDesc(User user);
}
