package com.project.Bookfair_Reservation.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentRequestDTO {
    private Long reservationId;
    private Long userId;
    private String paymentMethod;  // e.g., "CARD", "PAYPAL"
}
