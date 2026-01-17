package com.liftts.backend.domain.dtos;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface WeeklyBodyweight {
    LocalDateTime getWeek();
    BigDecimal getAverage();
    BigDecimal getMinWeight();
    BigDecimal getMaxWeight();
}
