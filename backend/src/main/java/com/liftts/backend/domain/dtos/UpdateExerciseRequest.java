package com.liftts.backend.domain.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateExerciseRequest {
    private String name;
    private Boolean isKilogram;
    private Double weight;
    private Integer sets;
    private Integer reps;
}
