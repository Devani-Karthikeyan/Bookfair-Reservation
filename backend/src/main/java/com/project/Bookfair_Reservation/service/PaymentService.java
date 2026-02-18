package com.project.Bookfair_Reservation.service;

import com.project.Bookfair_Reservation.dto.request.PaymentRequestDTO;
import com.project.Bookfair_Reservation.dto.result.PaymentResultDTO;
import com.project.Bookfair_Reservation.enumtype.PaymentStatus;

import java.util.List;

public interface PaymentService {

    PaymentResultDTO createPayment(PaymentRequestDTO requestDTO);

    PaymentResultDTO completePayment(String transactionId);

    PaymentResultDTO failPayment(String transactionId);

    PaymentResultDTO refundPayment(Long reservationId);

    List<PaymentResultDTO> getAllPayments();

    PaymentResultDTO getPaymentById(Long id);

    List<PaymentResultDTO> getPaymentsByStatus(PaymentStatus status);

}
