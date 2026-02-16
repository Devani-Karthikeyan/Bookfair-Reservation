package com.project.Bookfair_Reservation.service.Impl;

import com.project.Bookfair_Reservation.dto.request.PaymentRequestDTO;
import com.project.Bookfair_Reservation.dto.result.PaymentResultDTO;
import com.project.Bookfair_Reservation.entity.Payment;
import com.project.Bookfair_Reservation.entity.Reservation;
import com.project.Bookfair_Reservation.enumtype.PaymentStatus;
import com.project.Bookfair_Reservation.enumtype.ReservationStatus;
import com.project.Bookfair_Reservation.enumtype.StallStatus;
import com.project.Bookfair_Reservation.repository.PaymentRepository;
import com.project.Bookfair_Reservation.repository.ReservationRepository;
import com.project.Bookfair_Reservation.service.PaymentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final ReservationRepository reservationRepository;

    @Override
    public PaymentResultDTO createPayment(PaymentRequestDTO requestDTO) {

        Reservation reservation = reservationRepository.findById(requestDTO.getReservationId())
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        if (reservation.getStatus() != ReservationStatus.PENDING_PAYMENT) {
            throw new RuntimeException("Reservation not eligible for payment.");
        }

        Payment payment = Payment.builder()
                .reservation(reservation)
                .user(reservation.getUser())
                .amount(reservation.getTotalAmount())
                .paymentStatus(PaymentStatus.PENDING)
                .paymentMethod(requestDTO.getPaymentMethod() != null ? requestDTO.getPaymentMethod() : "CARD")
                .transactionId(UUID.randomUUID().toString())
                .referenceNumber("BF-" + System.currentTimeMillis())
                .build();

        paymentRepository.save(payment);

        return new PaymentResultDTO(
                payment.getTransactionId(),
                reservation.getId(),
                payment.getAmount(),
                payment.getPaymentStatus(),
                "Payment created. Awaiting confirmation."
        );
    }

    @Override
    public PaymentResultDTO completePayment(String transactionId) {

        Payment payment = paymentRepository.findByTransactionId(transactionId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        if (payment.getPaymentStatus() == PaymentStatus.COMPLETED) {
            throw new RuntimeException("Payment already completed.");
        }

        payment.setPaymentStatus(PaymentStatus.COMPLETED);

        Reservation reservation = payment.getReservation();
        reservation.setStatus(ReservationStatus.CONFIRMED);
        reservation.setQrCode(UUID.randomUUID().toString());

        // BOOK STALLS
        reservation.getReservationStalls().forEach(rs -> rs.getStall().setStatus(StallStatus.BOOKED));

        reservationRepository.save(reservation);
        paymentRepository.save(payment);

        return new PaymentResultDTO(
                payment.getTransactionId(),
                reservation.getId(),
                payment.getAmount(),
                payment.getPaymentStatus(),
                "Payment successful. Reservation confirmed."
        );
    }

    @Override
    public PaymentResultDTO failPayment(String transactionId) {

        Payment payment = paymentRepository.findByTransactionId(transactionId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        payment.setPaymentStatus(PaymentStatus.FAILED);

        Reservation reservation = payment.getReservation();
        reservation.setStatus(ReservationStatus.CANCELLED);

        reservationRepository.save(reservation);
        paymentRepository.save(payment);

        return new PaymentResultDTO(
                payment.getTransactionId(),
                reservation.getId(),
                payment.getAmount(),
                payment.getPaymentStatus(),
                "Payment failed. Reservation cancelled."
        );
    }

    @Override
    public PaymentResultDTO refundPayment(Long reservationId) {

        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        if (reservation.getStatus() != ReservationStatus.CONFIRMED) {
            throw new RuntimeException("Only confirmed reservations can be refunded.");
        }

        if (reservation.getReservationDate().plusDays(2).isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Refund period has expired.");
        }

        Payment payment = reservation.getPayment();
        if (payment == null || payment.getPaymentStatus() != PaymentStatus.COMPLETED) {
            throw new RuntimeException("No payment to refund.");
        }

        payment.setPaymentStatus(PaymentStatus.REFUNDED);
        reservation.setStatus(ReservationStatus.CANCELLED);

        reservationRepository.save(reservation);
        paymentRepository.save(payment);

        return new PaymentResultDTO(
                payment.getTransactionId(),
                reservation.getId(),
                payment.getAmount(),
                payment.getPaymentStatus(),
                "Reservation refunded successfully."
        );
    }
}
