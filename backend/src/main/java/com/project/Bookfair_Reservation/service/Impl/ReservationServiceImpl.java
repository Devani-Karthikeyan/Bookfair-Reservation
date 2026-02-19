package com.project.Bookfair_Reservation.service.Impl;

import com.project.Bookfair_Reservation.dto.request.ReservationCancelReqDto;
import com.project.Bookfair_Reservation.dto.request.ReservationRequestDTO;
import com.project.Bookfair_Reservation.dto.result.ReservationResultDTO;
import com.project.Bookfair_Reservation.entity.Reservation;
import com.project.Bookfair_Reservation.entity.ReservationStall;
import com.project.Bookfair_Reservation.entity.Stall;
import com.project.Bookfair_Reservation.entity.User;
import com.project.Bookfair_Reservation.enumtype.ReservationStatus;
import com.project.Bookfair_Reservation.exception.BadRequestException;
import com.project.Bookfair_Reservation.exception.ResourceNotFoundException;
import com.project.Bookfair_Reservation.exception.UnauthorizedActionException;
import com.project.Bookfair_Reservation.repository.ReservationRepository;
import com.project.Bookfair_Reservation.repository.StallRepository;
import com.project.Bookfair_Reservation.repository.UserRepository;
import com.project.Bookfair_Reservation.service.EmailService;
import com.project.Bookfair_Reservation.service.ReservationService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@Slf4j
public class ReservationServiceImpl implements ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StallRepository stallRepository;

    @Autowired
    private EmailService emailService;

    //Create Reservation
    @Override
    public ReservationResultDTO createReservation(ReservationRequestDTO requestDTO) {

        try {
        // Validate stall count (max 3 at once)
        if (requestDTO.getStallId() == null ||
                requestDTO.getStallId().isEmpty() ||
                requestDTO.getStallId().size() > 3) {
            throw new BadRequestException("You can reserve maximum 3 stalls at a time.");
        }

        log.info("Reservation validation succuss...............");

        // Get user
        User user = userRepository.findByEmail(requestDTO.getUserEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));


        // Count active reservations  (ignore cancelled & expired)
        int activeReservations =
                reservationRepository.countByUser_IdAndStatusNotIn(user.getId(), Arrays.asList(
                        ReservationStatus.CANCELLED,
                        ReservationStatus.EXPIRED
                ));

        if (activeReservations + requestDTO.getStallId().size() > 3) {
            throw new BadRequestException("Maximum total 3 stalls allowed per user.");
        }

        // Prevent double booking
        for (Long stallId : requestDTO.getStallId()) {
            boolean alreadyBooked = reservationRepository
                    .existsByReservationStalls_StallIdAndStatusNot(stallId, ReservationStatus.CANCELLED);

            if (alreadyBooked) {
                throw new BadRequestException("Stall ID " + stallId + " already reserved.");
            }
        }

        // Create reservation
        Reservation reservation = Reservation.builder()
                .user(user)
                .qrCode(UUID.randomUUID().toString())
                .status(ReservationStatus.PENDING_PAYMENT)
                .build();

        reservation = reservationRepository.save(reservation);

        // Create reservation-stall mapping
        List<ReservationStall> reservationStalls = new ArrayList<>();
        for (Long stallId : requestDTO.getStallId()) {
            Stall stall = stallRepository.findById(stallId)
                    .orElseThrow(() -> new ResourceNotFoundException("Stall not found"));

            ReservationStall rs = ReservationStall.builder()
                    .reservation(reservation)
                    .stall(stall)
                    .build();

            reservationStalls.add(rs);
        }

        reservation.setReservationStalls(reservationStalls);

            reservationRepository.save(reservation);
            return new ReservationResultDTO(reservation.getId(), "Reservation successful");
        } catch (Exception e) {
            throw new BadRequestException(e.getMessage());
        }
    }

    // User can see only his Reservations
    @Override
    public List<ReservationResultDTO> getReservationsByUser(String userEmail) {

        Long userId = userRepository.findByEmail(userEmail).get().getId();

        log.info("......................................................................................");

        List<Reservation> reservations = reservationRepository.findByUser_Id(userId);
        List<ReservationResultDTO> response = new ArrayList<>();
        for (Reservation r : reservations) {
            response.add(new ReservationResultDTO(r.getId(), "Status: " + r.getStatus()));
        }
        return response;
    }

    // Employee and Admin view all
    @Override
    public List<ReservationResultDTO> getAllReservations() {
        List<Reservation> reservations = reservationRepository.findAll();
        List<ReservationResultDTO> response = new ArrayList<>();
        for (Reservation r : reservations) {
            response.add(new ReservationResultDTO(r.getId(), "User ID: " + r.getUser().getId() + "| Status: " + r.getStatus()));
        }
        return response;
    }

    // Cancel Reservation
    @Override
    public ReservationResultDTO cancelReservation(ReservationCancelReqDto reservationCancelReqDto) {

        Long reservationId = reservationCancelReqDto.getReservationId();
        String userEmail = reservationCancelReqDto.getUserEmail();
        String role = String.valueOf(reservationCancelReqDto.getRoles());

        Long userId = userRepository.findByEmail(userEmail).get().getId();

        Reservation reservation =
                reservationRepository.findById(reservationId)
                        .orElseThrow(() -> new ResourceNotFoundException("Reservation not found"));

        // USER can cancel only his reservation
        if (role.equals("PUBLISHER") || role.equals("VENDOR")) {
            if (!reservation.getUser().getId().equals(userId)) {
                throw new UnauthorizedActionException("You can cancel only your reservation.");
            }
        }

        reservation.setStatus(ReservationStatus.CANCELLED);
        reservationRepository.save(reservation);

        //add this code
        // Send cancellation email
        emailService.sendReservationCancelledEmail(
                reservation.getUser().getEmail(),
                reservation.getUser().getFirstName(),
                reservation.getId().toString()
        );

        return new ReservationResultDTO(
                reservation.getId(),
                "Reservation cancelled successfully"
        );
    }
}

