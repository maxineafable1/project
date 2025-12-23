package com.liftts.backend.controllers;

import com.liftts.backend.domain.dtos.WorkoutDto;
import com.liftts.backend.domain.entities.User;
import com.liftts.backend.domain.entities.Workout;
import com.liftts.backend.mappers.WorkoutMapper;
import com.liftts.backend.services.UserService;
import com.liftts.backend.services.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/workouts")
@RequiredArgsConstructor
public class WorkoutController {
    private final WorkoutService workoutService;
    private final WorkoutMapper workoutMapper;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<WorkoutDto>> getAllWorkouts(@RequestAttribute UUID userId) {
        User currentUser = userService.getUserById(userId);
        List<Workout> workouts = workoutService.getWorkouts(currentUser);
        List<WorkoutDto> workoutDtos = workouts.stream().map(workoutMapper::toDto).toList();
        return ResponseEntity.ok(workoutDtos);
    }
}
