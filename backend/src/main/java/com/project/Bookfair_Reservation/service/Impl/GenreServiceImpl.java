package com.project.Bookfair_Reservation.service.Impl;

import com.project.Bookfair_Reservation.dto.request.GenreRequest;
import com.project.Bookfair_Reservation.dto.result.GenreResult;
import com.project.Bookfair_Reservation.entity.Genre;

import com.project.Bookfair_Reservation.exception.DuplicateResourceException;
import com.project.Bookfair_Reservation.exception.ResourceNotFoundException;
import com.project.Bookfair_Reservation.repository.GenreRepository;
import com.project.Bookfair_Reservation.service.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GenreServiceImpl implements GenreService {

    private final GenreRepository genreRepository;

    // Add new genre (Employee only)
    public GenreResult addGenre(GenreRequest request) {
        if (genreRepository.existsByNameIgnoreCase(request.getName())) {
            throw new DuplicateResourceException("Genre already exists: " + request.getName());
        }
        Genre genre = Genre.builder()
                .name(request.getName().trim())
                .build();
        Genre saved = genreRepository.save(genre);
        return new GenreResult(saved.getId(), saved.getName());
    }

    // Update existing genre (Employee only)
    public GenreResult updateGenre(Long id, GenreRequest request) {
        Genre genre = genreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Genre not found with id: " + id));

        if (genreRepository.existsByNameIgnoreCase(request.getName())
                && !genre.getName().equalsIgnoreCase(request.getName())) {
            throw new DuplicateResourceException("Genre name already exists: " + request.getName());
        }

        genre.setName(request.getName().trim());
        Genre updated = genreRepository.save(genre);
        return new GenreResult(updated.getId(), updated.getName());
    }

    // Get all genres
    public List<GenreResult> getAllGenres() {
        return genreRepository.findAll().stream()
                .map(g -> new GenreResult(g.getId(), g.getName()))
                .collect(Collectors.toList());
    }

    // Get genre by ID
    public GenreResult getGenreById(Long id) {
        Genre genre = genreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Genre not found with id: " + id));
        return new GenreResult(genre.getId(), genre.getName());
    }

    public void deleteGenreById(Long id) {
        Genre genre = genreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Genre not found with id " + id));

        genreRepository.delete(genre);
    }

}
