package com.liftts.backend.domain.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateExerciseRequestDto {
    @NotBlank(message = "Exercise name is required")
    @Size(min = 1, max = 50, message = "Exercise name must be between {min} and {max} characters")
    private String name;

    @NotNull(message = "Unit is required")
    private Boolean isKilogram;

    @NotNull(message = "Weight is required")
    @Min(value = 1, message = "Weight should be greater than or equal to {value}kg/lb")
    private Integer weight;

    @NotNull(message = "Set is required")
    @Min(value = 1, message = "Set should be greater than or equal to {value}kg/lb")
    private Integer sets;

    @NotNull(message = "Rep is required")
    @Min(value = 1, message = "Rep should be greater than or equal to {value}kg/lb")
    private Integer reps;
}
