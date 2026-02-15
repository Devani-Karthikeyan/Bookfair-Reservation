package com.project.Bookfair_Reservation.repository;

import com.project.Bookfair_Reservation.entity.Reservation;
import com.project.Bookfair_Reservation.enumtype.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    // Prevent double booking (ignore cancelled reservations)
    boolean existsByReservationStalls_StallIdAndStatusNot(Long stallId, ReservationStatus status);

    // Count active reservations of user (not cancelled or expired)
    int countByUser_IdAndStatusNotIn(Long userId, List<ReservationStatus> statuses);

    // Get reservations of particular user
    List<Reservation> findByUser_Id(Long userId);
}
