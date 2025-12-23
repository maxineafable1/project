package com.liftts.backend.domain.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateBodyweightRequestDto {
    @NotNull(message = "Unit is required")
    private Boolean isKilogram;

    @NotNull(message = "Weight is required")
    @Min(value = 1, message = "Weight should be greater than or equal to {value}kg/lb")
    private Integer weight;
}
