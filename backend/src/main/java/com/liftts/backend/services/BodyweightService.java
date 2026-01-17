package com.liftts.backend.services;

import com.liftts.backend.domain.dtos.AverageBodyweightDto;
import com.liftts.backend.domain.dtos.CreateBodyweightRequest;
import com.liftts.backend.domain.dtos.UpdateBodyweightRequest;
import com.liftts.backend.domain.dtos.WeeklyBodyweight;
import com.liftts.backend.domain.entities.Bodyweight;
import com.liftts.backend.domain.entities.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BodyweightService {
    List<Bodyweight> getBodyweights(User user);
    Bodyweight createBodyweight(User user, CreateBodyweightRequest createBodyweightRequest);
    void deleteBodyweight(User user, Long id);
    Bodyweight updateBodyweight(User user, Long id, UpdateBodyweightRequest updateBodyweightRequest);
    List<WeeklyBodyweight> getWeeklyStatus(UUID userId);
    Optional<WeeklyBodyweight> getLatestWeeklyStatus(UUID userId);
    Optional<Bodyweight> getLatestBodyweight(User user);
}
