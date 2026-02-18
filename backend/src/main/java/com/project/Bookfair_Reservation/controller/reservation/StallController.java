package com.project.Bookfair_Reservation.controller.reservation;

import com.project.Bookfair_Reservation.dto.GeneralResponseDto;
import com.project.Bookfair_Reservation.entity.Stall;
import com.project.Bookfair_Reservation.service.StallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stalls")
public class StallController {

    @Autowired
    StallService stallService;

    GeneralResponseDto generalResponseDto;
    // Create Stall (EMPLOYEE)
    @PostMapping
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<Stall> createStall(@RequestBody Stall stall) {
        return ResponseEntity.ok(stallService.createStall(stall));
    }

    // Update Stall
    @PutMapping("/{stallId}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<Stall> updateStall(@PathVariable Long stallId,
                                             @RequestBody Stall stall) {
        stall.setId(stallId);
        return ResponseEntity.ok(stallService.updateStall(stall));
    }

    // Delete Stall
    @DeleteMapping("/{stallId}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<String> deleteStall(@PathVariable Long stallId) {
        stallService.deleteStall(stallId);
        return ResponseEntity.ok("Stall deleted successfully");
    }

    // Get All Stalls
    @GetMapping
    @PreAuthorize("hasAnyRole('EMPLOYEE','PUBLISHER','VENDOR')")
    public ResponseEntity<List<Stall>> getAllStalls() {
        return ResponseEntity.ok(stallService.getAllStalls());
    }

    // Get Stall By Id
    @GetMapping("/{stallId}")
    @PreAuthorize("hasAnyRole('EMPLOYEE','PUBLISHER','VENDOR')")
    public ResponseEntity<Stall> getStallById(@PathVariable Long stallId) {
        return ResponseEntity.ok(stallService.getStallById(stallId));
    }

    // Get Available Stalls By Hall
    @GetMapping("/hall/{hallId}/available")
    @PreAuthorize("hasAnyRole('EMPLOYEE','PUBLISHER','VENDOR')")
    public ResponseEntity<List<Stall>> getAvailableStalls(@PathVariable Long hallId) {
        return ResponseEntity.ok(stallService.getAvailableStallsByHall(hallId));
    }
}
