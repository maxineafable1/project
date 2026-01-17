package com.liftts.backend.domain.dtos;

import com.liftts.backend.domain.entities.Exercise;
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
public class ExerciseGroupDto {
    private LocalDate exerciseDate;
    private List<ExerciseDto> exercises;
}
