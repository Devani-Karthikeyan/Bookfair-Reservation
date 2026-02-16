package com.project.Bookfair_Reservation.service.Impl;

import com.project.Bookfair_Reservation.entity.Stall;
import com.project.Bookfair_Reservation.enumtype.StallStatus;
import com.project.Bookfair_Reservation.repository.StallRepository;
import com.project.Bookfair_Reservation.service.StallService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StallServiceImpl implements StallService {

    @Autowired
    private StallRepository stallRepository;

    @Override
    public Stall createStall(Stall stall) {
        // default status when creating
        if (stall.getStatus() == null) {
            stall.setStatus(StallStatus.AVAILABLE);
        }
        return stallRepository.save(stall);
    }

    @Override
    public Stall updateStall(Stall stall) {
        Stall existing = stallRepository.findById(stall.getId())
                .orElseThrow(() -> new EntityNotFoundException("Stall not found"));

        existing.setStallName(stall.getStallName());
        existing.setSize(stall.getSize());
        existing.setPrice(stall.getPrice());
        existing.setDescription(stall.getDescription());
        existing.setStatus(stall.getStatus());
        existing.setHall(stall.getHall());

        return stallRepository.save(existing);
    }

    @Override
    public void deleteStall(Long stallId) {
        Stall stall = stallRepository.findById(stallId)
                .orElseThrow(() -> new EntityNotFoundException("Stall not found"));
        stallRepository.delete(stall);
    }

    @Override
    public Stall getStallById(Long stallId) {
        return stallRepository.findById(stallId)
                .orElseThrow(() -> new EntityNotFoundException("Stall not found"));
    }

    @Override
    public List<Stall> getAllStalls() {
        return stallRepository.findAll();
    }

    @Override
    public List<Stall> getAvailableStallsByHall(Long hallId) {
        return stallRepository.findByHallIdAndStatus(hallId, StallStatus.AVAILABLE);
    }
}
