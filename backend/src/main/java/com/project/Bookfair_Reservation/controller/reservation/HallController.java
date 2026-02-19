package com.project.Bookfair_Reservation.controller.reservation;

import com.project.Bookfair_Reservation.dto.GeneralResponseDto;
import com.project.Bookfair_Reservation.entity.Hall;
import com.project.Bookfair_Reservation.service.HallService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/halls")
@Slf4j
public class HallController {

    @Autowired
    HallService hallService;

    GeneralResponseDto generalResponseDto;

    // Only EMPLOYEE can create a hall
    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('EMPLOYEE')")
    public ResponseEntity<GeneralResponseDto> createHall(@RequestBody Hall hall) {

        generalResponseDto = new GeneralResponseDto();

        try{
            generalResponseDto.setData(hallService.createHall(hall));
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setStatusCode(201);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/hall/create. Occurred error is {}", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }
    }

    // All roles can view halls
    @GetMapping("/get/allhall")
    @PreAuthorize("hasAnyRole('EMPLOYEE','PUBLISHER','VENDOR')")
    public ResponseEntity<GeneralResponseDto> getAllHalls() {

        generalResponseDto = new GeneralResponseDto();

        try{
            generalResponseDto.setData(hallService.getAllHalls());
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setStatusCode(201);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/hall/get/allhall. Occurred error is {}", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }
    }

    @GetMapping("/get/hall={id}")
    @PreAuthorize("hasAnyRole('EMPLOYEE','PUBLISHER','VENDOR')")
    public ResponseEntity<GeneralResponseDto> getHall(@PathVariable Long id) {

        generalResponseDto = new GeneralResponseDto();

        try{
            generalResponseDto.setData(hallService.getHallById(id));
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setStatusCode(201);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/hall/get/hall={}. Occurred error is {}", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }

    }

    // Only EMPLOYEE can update a hall
    @PutMapping("/update/hall={id}")
    @PreAuthorize("hasAnyRole('EMPLOYEE')")
    public ResponseEntity<GeneralResponseDto> updateHall(@PathVariable Long id, @RequestBody Hall hall) {

        generalResponseDto = new GeneralResponseDto();

        try{
            hall.setId(id);
            generalResponseDto.setData(hallService.updateHall(hall));
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setStatusCode(201);
            generalResponseDto.setRes(true);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/hall/update/hall={id}. Occurred error is {}", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }

    }

    // Only EMPLOYEE can delete a hall
    @DeleteMapping("/delete/hall={id}")
    @PreAuthorize("hasAnyRole('EMPLOYEE')")
    public ResponseEntity<GeneralResponseDto> deleteHall(@PathVariable Long id) {

        generalResponseDto = new GeneralResponseDto();

        try{
            hallService.deleteHall(id);
            generalResponseDto.setData("Hall deleted successfully");
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setRes(true);
            generalResponseDto.setStatusCode(201);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/hall/delete/hall={id}. Occurred error is {}", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }


    }
}