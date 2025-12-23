package com.liftts.backend.controllers;

import com.liftts.backend.domain.dtos.*;
import com.liftts.backend.domain.entities.Bodyweight;
import com.liftts.backend.domain.entities.User;
import com.liftts.backend.mappers.BodyweightMapper;
import com.liftts.backend.services.BodyweightService;
import com.liftts.backend.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/bodyweights")
@RequiredArgsConstructor
public class BodyweightController {
    private final UserService userService;
    private final BodyweightService bodyweightService;
    private final BodyweightMapper bodyweightMapper;

    @GetMapping
    public ResponseEntity<List<BodyweightDto>> getBodyweights(
            @RequestAttribute UUID userId
    ) {
        User currUser = userService.getUserById(userId);
        List<Bodyweight> bodyweights = bodyweightService.getBodyweights(currUser);
        List<BodyweightDto> bodyweightDtos = bodyweights.stream().map(bodyweightMapper::toBodyweightDto).toList();
        return ResponseEntity.ok(bodyweightDtos);
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
