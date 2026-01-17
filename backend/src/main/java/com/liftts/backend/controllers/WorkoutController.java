package com.liftts.backend.controllers;

import com.liftts.backend.domain.dtos.WorkoutDto;
import com.liftts.backend.domain.entities.User;
import com.liftts.backend.domain.entities.Workout;
import com.liftts.backend.mappers.WorkoutMapper;
import com.liftts.backend.services.UserService;
import com.liftts.backend.services.WorkoutService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<List<WorkoutDto>> getAllWorkouts(
            @RequestAttribute UUID userId,
            @RequestParam String name,
            Pageable pageable
    ) {
        User currentUser = userService.getUserById(userId);
        List<Workout> workouts = workoutService.getWorkouts(name, pageable, currentUser);
        List<WorkoutDto> workoutDtos = workouts.stream().map(workoutMapper::toDto).toList();
        return ResponseEntity.ok(workoutDtos);
    }

    @GetMapping(path = "/latest")
    public ResponseEntity<WorkoutDto> getLatestWorkout(
            @RequestAttribute UUID userId
    ) {
        User currentUser = userService.getUserById(userId);
        Workout workout = workoutService.getLatestWorkout(currentUser)
                .orElseThrow(() -> new EntityNotFoundException("Workout not found"));

        return ResponseEntity.ok(workoutMapper.toDto(workout));
    }
}
