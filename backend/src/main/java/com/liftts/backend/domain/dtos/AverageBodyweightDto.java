package com.liftts.backend.domain.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AverageBodyweightDto {
    private LocalDateTime week;
    private Double average;
    private Double minWeight;
    private Double maxWeight;
}
