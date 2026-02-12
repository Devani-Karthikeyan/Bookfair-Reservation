package com.project.Bookfair_Reservation.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "genres")
public class Genre {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable=false)
    private String name;

    @ManyToOne
    private User user;
}

