package com.liftts.backend.services.implementations;

import com.liftts.backend.domain.entities.User;
import com.liftts.backend.domain.entities.Workout;
import com.liftts.backend.repositories.WorkoutRepository;
import com.liftts.backend.services.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkoutServiceImplementation implements WorkoutService {

    private final WorkoutRepository workoutRepository;

    @Override
    public List<Workout> getWorkouts(User user) {
        return workoutRepository.findAllByUserOrderByExerciseDateDesc(user);
    }
}
