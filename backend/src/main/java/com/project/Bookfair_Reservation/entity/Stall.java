package com.project.Bookfair_Reservation.entity;

import com.project.Bookfair_Reservation.enumtype.StallSize;
import com.project.Bookfair_Reservation.enumtype.StallStatus;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "stalls")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Stall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "stall_name", nullable = false)
    private String stallName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StallSize size;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StallStatus status;

    @Column(nullable = false)
    private Double price;

    @Column(length = 500)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hall_id", nullable = false)
    private Hall hall;

    // Track which user reserved the stall
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reserved_by_id")
    private User reservedBy;
}
