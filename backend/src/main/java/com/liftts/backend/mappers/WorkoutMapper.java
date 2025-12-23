package com.liftts.backend.mappers;

import com.liftts.backend.domain.dtos.WorkoutDto;
import com.liftts.backend.domain.entities.Workout;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface WorkoutMapper {
    WorkoutDto toDto(Workout workout);
}
