package com.project.Bookfair_Reservation.controller.admin;

import com.project.Bookfair_Reservation.dto.result.PaymentResultDTO;
import com.project.Bookfair_Reservation.enumtype.PaymentStatus;
import com.project.Bookfair_Reservation.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/payments")
@RequiredArgsConstructor
@PreAuthorize("hasRole('EMPLOYEE')")
public class AdminPaymentController {

    private final PaymentService paymentService;

    // View all payments
    @GetMapping
    public ResponseEntity<List<PaymentResultDTO>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

    // View payment details
    @GetMapping("/{id}")
    public ResponseEntity<PaymentResultDTO> getPayment(@PathVariable Long id) {
        return ResponseEntity.ok(paymentService.getPaymentById(id));
    }

    // Filter payments by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<PaymentResultDTO>> getPaymentsByStatus(
            @PathVariable PaymentStatus status) {
        return ResponseEntity.ok(paymentService.getPaymentsByStatus(status));
    }
}
