package com.liftts.backend.domain.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExerciseDto {
    private Long id;
    private String name;
    private Boolean isKilogram;
    private Double weight;
    private Integer sets;
    private Integer reps;
//    private UserDto user;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
