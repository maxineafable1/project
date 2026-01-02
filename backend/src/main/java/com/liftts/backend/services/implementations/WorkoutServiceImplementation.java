package com.liftts.backend.services.implementations;

import com.liftts.backend.domain.entities.User;
import com.liftts.backend.domain.entities.Workout;
import com.liftts.backend.repositories.WorkoutRepository;
import com.liftts.backend.services.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkoutServiceImplementation implements WorkoutService {

    private final WorkoutRepository workoutRepository;

    @Override
    public List<Workout> getWorkouts(String name, Pageable pageable, User user) {
        return workoutRepository.findParentsWithChildrenByChildName(name, pageable, user);
    }

    @Override
    public Workout getLatestWorkout(User user) {
        return workoutRepository.findFirstByUserOrderByExerciseDateDesc(user);
    }
}
