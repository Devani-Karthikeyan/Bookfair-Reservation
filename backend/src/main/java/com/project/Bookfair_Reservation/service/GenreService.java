package com.project.Bookfair_Reservation.service;

import com.project.Bookfair_Reservation.dto.request.GenreRequest;
import com.project.Bookfair_Reservation.dto.result.GenreResult;

import java.util.List;

public interface GenreService {
    public GenreResult addGenre(GenreRequest request);

    public GenreResult updateGenre(Long id, GenreRequest request);

    public List<GenreResult> getAllGenres();

    public GenreResult getGenreById(Long id);

    public void deleteGenreById(Long id);
}
