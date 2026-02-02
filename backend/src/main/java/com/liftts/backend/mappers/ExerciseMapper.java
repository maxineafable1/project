package com.liftts.backend.mappers;

import com.liftts.backend.domain.dtos.*;
import com.liftts.backend.domain.entities.Exercise;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ExerciseMapper {
    ExerciseDto toExerciseDto(Exercise exercise);
    CreateExerciseRequest toCreateExerciseRequest(CreateExerciseRequestDto createExerciseRequestDto);
    UpdateExerciseRequest toUpdateExerciseRequest(UpdateExerciseRequestDto updateExerciseRequestDto);
}
