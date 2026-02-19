package com.project.Bookfair_Reservation.controller.auth;

import com.project.Bookfair_Reservation.dto.GeneralResponseDto;
import com.project.Bookfair_Reservation.dto.request.UserLoginDto;
import com.project.Bookfair_Reservation.dto.request.UserSignUp;
import com.project.Bookfair_Reservation.dto.result.AuthResult;
import com.project.Bookfair_Reservation.service.UserAuthenticationService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class UserAuthenticationController {
    @Autowired
    private UserAuthenticationService userAuthenticationService;

    @Value("${ACCESS_TOKEN_EXPIRATION_Time}")
    private int accessTokenExpiryTime;

    @Value("${REFRESH_TOKEN_EXPIATION_TIME}")
    private int cookieExpiryTime;

    public GeneralResponseDto generalResponse;

    @NonNull
    private ResponseEntity<GeneralResponseDto> getGeneralResponseDtoResponseEntity(AuthResult result) {

        generalResponse = result.generalResponse();
        String accessToken = result.accessToken();
        String refreshToken = result.refreshToken();

        if (!generalResponse.isRes())
            return ResponseEntity.status(generalResponse.getStatusCode()).body(generalResponse);

        ResponseCookie accessCookie = ResponseCookie.from("ACCESS_TOKEN", accessToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(accessTokenExpiryTime)
                .sameSite("Lax") // or "Strict"
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from("REFRESH_TOKEN", refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(cookieExpiryTime)
                .sameSite("Lax") // or "Strict"
                .build();

        ResponseCookie userEmailCookie = ResponseCookie.from("USER_EMAIL", result.email())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(cookieExpiryTime)
                .sameSite("Lax") // or "Strict"
                .build();

        ResponseCookie userRoleCookie = null;

        if(result.role()!=null) {
            userRoleCookie = ResponseCookie.from("USER_ROLE", result.role().toString())
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .maxAge(cookieExpiryTime)
                    .sameSite("Lax") // or "Strict"
                    .build();
        }
        else{
            userRoleCookie = ResponseCookie.from("USER_ROLE", null)
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .maxAge(cookieExpiryTime)
                    .sameSite("Lax") // or "Strict"
                    .build();
        }
        return ResponseEntity.status(generalResponse.getStatusCode())
                .header(HttpHeaders.SET_COOKIE, accessCookie.toString())
                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                .header(HttpHeaders.SET_COOKIE, userEmailCookie.toString())
                .header(HttpHeaders.SET_COOKIE, userRoleCookie.toString())
                .body(generalResponse);
    }

    @PostMapping("/signup")
    public ResponseEntity<GeneralResponseDto> signUp(@RequestBody UserSignUp userSignUp) {
        AuthResult result = userAuthenticationService.signUp(userSignUp);
        return getGeneralResponseDtoResponseEntity(result);
    }

    @PostMapping("/login")
    public ResponseEntity<GeneralResponseDto> login(@RequestBody UserLoginDto userLoginDto) {
        AuthResult result = userAuthenticationService.login(userLoginDto);
        return getGeneralResponseDtoResponseEntity(result);
    }

    @GetMapping("/refresh")
    public ResponseEntity<GeneralResponseDto> refreshToken(HttpServletRequest request) {
        try {
            AuthResult result = userAuthenticationService.refreshToken(request);
            return getGeneralResponseDtoResponseEntity(result);
        } catch (Exception e) {
            GeneralResponseDto errorResponse = new GeneralResponseDto();
            errorResponse.setRes(false);
            errorResponse.setMsg("Invalid or expired refresh token.");
            errorResponse.setStatusCode(HttpServletResponse.SC_UNAUTHORIZED);
            return ResponseEntity.status(errorResponse.getStatusCode()).body(errorResponse);
        }
    }


    @GetMapping("/logout")
    public ResponseEntity<GeneralResponseDto> logout(HttpServletRequest request) {

        Cookie[] cookies = request.getCookies();

        if (cookies == null) return ResponseEntity.status(HttpServletResponse.SC_OK).body(generalResponse);

        generalResponse = new GeneralResponseDto();
        generalResponse.setRes(true);
        generalResponse.setMsg("Cookies has been cleared.");
        generalResponse.setStatusCode(HttpServletResponse.SC_OK);
        AuthResult authResult = new AuthResult(generalResponse, null, null, null, null);
        return getGeneralResponseDtoResponseEntity(authResult);
    }

}
