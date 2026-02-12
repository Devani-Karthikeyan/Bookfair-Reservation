package com.project.Bookfair_Reservation.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GeneralResponseDto {
    Object data = null;
    boolean res = false;
    String msg = "Error in while fetching data";
    int statusCode = 400;
}
