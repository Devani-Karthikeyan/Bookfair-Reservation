package com.project.Bookfair_Reservation.controller.reservation;


import com.project.Bookfair_Reservation.dto.GeneralResponseDto;
import com.project.Bookfair_Reservation.dto.request.GenreRequest;
import com.project.Bookfair_Reservation.dto.result.GenreResult;
import com.project.Bookfair_Reservation.service.GenreService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/genres")
@RequiredArgsConstructor
@Slf4j
public class GenreController {

    @Autowired
    GenreService genreService;

    GeneralResponseDto generalResponseDto;

    // Add a new genre
    @PostMapping("/add/genre")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<GeneralResponseDto> addGenre(@Valid @RequestBody GenreRequest request) {

        generalResponseDto = new GeneralResponseDto();

        try{
            GenreResult response = genreService.addGenre(request);
            generalResponseDto.setData(response);
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setStatusCode(200);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/genres. Occurred error is {}", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }

    }

    // Update existing genre
    @PutMapping("/update={id}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<GeneralResponseDto> updateGenre(@PathVariable Long id, @Valid @RequestBody GenreRequest request) {

        generalResponseDto = new GeneralResponseDto();

        try{
            GenreResult response = genreService.updateGenre(id, request);
            generalResponseDto.setData(response);
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setStatusCode(200);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/genres/update={id}. Occurred error is {}", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }

    }

    // Get all genres
    @GetMapping("/allgenres")
    @PreAuthorize("hasAnyRole('EMPLOYEE','PUBLISHER','VENDOR')")
    public ResponseEntity<GeneralResponseDto> getAllGenres() {

        generalResponseDto = new GeneralResponseDto();

        try{
            List<GenreResult> genres = genreService.getAllGenres();
            generalResponseDto.setData(genres);
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setStatusCode(200);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/genres/{id}. Occurred error is {}", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }


    }

    // Get genre by ID
    @GetMapping("/get/genre={id}")
    @PreAuthorize("hasAnyRole('EMPLOYEE','PUBLISHER','VENDOR')")
    public ResponseEntity<GeneralResponseDto> getGenreById(@PathVariable Long id) {

        generalResponseDto = new GeneralResponseDto();

        try{
            GenreResult response = genreService.getGenreById(id);
            generalResponseDto.setData(response);
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setStatusCode(200);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/genres/get/genre={id}. Occurred error is {}", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }

    }

    // Delete genre by ID
    @DeleteMapping("/delete/genre={id}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<GeneralResponseDto> deleteGenre(@PathVariable Long id) {

        generalResponseDto = new GeneralResponseDto();

        try{
            genreService.deleteGenreById(id);
            generalResponseDto.setData("Succuss fully deleted");
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setStatusCode(200);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/genres/delete/genre={id}. Occurred error is {}", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }

    }

}
