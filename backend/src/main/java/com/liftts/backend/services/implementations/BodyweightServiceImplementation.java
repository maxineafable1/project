package com.liftts.backend.services.implementations;

import com.liftts.backend.domain.dtos.CreateBodyweightRequest;
import com.liftts.backend.domain.dtos.UpdateBodyweightRequest;
import com.liftts.backend.domain.entities.Bodyweight;
import com.liftts.backend.domain.entities.User;
import com.liftts.backend.repositories.BodyweightRepository;
import com.liftts.backend.services.BodyweightService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

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
        bodyweight.setWeight(createBodyweightRequest.getWeight());
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

        bodyweight.setWeight(updateBodyweightRequest.getWeight());
        bodyweight.setIsKilogram(updateBodyweightRequest.getIsKilogram());
        return bodyweightRepository.save(bodyweight);
    }
}
