package com.project.Bookfair_Reservation.exception;

import com.project.Bookfair_Reservation.dto.GeneralResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private ResponseEntity<GeneralResponseDto> buildResponse(String msg, int status) {
        GeneralResponseDto dto = new GeneralResponseDto();
        dto.setMsg(msg);
        dto.setStatusCode(status);
        dto.setRes(false);
        return ResponseEntity.status(status).body(dto);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<GeneralResponseDto> handleNotFound(ResourceNotFoundException ex) {
        return buildResponse(ex.getMessage(), 404);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<GeneralResponseDto> handleValidation(MethodArgumentNotValidException ex) {
        FieldError error = ex.getBindingResult().getFieldError();
        String msg = error != null ? error.getDefaultMessage() : "Invalid input";
        return buildResponse(msg, 400);
    }

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<GeneralResponseDto> handleDuplicate(DuplicateResourceException ex) {
        return buildResponse(ex.getMessage(), 409);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<GeneralResponseDto> handleBadRequest(BadRequestException ex) {
        return buildResponse(ex.getMessage(), 400);
    }

    @ExceptionHandler(UnauthorizedActionException.class)
    public ResponseEntity<GeneralResponseDto> handleUnauthorized(UnauthorizedActionException ex) {
        return buildResponse(ex.getMessage(), 401);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<GeneralResponseDto> handleGeneric(Exception ex) {
        return buildResponse(ex.getMessage(), 500);
    }
}
