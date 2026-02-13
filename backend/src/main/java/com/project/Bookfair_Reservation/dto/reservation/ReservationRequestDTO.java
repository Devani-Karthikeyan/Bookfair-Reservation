package com.project.Bookfair_Reservation.dto.reservation;

import lombok.Getter;
import lombok.Setter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Getter
@Setter
public class ReservationRequestDTO {
    private Long userId;
    private List<Long> stallIds;
}
