package com.liftts.backend.domain.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkoutDto {
    private Long id;
    private LocalDate exerciseDate;
    private List<ExerciseDto> exercises;
//    private UserDto user;
}
