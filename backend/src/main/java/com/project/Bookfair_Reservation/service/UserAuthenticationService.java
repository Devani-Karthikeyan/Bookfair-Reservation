package com.project.Bookfair_Reservation.service;

import com.project.Bookfair_Reservation.dto.request.UserLoginDto;
import com.project.Bookfair_Reservation.dto.request.UserSignUp;
import com.project.Bookfair_Reservation.dto.result.AuthResult;
import jakarta.servlet.http.HttpServletRequest;

public interface UserAuthenticationService {
    /**
     *  Signs up user; returns auth result
     * @param userSignUp
     * **/
    AuthResult signUp(UserSignUp userSignUp);

    /**
     * @param userLoginDto
     * **/
    AuthResult login(UserLoginDto userLoginDto);

    /**
     * @param request
     * **/
    AuthResult refreshToken( HttpServletRequest request);

}
