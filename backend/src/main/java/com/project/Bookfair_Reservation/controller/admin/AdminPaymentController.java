package com.project.Bookfair_Reservation.controller.admin;

import com.project.Bookfair_Reservation.dto.GeneralResponseDto;
import com.project.Bookfair_Reservation.dto.result.PaymentResultDTO;
import com.project.Bookfair_Reservation.enumtype.PaymentStatus;
import com.project.Bookfair_Reservation.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/payments")
@RequiredArgsConstructor
@PreAuthorize("hasRole('EMPLOYEE')")
@Slf4j
public class AdminPaymentController {

    @Autowired
    PaymentService paymentService;

    GeneralResponseDto generalResponseDto;

    // View all payments
    @GetMapping
    public ResponseEntity<GeneralResponseDto> getAllPayments() {

        generalResponseDto = new GeneralResponseDto();

        try{
            generalResponseDto.setData(paymentService.getAllPayments());
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setStatusCode(200);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/admin/payments/. Error", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }
    }

    // View payment details
    @GetMapping("/{id}")
    public ResponseEntity<GeneralResponseDto> getPayment(@PathVariable Long id) {
        generalResponseDto = new GeneralResponseDto();

        try{
            generalResponseDto.setData(paymentService.getPaymentById(id));
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setStatusCode(200);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/admin/payments/{id}. Occurred error is {}", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }
    }

    // Filter payments by status
    @GetMapping("/status/{status}")
    public ResponseEntity<GeneralResponseDto> getPaymentsByStatus(@PathVariable PaymentStatus status) {
        generalResponseDto = new GeneralResponseDto();

        try{
            generalResponseDto.setData(paymentService.getPaymentsByStatus(status));
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setStatusCode(200);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/admin/payments/status/{status}. Occurred error is {}", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }
    }
}
