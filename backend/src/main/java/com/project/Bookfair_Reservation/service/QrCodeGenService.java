package com.project.Bookfair_Reservation.service;

public interface QrCodeGenService {

    byte[] generateQrCode(String text, int width, int height);

}

