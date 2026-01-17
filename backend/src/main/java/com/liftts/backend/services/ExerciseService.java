package com.liftts.backend.services;

import com.liftts.backend.domain.dtos.CreateExerciseRequest;
import com.liftts.backend.domain.dtos.ExercisePr;
import com.liftts.backend.domain.dtos.UpdateExerciseRequest;
import com.liftts.backend.domain.entities.Exercise;
import com.liftts.backend.domain.entities.User;

import java.util.List;
import java.util.UUID;

public interface ExerciseService {
    List<Exercise> getAllExercises(User user);
    Exercise createExercise(User user, CreateExerciseRequest createExerciseRequest);
    void deleteExercise(Long id, User user);
    Exercise updateExercise(Long id, UpdateExerciseRequest updateExerciseRequest, User user);
    List<ExercisePr> getExercisePr(UUID id);
}
