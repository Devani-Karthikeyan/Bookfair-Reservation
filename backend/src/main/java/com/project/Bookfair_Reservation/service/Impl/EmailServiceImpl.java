package com.project.Bookfair_Reservation.service.Impl;

import com.project.Bookfair_Reservation.service.EmailService;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Override
    public void sendReservationConfirmationEmail(
            String toEmail,
            String userName,
            String reservationId,
            byte[] qrImage
    ) {

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true);

            // Prepare Thymeleaf variables
            Context context = new Context();
            context.setVariable("name", userName);
            context.setVariable("reservationId", reservationId);

            // Process template
            String htmlContent =
                    templateEngine.process("reservation-confirmation", context);

            helper.setTo(toEmail);
            helper.setSubject(" BookFair Reservation Confirmed");
            helper.setText(htmlContent, true);

            // Embed QR image (inline)
            helper.addInline(
                    "qrImage",
                    new ByteArrayResource(qrImage),
                    "image/png"
            );

            mailSender.send(message);

        } catch (Exception e) {
            e.printStackTrace(); // <-- prints full stack trace in console
            throw new RuntimeException("Failed to send confirmation email: " + e.getMessage(), e);
        }

    }

    @Override
    public void sendReservationCancelledEmail(
            String toEmail,
            String userName,
            String reservationId
    ) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true);

            Context context = new Context();
            context.setVariable("name", userName);
            context.setVariable("reservationId", reservationId);

            String htmlContent =
                    templateEngine.process("reservation-cancelled", context);

            helper.setTo(toEmail);
            helper.setSubject(" BookFair Reservation Cancelled");
            helper.setText(htmlContent, true);

            mailSender.send(message);

        }catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to send cancellation email: " + e.getMessage(), e);
        }

    }


}

