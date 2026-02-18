package com.project.Bookfair_Reservation.service;

public interface EmailService {

    void sendReservationConfirmationEmail(
            String toEmail,
            String userName,
            String reservationId,
            byte[] qrImage
    );

    void sendReservationCancelledEmail(
            String toEmail,
            String userName,
            String reservationId
    );

}



