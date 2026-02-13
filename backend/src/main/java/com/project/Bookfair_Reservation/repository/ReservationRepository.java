package com.project.Bookfair_Reservation.repository;

import com.project.Bookfair_Reservation.entity.Reservation;
import com.project.Bookfair_Reservation.enumtype.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    boolean existsByReservationStalls_StallIdAndStatusNot(Long stallId, ReservationStatus status);

    int countByUser_IdAndStatusNot(Long userId, ReservationStatus status);

    List<Reservation> findByUser_Id(Long userId);
}
