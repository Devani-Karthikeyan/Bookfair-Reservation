package com.project.Bookfair_Reservation.repository;

import com.project.Bookfair_Reservation.entity.Hall;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HallRepository extends JpaRepository<Hall, Long> {
    Optional<Hall> findByHallName(String hallName);
}