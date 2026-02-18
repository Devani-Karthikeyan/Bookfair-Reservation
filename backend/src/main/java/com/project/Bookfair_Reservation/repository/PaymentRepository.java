package com.project.Bookfair_Reservation.repository;

import com.project.Bookfair_Reservation.entity.Payment;
import com.project.Bookfair_Reservation.enumtype.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByTransactionId(String transactionId);

    List<Payment> findByUser_Id(Long userId);

    List<Payment> findByPaymentStatus(PaymentStatus paymentStatus);
}
