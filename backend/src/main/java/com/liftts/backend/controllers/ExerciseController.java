package com.liftts.backend.controllers;

import com.liftts.backend.domain.dtos.*;
import com.liftts.backend.domain.entities.Exercise;
import com.liftts.backend.domain.entities.User;
import com.liftts.backend.mappers.ExerciseMapper;
import com.liftts.backend.services.ExerciseService;
import com.liftts.backend.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/exercises")
@RequiredArgsConstructor
public class ExerciseController {

    private final UserService userService;
    private final ExerciseService exerciseService;
    private final ExerciseMapper exerciseMapper;

    @GetMapping
    public ResponseEntity<List<ExerciseDto>> getExercises(@RequestAttribute UUID userId) {
        User loggedInUser = userService.getUserById(userId);
        List<Exercise> exercises = exerciseService.getAllExercises(loggedInUser);
        List<ExerciseDto> exerciseDtos = exercises.stream().map(exerciseMapper::toExerciseDto).toList();
        return ResponseEntity.ok(exerciseDtos);
    }

    @PostMapping
    public ResponseEntity<ExerciseDto> createExercises(
            @Valid @RequestBody CreateExerciseRequestDto createExerciseRequestDto,
            @RequestAttribute UUID userId) {
        User loggedInUser = userService.getUserById(userId);
        CreateExerciseRequest createExerciseRequest = exerciseMapper.toCreateExerciseRequest(createExerciseRequestDto);
        Exercise exercise = exerciseService.createExercise(loggedInUser, createExerciseRequest);
        return new ResponseEntity<>(exerciseMapper.toExerciseDto(exercise), HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteExercises(
            @RequestAttribute UUID userId,
            @PathVariable Long id) {
        User loggedInUser = userService.getUserById(userId);
        exerciseService.deleteExercise(id, loggedInUser);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<ExerciseDto> updateExercises(
            @RequestAttribute UUID userId,
            @Valid @RequestBody UpdateExerciseRequestDto updateExerciseRequestDto,
            @PathVariable Long id) {
        User loggedInUser = userService.getUserById(userId);
        UpdateExerciseRequest updateExerciseRequest = exerciseMapper.toUpdateExerciseRequest(updateExerciseRequestDto);
        Exercise exercise = exerciseService.updateExercise(id, updateExerciseRequest, loggedInUser);
        return new ResponseEntity<>(exerciseMapper.toExerciseDto(exercise), HttpStatus.OK);
    }
}
