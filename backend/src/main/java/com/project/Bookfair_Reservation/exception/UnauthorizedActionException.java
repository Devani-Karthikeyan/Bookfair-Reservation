package com.project.Bookfair_Reservation.exception;

public class UnauthorizedActionException extends RuntimeException {
    public UnauthorizedActionException(String message) {

        super(message);
    }
}
