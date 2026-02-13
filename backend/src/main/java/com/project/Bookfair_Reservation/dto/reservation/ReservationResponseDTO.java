package com.project.Bookfair_Reservation.dto.reservation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter@AllArgsConstructor
public class ReservationResponseDTO {
    private Long reservationId;
    private  String message;
}
