package com.liftts.backend.domain.dtos;

import com.liftts.backend.domain.entities.User;
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
public class BodyweightDto {
    private Long id;
    private Boolean isKilogram;
    private Double weight;
    private LocalDate date;
//    private UserDto user;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
