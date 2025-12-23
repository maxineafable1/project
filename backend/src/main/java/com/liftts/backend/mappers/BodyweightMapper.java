package com.liftts.backend.mappers;

import com.liftts.backend.domain.dtos.*;
import com.liftts.backend.domain.entities.Bodyweight;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BodyweightMapper {
    BodyweightDto toBodyweightDto(Bodyweight bodyweight);
    CreateBodyweightRequest toCreateExerciseRequest(CreateBodyweightRequestDto createBodyweightRequestDto);
    UpdateBodyweightRequest toUpdateExerciseRequest(UpdateBodyweightRequestDto updateBodyweightRequestDto);
}
