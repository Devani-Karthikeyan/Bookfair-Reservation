package com.project.Bookfair_Reservation.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "reservation_stalls")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationStall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "reservation_id", nullable = false)
    private Reservation reservation;

    @ManyToOne
    @JoinColumn(name = "stall_id", nullable = false)
    private Stall stall;
}
