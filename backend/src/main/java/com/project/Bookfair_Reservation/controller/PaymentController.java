package com.project.Bookfair_Reservation.controller;

import com.project.Bookfair_Reservation.dto.request.PaymentRequestDTO;
import com.project.Bookfair_Reservation.dto.result.PaymentResultDTO;
import com.project.Bookfair_Reservation.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('PUBLISHER','VENDOR')")
    public ResponseEntity<PaymentResultDTO> createPayment(@RequestBody PaymentRequestDTO requestDTO) {
        return ResponseEntity.ok(paymentService.createPayment(requestDTO));
    }

    @PostMapping("/success/{transactionId}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<PaymentResultDTO> completePayment(@PathVariable String transactionId) {
        return ResponseEntity.ok(paymentService.completePayment(transactionId));
    }

    @PostMapping("/fail/{transactionId}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<PaymentResultDTO> failPayment(@PathVariable String transactionId) {
        return ResponseEntity.ok(paymentService.failPayment(transactionId));
    }

    @PostMapping("/refund/{reservationId}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<PaymentResultDTO> refundReservation(@PathVariable Long reservationId) {
        return ResponseEntity.ok(paymentService.refundPayment(reservationId));
    }
}
