package com.project.Bookfair_Reservation.controller;

import com.project.Bookfair_Reservation.dto.request.ReservationRequestDTO;
import com.project.Bookfair_Reservation.dto.result.ReservationResultDTO;
import com.project.Bookfair_Reservation.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;



import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping
    @PreAuthorize("hasAnyRole('PUBLISHER','VENDOR')")
    public ReservationResultDTO createReservation(@RequestBody ReservationRequestDTO requestDTO) {
        return reservationService.createReservation(requestDTO);
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('PUBLISHER','VENDOR')")
    public List<ReservationResultDTO> getReservationsByUser(@PathVariable Long userId) {
        return reservationService.getReservationsByUser(userId);
    }

    @GetMapping
    @PreAuthorize("hasRole('EMPLOYEE')")
    public List<ReservationResultDTO> getAllReservations() {
        return reservationService.getAllReservations();
    }
}
