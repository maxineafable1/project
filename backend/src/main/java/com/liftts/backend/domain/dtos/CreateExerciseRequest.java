package com.liftts.backend.domain.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateExerciseRequest {
    private String name;
    private Boolean isKilogram;
    private Integer weight;
    private Integer sets;
    private Integer reps;
    private LocalDate exerciseDate;
}
