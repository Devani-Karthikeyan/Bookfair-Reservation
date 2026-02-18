package com.project.Bookfair_Reservation.service;

import com.project.Bookfair_Reservation.entity.User;
import java.util.List;

public interface AdminUserService {

    List<User> getAllUsers();

    User getUserById(Long id);

    void disableUser(Long id);

    void enableUser(Long id);
}
