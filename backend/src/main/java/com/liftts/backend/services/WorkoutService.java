package com.liftts.backend.services;

import com.liftts.backend.domain.entities.User;
import com.liftts.backend.domain.entities.Workout;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface WorkoutService {
    Page<Workout> getWorkouts(String name, Pageable pageable, User user);
    Optional<Workout> getLatestWorkout(User user);
}
