package com.project.Bookfair_Reservation.dto.result;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ReservationResultDTO {
    private Long reservationId;
    private  String message;
}
