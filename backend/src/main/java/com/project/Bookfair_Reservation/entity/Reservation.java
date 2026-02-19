package com.project.Bookfair_Reservation.entity;

import com.project.Bookfair_Reservation.enumtype.ReservationStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "reservation_date", nullable = false)
    @Builder.Default
    private LocalDateTime reservationDate = LocalDateTime.now();

    // QR generated only after payment success
    @Column(name = "qr_code", unique = true)
    private String qrCode;

    @OneToMany(mappedBy = "reservation", cascade = CascadeType.ALL)
    private List<ReservationStall> reservationStalls;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private ReservationStatus status = ReservationStatus.PENDING_PAYMENT;

    // Store total payment amount
    @Column(nullable = true, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @OneToOne(mappedBy = "reservation", cascade = CascadeType.ALL)
    private Payment payment;
}
