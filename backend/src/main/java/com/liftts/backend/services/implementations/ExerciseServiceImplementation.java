package com.liftts.backend.services.implementations;

import com.liftts.backend.domain.dtos.CreateExerciseRequest;
import com.liftts.backend.domain.dtos.UpdateExerciseRequest;
import com.liftts.backend.domain.entities.Exercise;
import com.liftts.backend.domain.entities.User;
import com.liftts.backend.domain.entities.Workout;
import com.liftts.backend.repositories.ExerciseRepository;
import com.liftts.backend.repositories.WorkoutRepository;
import com.liftts.backend.services.ExerciseService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExerciseServiceImplementation implements ExerciseService {
    private final ExerciseRepository exerciseRepository;
    private final WorkoutRepository workoutRepository;

    @Override
    public List<Exercise> getAllExercises(User user) {
        return exerciseRepository.findAllByUserOrderByCreatedAtDesc(user);
    }

    @Override
    public Exercise createExercise(User user, CreateExerciseRequest createExerciseRequest) {
        Exercise exercise = new Exercise();
        exercise.setName(createExerciseRequest.getName());
        exercise.setIsKilogram(createExerciseRequest.getIsKilogram());
        exercise.setWeight(createExerciseRequest.getWeight());
        exercise.setSets(createExerciseRequest.getSets());
        exercise.setReps(createExerciseRequest.getReps());
//        exercise.setExerciseDate(createExerciseRequest.getExerciseDate());
        exercise.setUser(user);

        LocalDate dateReq = createExerciseRequest.getExerciseDate();
        Optional<Workout> findWorkout = workoutRepository.findByExerciseDateAndUser(dateReq, user);
        if (findWorkout.isPresent()) {
            findWorkout.get().AddExercise(exercise);
            workoutRepository.save(findWorkout.get());
        } else {
            Workout workout = new Workout();
            workout.setExerciseDate(dateReq);
            workout.setUser(user);
            workout.AddExercise(exercise);
            workoutRepository.save(workout);
        }

        return exerciseRepository.save(exercise);
    }

    @Override
    public void deleteExercise(Long id, User user) {
        Exercise exercise = exerciseRepository.findByIdAndUser(id, user).orElseThrow(
                () -> new EntityNotFoundException("Exercise not found with id " + id)
        );

        LocalDate dateReq = exercise.getWorkout().getExerciseDate();
        Optional<Workout> findWorkout = workoutRepository.findByExerciseDateAndUser(dateReq, user);
        findWorkout.ifPresent(workout -> {
            if ((long) workout.getExercises().size() == 1) {
                workoutRepository.delete(workout);
            } else {
                exerciseRepository.deleteById(id);
            }
        });
    }

    @Override
    public Exercise updateExercise(Long id, UpdateExerciseRequest updateExerciseRequest, User user) {
        Exercise exercise = exerciseRepository.findByIdAndUser(id, user).orElseThrow(
                () -> new EntityNotFoundException("Exercise not found with id " + id)
        );

        exercise.setName(updateExerciseRequest.getName());
        exercise.setIsKilogram(updateExerciseRequest.getIsKilogram());
        exercise.setWeight(updateExerciseRequest.getWeight());
        exercise.setSets(updateExerciseRequest.getSets());
        exercise.setReps(updateExerciseRequest.getReps());

        return exerciseRepository.save(exercise);
    }
}
