package com.project.Bookfair_Reservation.dto.result;

import com.project.Bookfair_Reservation.dto.GeneralResponseDto;
import com.project.Bookfair_Reservation.enumtype.Roles;

public record AuthResult(
        GeneralResponseDto generalResponse,
        String email,
        Roles role,
        String accessToken,
        String refreshToken){
}

