package com.liftts.backend.services.implementations;

import com.liftts.backend.domain.dtos.AverageBodyweightDto;
import com.liftts.backend.domain.dtos.CreateBodyweightRequest;
import com.liftts.backend.domain.dtos.UpdateBodyweightRequest;
import com.liftts.backend.domain.dtos.WeeklyBodyweight;
import com.liftts.backend.domain.entities.Bodyweight;
import com.liftts.backend.domain.entities.User;
import com.liftts.backend.repositories.BodyweightRepository;
import com.liftts.backend.services.BodyweightService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BodyweightServiceImplementation implements BodyweightService {
    private final BodyweightRepository bodyweightRepository;

    @Override
    public List<Bodyweight> getBodyweights(User user) {
        return bodyweightRepository.findAllByUserOrderByDateDesc(user);
    }

    @Override
    public Bodyweight createBodyweight(User user, CreateBodyweightRequest createBodyweightRequest) {
        LocalDate date = createBodyweightRequest.getDate();
        if (bodyweightRepository.existsByDateAndUser(date, user)) {
            throw new IllegalArgumentException("Bodyweight already exists with date: " + date);
        }
        Bodyweight bodyweight = new Bodyweight();
        bodyweight.setUser(user);
        bodyweight.setDate(date);
        // always store in kg
        bodyweight.setWeight(createBodyweightRequest.getIsKilogram() ? createBodyweightRequest.getWeight() : createBodyweightRequest.getWeight() / 2.205);
        bodyweight.setIsKilogram(createBodyweightRequest.getIsKilogram());
        return bodyweightRepository.save(bodyweight);
    }

    @Override
    public void deleteBodyweight(User user, Long id) {
        bodyweightRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new IllegalArgumentException("Bodyweight not found with id: " + id));
        bodyweightRepository.deleteById(id);
    }

    @Override
    public Bodyweight updateBodyweight(User user, Long id, UpdateBodyweightRequest updateBodyweightRequest) {
        Bodyweight bodyweight = bodyweightRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new IllegalArgumentException("Bodyweight not found with id: " + id));

        // always store in kg
        bodyweight.setWeight(updateBodyweightRequest.getIsKilogram() ? updateBodyweightRequest.getWeight() : updateBodyweightRequest.getWeight() / 2.205);
        bodyweight.setIsKilogram(updateBodyweightRequest.getIsKilogram());
        return bodyweightRepository.save(bodyweight);
    }

    @Override
    public List<WeeklyBodyweight> getLatestWeeklyStatus(UUID userId) {
        return bodyweightRepository.getWeeklyWeightStat(userId);
    }
}
