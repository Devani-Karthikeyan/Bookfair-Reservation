package com.project.Bookfair_Reservation.controller;

import com.project.Bookfair_Reservation.dto.reservation.ReservationRequestDTO;
import com.project.Bookfair_Reservation.dto.reservation.ReservationResponseDTO;
import com.project.Bookfair_Reservation.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping
    public ReservationResponseDTO createReservation(@RequestBody ReservationRequestDTO requestDTO) {
        return reservationService.createReservation(requestDTO);
    }

    @GetMapping("/user/{userId}")
    public List<ReservationResponseDTO> getReservationsByUser(@PathVariable Long userId) {
        return reservationService.getReservationsByUser(userId);
    }

    @GetMapping
    public List<ReservationResponseDTO> getAllReservations() {
        return reservationService.getAllReservations();
    }
}
