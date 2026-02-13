package com.project.Bookfair_Reservation.controller;

import com.project.Bookfair_Reservation.entity.Hall;
import com.project.Bookfair_Reservation.service.HallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/halls")
public class HallController {

    @Autowired
    private HallService hallService;

    // Only EMPLOYEE can create a hall
    @PostMapping
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<Hall> createHall(@RequestBody Hall hall) {
        return ResponseEntity.ok(hallService.createHall(hall));
    }

    // All roles can view halls
    @GetMapping
    @PreAuthorize("hasAnyRole('EMPLOYEE','PUBLISHER','VENDOR')")
    public ResponseEntity<List<Hall>> getAllHalls() {
        return ResponseEntity.ok(hallService.getAllHalls());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('EMPLOYEE','PUBLISHER','VENDOR')")
    public ResponseEntity<Hall> getHall(@PathVariable Long id) {
        return ResponseEntity.ok(hallService.getHallById(id));
    }

    // Only EMPLOYEE can update a hall
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<Hall> updateHall(@PathVariable Long id, @RequestBody Hall hall) {
        hall.setId(id);
        return ResponseEntity.ok(hallService.updateHall(hall));
    }

    // Only EMPLOYEE can delete a hall
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<String> deleteHall(@PathVariable Long id) {
        hallService.deleteHall(id);
        return ResponseEntity.ok("Hall deleted successfully");
    }
}