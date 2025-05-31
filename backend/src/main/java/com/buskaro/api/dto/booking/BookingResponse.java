package com.buskaro.api.dto.booking;

import com.buskaro.api.entity.Booking;
import lombok.Data;

@Data
public class BookingResponse {
    private Long id;
    private Long userId;
    private Long routeId;
    private String seats;
    private String totalAmount;
    private String bookingDate;
    private String status;

    public static BookingResponse fromEntity(Booking booking) {
        BookingResponse response = new BookingResponse();
        response.setId(booking.getId());
        response.setUserId(booking.getUserId());
        response.setRouteId(booking.getRouteId());
        response.setSeats(booking.getSeats());
        response.setTotalAmount(booking.getTotalAmount());
        response.setBookingDate(booking.getBookingDate());
        response.setStatus(booking.getStatus());
        return response;
    }
} 