package com.project.Bookfair_Reservation.service;

import com.project.Bookfair_Reservation.entity.Stall;
import com.project.Bookfair_Reservation.entity.User;

import java.util.List;

public interface StallService {
    /**
     * Reserve a stall - only PUBLISHER or VENDOR can reserve
     */
    public Stall reserveStall(Long stallId, User user);
    /**
     * Book a stall - only the user who reserved it can book
     */
    public Stall bookStall(Long stallId, User user);

    /**
     * Cancel reservation - only the user who reserved it can cancel
     */
    public Stall cancelReservation(Long stallId, User user);

    /**
     * List available stalls in a hall
     */
    public List<Stall> getAvailableStallsByHall(Long hallId);
}