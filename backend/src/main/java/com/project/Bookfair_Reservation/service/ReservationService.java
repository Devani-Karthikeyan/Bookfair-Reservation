package com.project.Bookfair_Reservation.service;

import com.project.Bookfair_Reservation.dto.request.ReservationCancelReqDto;
import com.project.Bookfair_Reservation.dto.request.ReservationRequestDTO;
import com.project.Bookfair_Reservation.dto.result.ReservationResultDTO;

import java.util.List;

public interface ReservationService {

    ReservationResultDTO createReservation(ReservationRequestDTO requestDTO);

    List<ReservationResultDTO> getReservationsByUser(Long userId);

    List<ReservationResultDTO> getAllReservations();

    ReservationResultDTO cancelReservation(ReservationCancelReqDto reservationCancelReqDto);
}
