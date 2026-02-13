package com.project.Bookfair_Reservation.service.Impl;

import com.project.Bookfair_Reservation.dto.reservation.ReservationRequestDTO;
import com.project.Bookfair_Reservation.dto.reservation.ReservationResponseDTO;
import com.project.Bookfair_Reservation.entity.Reservation;
import com.project.Bookfair_Reservation.entity.ReservationStall;
import com.project.Bookfair_Reservation.entity.Stall;
import com.project.Bookfair_Reservation.entity.User;
import com.project.Bookfair_Reservation.enumtype.ReservationStatus;
import com.project.Bookfair_Reservation.repository.ReservationRepository;
import com.project.Bookfair_Reservation.repository.StallRepository;
import com.project.Bookfair_Reservation.repository.UserAuthRepository;
import com.project.Bookfair_Reservation.service.ReservationService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class ReservationServiceImpl implements ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private UserAuthRepository userRepository;

    @Autowired
    private StallRepository stallRepository;

    @Override
    public ReservationResponseDTO createReservation(ReservationRequestDTO requestDTO) {

        // Validate request size (1 or 2 stalls)
        if (requestDTO.getStallIds() == null ||
                requestDTO.getStallIds().isEmpty() ||
                requestDTO.getStallIds().size() > 2) {
            throw new RuntimeException("You can reserve only 1 or 2 stalls at a time.");
        }

        // Get user
        User user = userRepository.findById(requestDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Count already reserved stalls (except cancelled)
        int totalReserved =
                reservationRepository.countByUser_IdAndStatusNot(user.getId(), ReservationStatus.CANCELLED);

        if (totalReserved + requestDTO.getStallIds().size() > 3) {
            throw new RuntimeException("Maximum total 3 stalls allowed per user.");
        }

        // Prevent double booking
        for (Long stallId : requestDTO.getStallIds()) {
            boolean alreadyBooked = reservationRepository
                    .existsByReservationStalls_StallIdAndStatusNot(stallId, ReservationStatus.CANCELLED);

            if (alreadyBooked) {
                throw new RuntimeException("Stall ID " + stallId + " already reserved.");
            }
        }

        // Create reservation
        Reservation reservation = Reservation.builder()
                .user(user)
                .qrCode(UUID.randomUUID().toString())
                .build();

        reservation = reservationRepository.save(reservation);

        // Create reservation-stall mapping
        List<ReservationStall> reservationStalls = new ArrayList<>();
        for (Long stallId : requestDTO.getStallIds()) {
            Stall stall = stallRepository.findById(stallId)
                    .orElseThrow(() -> new RuntimeException("Stall not found"));

            ReservationStall rs = ReservationStall.builder()
                    .reservation(reservation)
                    .stall(stall)
                    .build();

            reservationStalls.add(rs);
        }

        reservation.setReservationStalls(reservationStalls);
        reservationRepository.save(reservation);

        return new ReservationResponseDTO(reservation.getId(), "Reservation successful");
    }

    @Override
    public List<ReservationResponseDTO> getReservationsByUser(Long userId) {
        List<Reservation> reservations = reservationRepository.findByUser_Id(userId);
        List<ReservationResponseDTO> response = new ArrayList<>();
        for (Reservation r : reservations) {
            response.add(new ReservationResponseDTO(r.getId(), "Reservation found"));
        }
        return response;
    }

    @Override
    public List<ReservationResponseDTO> getAllReservations() {
        List<Reservation> reservations = reservationRepository.findAll();
        List<ReservationResponseDTO> response = new ArrayList<>();
        for (Reservation r : reservations) {
            response.add(new ReservationResponseDTO(r.getId(), "Reservation found"));
        }
        return response;
    }
}
