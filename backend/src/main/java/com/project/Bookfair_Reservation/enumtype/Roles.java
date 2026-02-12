package com.project.Bookfair_Reservation.enumtype;

import java.util.EnumSet;

public enum Roles {
    EMPLOYEE,
    VENDOR,
    PUBLISHER;

    public static boolean isValidRole(Roles roles) {
        return roles != null && EnumSet.allOf(Roles.class).contains(roles);
    }
}
