package com.liftts.backend.services;

import com.liftts.backend.domain.dtos.CreateBodyweightRequest;
import com.liftts.backend.domain.dtos.UpdateBodyweightRequest;
import com.liftts.backend.domain.dtos.WeeklyBodyweight;
import com.liftts.backend.domain.entities.Bodyweight;
import com.liftts.backend.domain.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BodyweightService {
    Page<Bodyweight> getBodyweights(User user, Pageable pageable);
    Bodyweight createBodyweight(User user, CreateBodyweightRequest createBodyweightRequest);
    void deleteBodyweight(User user, Long id);
    Bodyweight updateBodyweight(User user, Long id, UpdateBodyweightRequest updateBodyweightRequest);
    List<WeeklyBodyweight> getWeeklyStatus(UUID userId);
    Optional<WeeklyBodyweight> getLatestWeeklyStatus(UUID userId);
    Optional<Bodyweight> getLatestBodyweight(User user);
}
