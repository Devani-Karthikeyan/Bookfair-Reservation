package com.project.Bookfair_Reservation.entity;

import com.project.Bookfair_Reservation.enumtype.ReservationStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "reservations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Who made the reservation
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // When reservation was made
    @Column(name = "reservation_date", nullable = false)
    @Builder.Default
    private LocalDateTime reservationDate = LocalDateTime.now();

    // Unique QR code for entry
    @Column(name = "qr_code", nullable = false, unique = true)
    private String qrCode;

    // Link to reserved stalls (max 3)
    @OneToMany(mappedBy = "reservation", cascade = CascadeType.ALL)
    private List<ReservationStall> reservationStalls;

    // Status of reservation
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private ReservationStatus status = ReservationStatus.PENDING_PAYMENT;

}
