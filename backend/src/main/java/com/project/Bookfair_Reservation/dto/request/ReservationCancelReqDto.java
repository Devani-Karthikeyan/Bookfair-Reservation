package com.project.Bookfair_Reservation.dto.request;

import com.project.Bookfair_Reservation.enumtype.Roles;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReservationCancelReqDto {
    Long reservationId;
    String userEmail;
    Roles roles;
}
