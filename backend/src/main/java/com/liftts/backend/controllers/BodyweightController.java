package com.liftts.backend.controllers;

import com.liftts.backend.domain.dtos.*;
import com.liftts.backend.domain.entities.Bodyweight;
import com.liftts.backend.domain.entities.User;
import com.liftts.backend.mappers.BodyweightMapper;
import com.liftts.backend.services.BodyweightService;
import com.liftts.backend.services.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/bodyweights")
@RequiredArgsConstructor
public class BodyweightController {
    private final UserService userService;
    private final BodyweightService bodyweightService;
    private final BodyweightMapper bodyweightMapper;

    @GetMapping
    public ResponseEntity<Page<BodyweightDto>> getBodyweights(
            @RequestAttribute UUID userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        User currUser = userService.getUserById(userId);
        Pageable pageable = PageRequest.of(page, size);
        Page<Bodyweight> bodyweights = bodyweightService.getBodyweights(currUser, pageable);
        Page<BodyweightDto> bodyweightDtos = bodyweights.map(bodyweightMapper::toBodyweightDto);
        return ResponseEntity.ok(bodyweightDtos);
    }

    @GetMapping(path = "/weekly")
    public ResponseEntity<List<AverageBodyweightDto>> getWeeklyBodyweightStat(
            @RequestAttribute UUID userId
    ) {
        User currUser = userService.getUserById(userId);
        List<WeeklyBodyweight> latestWeeklyStatus = bodyweightService.getWeeklyStatus(currUser.getId());
        return ResponseEntity.ok(latestWeeklyStatus.stream().map(bodyweightMapper::toAverageBodyweightDto).toList());
    }

    @GetMapping(path = "/weekly/latest")
    public ResponseEntity<AverageBodyweightDto> getLatestWeeklyBodyweightStat(
            @RequestAttribute UUID userId
    ) {
        User currUser = userService.getUserById(userId);
        WeeklyBodyweight weeklyBodyweight = bodyweightService.getLatestWeeklyStatus(currUser.getId())
                .orElseThrow(() -> new EntityNotFoundException("Bodyweight not found"));

        return ResponseEntity.ok(bodyweightMapper.toAverageBodyweightDto(weeklyBodyweight));
    }

    @GetMapping(path = "/latest")
    public ResponseEntity<BodyweightDto> getLatestBodyweight(
            @RequestAttribute UUID userId
    ) {
        User currUser = userService.getUserById(userId);
        Bodyweight latestBodyweight = bodyweightService.getLatestBodyweight(currUser)
                .orElseThrow(() -> new EntityNotFoundException("Bodyweight not found"));

        return ResponseEntity.ok(bodyweightMapper.toBodyweightDto(latestBodyweight));
    }

    @PostMapping
    public ResponseEntity<BodyweightDto> createBodyweight(
            @RequestAttribute UUID userId,
            @Valid @RequestBody CreateBodyweightRequestDto createBodyweightRequestDto) {
        User currUser = userService.getUserById(userId);
        CreateBodyweightRequest createExerciseRequest = bodyweightMapper.toCreateExerciseRequest(createBodyweightRequestDto);
        Bodyweight bodyweight = bodyweightService.createBodyweight(currUser, createExerciseRequest);
        return new ResponseEntity<>(bodyweightMapper.toBodyweightDto(bodyweight), HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteBodyweight(
            @RequestAttribute UUID userId,
            @PathVariable Long id) {
        User currUser = userService.getUserById(userId);
        bodyweightService.deleteBodyweight(currUser, id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<BodyweightDto> updateBodyweight(
            @RequestAttribute UUID userId,
            @Valid @RequestBody UpdateBodyweightRequestDto updateBodyweightRequestDto,
            @PathVariable Long id) {
        User currUser = userService.getUserById(userId);
        UpdateBodyweightRequest updateExerciseRequest = bodyweightMapper.toUpdateExerciseRequest(updateBodyweightRequestDto);
        Bodyweight bodyweight = bodyweightService.updateBodyweight(currUser, id, updateExerciseRequest);
        return new ResponseEntity<>(bodyweightMapper.toBodyweightDto(bodyweight), HttpStatus.OK);
    }
}
