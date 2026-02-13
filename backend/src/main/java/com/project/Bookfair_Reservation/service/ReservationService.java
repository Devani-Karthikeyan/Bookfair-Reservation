package com.project.Bookfair_Reservation.service;

import com.project.Bookfair_Reservation.dto.reservation.ReservationRequestDTO;
import com.project.Bookfair_Reservation.dto.reservation.ReservationResponseDTO;

import java.util.List;

public interface ReservationService {
    ReservationResponseDTO createReservation(ReservationRequestDTO request);

    List<ReservationResponseDTO> getReservationsByUser(Long userId);

    List<ReservationResponseDTO> getAllReservations();
}
