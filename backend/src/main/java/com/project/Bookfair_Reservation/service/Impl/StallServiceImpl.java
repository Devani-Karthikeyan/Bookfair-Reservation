package com.project.Bookfair_Reservation.service.Impl;

import com.project.Bookfair_Reservation.entity.Stall;
import com.project.Bookfair_Reservation.entity.User;
import com.project.Bookfair_Reservation.enumtype.StallStatus;
import com.project.Bookfair_Reservation.repository.StallRepository;
import com.project.Bookfair_Reservation.service.StallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StallServiceImpl implements StallService {

    @Autowired
    private StallRepository stallRepository;


    public Stall reserveStall(Long stallId, User user) {
        Stall stall = stallRepository.findById(stallId)
                .orElseThrow(() -> new RuntimeException("Stall not found"));

        if (stall.getStatus() != StallStatus.AVAILABLE) {
            throw new RuntimeException("Stall is not available for reservation");
        }

        if (!(user.getRoles().name().equals("PUBLISHER") || user.getRoles().name().equals("VENDOR"))) {
            throw new RuntimeException("Only Publisher or Vendor can reserve stalls");
        }

        stall.setStatus(StallStatus.RESERVED);
        stall.setReservedBy(user);  // Track which user reserved
        return stallRepository.save(stall);
    }


    public Stall bookStall(Long stallId, User user) {
        Stall stall = stallRepository.findById(stallId)
                .orElseThrow(() -> new RuntimeException("Stall not found"));

        if (stall.getStatus() != StallStatus.RESERVED) {
            throw new RuntimeException("Stall is not reserved, cannot book");
        }

        if (!stall.getReservedBy().getId().equals(user.getId())) {
            throw new RuntimeException("You can only book stalls that you reserved");
        }

        stall.setStatus(StallStatus.RESERVED);
        return stallRepository.save(stall);
    }



    public Stall cancelReservation(Long stallId, User user) {
        Stall stall = stallRepository.findById(stallId)
                .orElseThrow(() -> new RuntimeException("Stall not found"));

        if (stall.getStatus() != StallStatus.RESERVED) {
            throw new RuntimeException("Stall is not reserved, cannot cancel");
        }

        if (!stall.getReservedBy().getId().equals(user.getId())) {
            throw new RuntimeException("You can only cancel your own reservations");
        }

        stall.setStatus(StallStatus.AVAILABLE);
        stall.setReservedBy(null);
        return stallRepository.save(stall);
    }



    public List<Stall> getAvailableStallsByHall(Long hallId) {
        return stallRepository.findByHallIdAndStatus(hallId, StallStatus.AVAILABLE);
    }
}