package com.project.Bookfair_Reservation.controller.admin;

import com.project.Bookfair_Reservation.dto.GeneralResponseDto;
import com.project.Bookfair_Reservation.entity.User;
import com.project.Bookfair_Reservation.service.AdminUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('EMPLOYEE')")
@Slf4j
public class AdminUserController {

    @Autowired
    AdminUserService adminUserService;

    GeneralResponseDto generalResponseDto;

    // Get all registered users
    @GetMapping("/allusers")
    public ResponseEntity<GeneralResponseDto> getAllUsers() {

        generalResponseDto = new GeneralResponseDto();

        try{
            generalResponseDto.setData(adminUserService.getAllUsers());
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setStatusCode(200);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/admin/users. Occurred error is {}", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }
    }

    // Get single user details
    @GetMapping("/user?{id}")
    public ResponseEntity<GeneralResponseDto> getUser(@PathVariable Long id) {

        generalResponseDto = new GeneralResponseDto();

        try{
            generalResponseDto.setData(adminUserService.getUserById(id));
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setStatusCode(200);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/admin/users/{id}. Occurred error is {}", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }

    }

    // Disable user account
    @PutMapping("/disable/user?{id}")
    public ResponseEntity<GeneralResponseDto> disableUser(@PathVariable Long id) {

        generalResponseDto = new GeneralResponseDto();

        try{
            adminUserService.disableUser(id);
            generalResponseDto.setData("User disabled successfully");
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setStatusCode(200);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/admin/users/{id}/disable. Occurred error is {}", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }

    }

    // Enable user account
    @PutMapping("/enable/user?{id}")
    public ResponseEntity<GeneralResponseDto> enableUser(@PathVariable Long id) {

        generalResponseDto = new GeneralResponseDto();

        try{
            adminUserService.enableUser(id);
            generalResponseDto.setData("User disabled successfully");
            generalResponseDto.setMsg("Succuss");
            generalResponseDto.setStatusCode(200);
            return ResponseEntity.ok(generalResponseDto);
        }

        catch (Exception e) {
            generalResponseDto.setData(null);
            generalResponseDto.setMsg(e.getMessage());
            generalResponseDto.setStatusCode(501);
            log.error("Error occurred in /api/admin/users/{id}/enable. Occurred error is {}", e.getMessage());
            return ResponseEntity.status(generalResponseDto.getStatusCode()).body(generalResponseDto);
        }
    }
}
