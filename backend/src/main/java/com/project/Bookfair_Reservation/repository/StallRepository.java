package com.project.Bookfair_Reservation.repository;


import com.project.Bookfair_Reservation.entity.Stall;
import com.project.Bookfair_Reservation.enumtype.StallStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StallRepository extends JpaRepository<Stall, Long> {
    List<Stall> findByHallIdAndStatus(Long hallId, StallStatus status);
}
