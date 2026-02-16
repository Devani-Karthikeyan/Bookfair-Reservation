package com.project.Bookfair_Reservation.service;

import com.project.Bookfair_Reservation.entity.Stall;

import java.util.List;

public interface StallService {

    Stall createStall(Stall stall);

    Stall updateStall(Stall stall);

    void deleteStall(Long stallId);

    Stall getStallById(Long stallId);

    List<Stall> getAllStalls();

    List<Stall> getAvailableStallsByHall(Long hallId);
}
