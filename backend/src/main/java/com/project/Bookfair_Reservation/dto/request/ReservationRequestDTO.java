package com.project.Bookfair_Reservation.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ReservationRequestDTO {
    private String userEmail;
    private List<Long> stallId;

}
