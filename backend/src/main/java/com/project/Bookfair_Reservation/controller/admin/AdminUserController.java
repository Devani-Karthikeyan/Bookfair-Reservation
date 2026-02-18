package com.project.Bookfair_Reservation.controller.admin;

import com.project.Bookfair_Reservation.entity.User;
import com.project.Bookfair_Reservation.service.AdminUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('EMPLOYEE')")
public class AdminUserController {

    private final AdminUserService adminUserService;


    // Get all registered users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(adminUserService.getAllUsers());
    }

    // Get single user details
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(adminUserService.getUserById(id));
    }

    // Disable user account
    @PutMapping("/{id}/disable")
    public ResponseEntity<String> disableUser(@PathVariable Long id) {
        adminUserService.disableUser(id);
        return ResponseEntity.ok("User disabled successfully");
    }

    // Enable user account
    @PutMapping("/{id}/enable")
    public ResponseEntity<String> enableUser(@PathVariable Long id) {
        adminUserService.enableUser(id);
        return ResponseEntity.ok("User enabled successfully");
    }
}
