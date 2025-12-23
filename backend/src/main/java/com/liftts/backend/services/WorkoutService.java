package com.liftts.backend.services;

import com.liftts.backend.domain.entities.User;
import com.liftts.backend.domain.entities.Workout;

import java.util.List;

public interface WorkoutService {
    List<Workout> getWorkouts(User user);
}
