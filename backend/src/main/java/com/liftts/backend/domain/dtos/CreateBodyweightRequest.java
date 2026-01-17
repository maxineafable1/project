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
public class CreateBodyweightRequest {
    private Boolean isKilogram;
    private Double weight;
    private LocalDate date;
}
