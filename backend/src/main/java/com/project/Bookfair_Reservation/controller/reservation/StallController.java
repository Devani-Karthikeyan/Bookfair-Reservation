package com.project.Bookfair_Reservation.controller.reservation;

import com.project.Bookfair_Reservation.dto.GeneralResponseDto;
import com.project.Bookfair_Reservation.entity.Stall;
import com.project.Bookfair_Reservation.service.StallService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stalls")
@Slf4j
public class StallController {

    @Autowired
    StallService stallService;

    GeneralResponseDto generalResponseDto;

    // Create Stall (EMPLOYEE)
    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('EMPLOYEE')")
    public ResponseEntity<GeneralResponseDto> createStall(@RequestBody Stall stall) {

        generalResponseDto = new GeneralResponseDto();

        try{
            generalResponseDto.setData(stallService.createStall(stall));
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setRes(true);
            generalResponseDto.setStatusCode(200);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/stalls/create", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }
    }

    // Update Stall
    @PutMapping("/update/stallid={stallId}")
    @PreAuthorize("hasAnyRole('EMPLOYEE')")
    public ResponseEntity<GeneralResponseDto> updateStall(@PathVariable Long stallId, @RequestBody Stall stall) {

        generalResponseDto = new GeneralResponseDto();

        try{
            stall.setId(stallId);

            generalResponseDto.setData(stallService.updateStall(stall));
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setRes(true);
            generalResponseDto.setStatusCode(200);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/stalls/update/stallid={stallId}", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }
    }

    // Delete Stall
    @DeleteMapping("/delete/stallid={stallId}")
    @PreAuthorize("hasAnyRole('EMPLOYEE')")
    public ResponseEntity<GeneralResponseDto> deleteStall(@PathVariable Long stallId) {

        generalResponseDto = new GeneralResponseDto();

        try{
            stallService.deleteStall(stallId);
            generalResponseDto.setData("Stall deleted successfully");
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setStatusCode(200);
            generalResponseDto.setRes(true);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/stalls/delete/stallid={stallId}", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }

    }

    // Get All Stalls
    @GetMapping("/allstalls")
    @PreAuthorize("hasAnyRole('EMPLOYEE','PUBLISHER','VENDOR')")
    public ResponseEntity<GeneralResponseDto> getAllStalls() {

        generalResponseDto = new GeneralResponseDto();

        try{
            generalResponseDto.setData(stallService.getAllStalls());
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setStatusCode(200);
            generalResponseDto.setRes(true);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/stalls/allstalls", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }

    }

    // Get Stall By Id
    @GetMapping("/get/stallid={stallId}")
    @PreAuthorize("hasAnyRole('EMPLOYEE','PUBLISHER','VENDOR')")
    public ResponseEntity<GeneralResponseDto> getStallById(@PathVariable Long stallId) {

        generalResponseDto = new GeneralResponseDto();

        try{
            generalResponseDto.setData(stallService.getStallById(stallId));
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setStatusCode(200);
            generalResponseDto.setRes(true);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/stalls/get/stallid={stallId}", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }

    }

    // Get Available Stalls By Hall
    @GetMapping("/available/hall/hallid={hallId}")
    @PreAuthorize("hasAnyRole('EMPLOYEE','PUBLISHER','VENDOR')")
    public ResponseEntity<GeneralResponseDto> getAvailableStalls(@PathVariable Long hallId) {

        generalResponseDto = new GeneralResponseDto();

        try{
            generalResponseDto.setData(stallService.getAvailableStallsByHall(hallId));
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setStatusCode(200);
            generalResponseDto.setRes(true);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/stalls/available/hall/hallid={hallId}", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }


    }
}
