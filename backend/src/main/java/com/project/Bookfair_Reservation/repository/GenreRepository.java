package com.project.Bookfair_Reservation.repository;

import com.project.Bookfair_Reservation.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Long> {
    boolean existsByNameIgnoreCase(String name);
    Optional<Genre> findByNameIgnoreCase(String name);
}