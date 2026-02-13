package com.project.Bookfair_Reservation.controller;

import com.project.Bookfair_Reservation.entity.Stall;
import com.project.Bookfair_Reservation.entity.User;
import com.project.Bookfair_Reservation.service.StallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stalls")
public class StallController {

    @Autowired
    private StallService stallService;

    // Only PUBLISHER can reserve a stall
    @PostMapping("/{stallId}/reserve")
    @PreAuthorize("hasRole('PUBLISHER')")
    public ResponseEntity<Stall> reserveStall(@PathVariable Long stallId, @AuthenticationPrincipal User publisher) {
        return ResponseEntity.ok(stallService.reserveStall(stallId, publisher));
    }

    // Only PUBLISHER can book a stall
    @PostMapping("/{stallId}/book")
    @PreAuthorize("hasRole('PUBLISHER')")
    public ResponseEntity<Stall> bookStall(@PathVariable Long stallId, @AuthenticationPrincipal User publisher) {
        return ResponseEntity.ok(stallService.bookStall(stallId, publisher));
    }

    // Only PUBLISHER can cancel their reservation
    @PostMapping("/{stallId}/cancel")
    @PreAuthorize("hasRole('PUBLISHER')")
    public ResponseEntity<Stall> cancelReservation(@PathVariable Long stallId, @AuthenticationPrincipal User publisher) {
        return ResponseEntity.ok(stallService.cancelReservation(stallId, publisher));
    }

    // All roles (EMPLOYEE, PUBLISHER, VENDOR) can view available stalls
    @GetMapping("/hall/{hallId}/available")
    @PreAuthorize("hasAnyRole('EMPLOYEE','PUBLISHER','VENDOR')")
    public ResponseEntity<List<Stall>> getAvailableStalls(@PathVariable Long hallId) {
        return ResponseEntity.ok(stallService.getAvailableStallsByHall(hallId));
    }
}
