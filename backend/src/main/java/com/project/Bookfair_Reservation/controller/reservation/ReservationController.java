package com.project.Bookfair_Reservation.controller.reservation;

import com.project.Bookfair_Reservation.dto.GeneralResponseDto;
import com.project.Bookfair_Reservation.dto.request.ReservationCancelReqDto;
import com.project.Bookfair_Reservation.dto.request.ReservationRequestDTO;
import com.project.Bookfair_Reservation.service.ReservationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;



import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@Slf4j
public class ReservationController {

    @Autowired
    ReservationService reservationService;

    GeneralResponseDto generalResponseDto;

    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('PUBLISHER','VENDOR')")
    public ResponseEntity<GeneralResponseDto> createReservation(@RequestBody ReservationRequestDTO requestDTO) {

        generalResponseDto = new GeneralResponseDto();

        try{
            generalResponseDto.setData(reservationService.createReservation(requestDTO));
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setStatusCode(200);
            generalResponseDto.setRes(true);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/reservation/create. Occurred error is {}", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }
    }

    @GetMapping("/user={userEmail}")
    @PreAuthorize("hasAnyRole('PUBLISHER','VENDOR', 'EMPLOYEE')")
    public ResponseEntity<GeneralResponseDto> getReservationsByUser(@PathVariable String userEmail) {

        generalResponseDto = new GeneralResponseDto();

        try{
            generalResponseDto.setData(reservationService.getReservationsByUser(userEmail));
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setStatusCode(200);
            generalResponseDto.setRes(true);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/reservation/user={userId}. Occurred error is {}", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }

    }

    @GetMapping("/allreservation")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<GeneralResponseDto> getAllReservations() {

        generalResponseDto = new GeneralResponseDto();

        try{
            generalResponseDto.setData(reservationService.getAllReservations());
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setStatusCode(200);
            generalResponseDto.setRes(true);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/reservation/allreservation. Occurred error is {}", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }

    }

    @PostMapping("/delete/reservationid={reservationId}")
    @PreAuthorize("hasAnyRole('PUBLISHER','VENDOR', 'EMPLOYEE')")
    public ResponseEntity<GeneralResponseDto> deleteReservation(@RequestBody ReservationCancelReqDto reservationCancelReqDto) {

        generalResponseDto = new GeneralResponseDto();

        try{
            generalResponseDto.setData(reservationService.cancelReservation(reservationCancelReqDto));
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setStatusCode(200);
            generalResponseDto.setRes(true);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/hall/delete/reservationid={reservationId} Occurred error is {}", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }

    }
}
