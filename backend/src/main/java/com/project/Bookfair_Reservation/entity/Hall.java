package com.project.Bookfair_Reservation.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "halls")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Hall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "hall_name", nullable = false, unique = true)
    private String hallName;

    private String description;

    @JsonIgnore
    @OneToMany(mappedBy = "hall")
    private List<Stall> stalls;
}
