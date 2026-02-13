package com.project.Bookfair_Reservation.service;


import com.project.Bookfair_Reservation.entity.Hall;

import java.util.List;

public interface HallService {

    public Hall createHall(Hall hall);

    public List<Hall> getAllHalls();

    public Hall getHallById(Long id);

    public Hall updateHall(Hall hall);

    public void deleteHall(Long id);

}

