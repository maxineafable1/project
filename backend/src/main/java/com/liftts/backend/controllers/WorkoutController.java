package com.liftts.backend.controllers;

import com.liftts.backend.domain.dtos.WorkoutDto;
import com.liftts.backend.domain.entities.User;
import com.liftts.backend.domain.entities.Workout;
import com.liftts.backend.mappers.WorkoutMapper;
import com.liftts.backend.services.UserService;
import com.liftts.backend.services.WorkoutService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    public ResponseEntity<Page<WorkoutDto>> getAllWorkouts(
            @RequestAttribute UUID userId,
            @RequestParam(required = false) String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
//            Pageable pageable
            @RequestParam(defaultValue = "exerciseDate") String sortBy,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        User currentUser = userService.getUserById(userId);

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Workout> workouts = workoutService.getWorkouts(name, pageable, currentUser);
        Page<WorkoutDto> workoutDtos = workouts.map(workoutMapper::toDto);
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
