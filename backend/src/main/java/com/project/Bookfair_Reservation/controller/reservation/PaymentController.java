package com.project.Bookfair_Reservation.controller.reservation;

import com.project.Bookfair_Reservation.dto.GeneralResponseDto;
import com.project.Bookfair_Reservation.dto.request.PaymentRequestDTO;
import com.project.Bookfair_Reservation.dto.result.PaymentResultDTO;
import com.project.Bookfair_Reservation.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@Slf4j
public class PaymentController {

    @Autowired
    PaymentService paymentService;

    GeneralResponseDto generalResponseDto;

    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('PUBLISHER','VENDOR')")
    public ResponseEntity<GeneralResponseDto> createPayment(@RequestBody PaymentRequestDTO requestDTO) {

        generalResponseDto = new GeneralResponseDto();

        try{
            generalResponseDto.setData(paymentService.createPayment(requestDTO));
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setStatusCode(201);
            generalResponseDto.setRes(true);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/hall/create. Occurred error is {}", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }
    }

    @PostMapping("/success/paymentid={transactionId}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<GeneralResponseDto> completePayment(@PathVariable String transactionId) {

        generalResponseDto = new GeneralResponseDto();

        try{
            generalResponseDto.setData(paymentService.completePayment(transactionId));
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setStatusCode(200);
            generalResponseDto.setRes(true);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/hall/success/paymentid={transactionId} Occurred error is {}", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }


    }

    @PostMapping("/fail/paymentid={transactionId}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<GeneralResponseDto> failPayment(@PathVariable String transactionId) {

        generalResponseDto = new GeneralResponseDto();

        try{
            generalResponseDto.setData(paymentService.failPayment(transactionId));
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setStatusCode(200);
            generalResponseDto.setRes(true);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/hall/faild/paymentid={transactionId} Occurred error is {}", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }

    }

    @PostMapping("/refund/reservationid={reservationId}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<GeneralResponseDto> refundReservation(@PathVariable Long reservationId) {
//        return ResponseEntity.ok(paymentService.refundPayment(reservationId));

        generalResponseDto = new GeneralResponseDto();

        try{
            generalResponseDto.setData(paymentService.refundPayment(reservationId));
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setStatusCode(200);
            generalResponseDto.setRes(true);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/hall/refund/reservationid={reservationId} Occurred error is {}", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }
    }
}
