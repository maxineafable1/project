package com.liftts.backend.domain.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@AllArgsConstructor
@Getter
public class ExercisePr {
    private Double weight;
    private String name;
    private Boolean isKilogram;
    private LocalDate exerciseDate;
}
