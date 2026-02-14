package com.project.Bookfair_Reservation.controller;


import com.project.Bookfair_Reservation.dto.request.GenreRequest;
import com.project.Bookfair_Reservation.dto.result.GenreResult;
import com.project.Bookfair_Reservation.service.GenreService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/genres")
@RequiredArgsConstructor
public class GenreController {

    private final GenreService genreService;

    // Add a new genre
    @PostMapping
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<GenreResult> addGenre(@Valid @RequestBody GenreRequest request) {
        GenreResult response = genreService.addGenre(request);
        return ResponseEntity.status(201).body(response);
    }

    // Update existing genre
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<GenreResult> updateGenre(@PathVariable Long id,
                                                     @Valid @RequestBody GenreRequest request) {
        GenreResult response = genreService.updateGenre(id, request);
        return ResponseEntity.ok(response);
    }

    // Get all genres
    @GetMapping
    @PreAuthorize("hasAnyRole('EMPLOYEE','PUBLISHER','VENDOR')")
    public ResponseEntity<List<GenreResult>> getAllGenres() {
        List<GenreResult> genres = genreService.getAllGenres();
        return ResponseEntity.ok(genres);
    }

    // Get genre by ID
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('EMPLOYEE','PUBLISHER','VENDOR')")
    public ResponseEntity<GenreResult> getGenreById(@PathVariable Long id) {
        GenreResult response = genreService.getGenreById(id);
        return ResponseEntity.ok(response);
    }
    // Delete genre by ID
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<Void> deleteGenre(@PathVariable Long id) {
        genreService.deleteGenreById(id);
        return ResponseEntity.noContent().build();
    }


}
