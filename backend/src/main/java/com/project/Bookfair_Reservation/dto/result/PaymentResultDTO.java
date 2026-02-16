package com.project.Bookfair_Reservation.dto.result;

import com.project.Bookfair_Reservation.enumtype.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class PaymentResultDTO {
    private String transactionId;
    private Long reservationId;
    private BigDecimal amount;
    private PaymentStatus status;
    private String message;
}
