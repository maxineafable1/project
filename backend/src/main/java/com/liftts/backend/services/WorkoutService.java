package com.liftts.backend.services;

import com.liftts.backend.domain.entities.User;
import com.liftts.backend.domain.entities.Workout;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface WorkoutService {
    List<Workout> getWorkouts(String name, Pageable pageable, User user);
    Workout getLatestWorkout(User user);
}
