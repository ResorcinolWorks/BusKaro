package com.buskaro.api.dto.route;

import com.buskaro.api.entity.BusRoute;
import lombok.Data;

@Data
public class BusRouteResponse {
    private Long id;
    private String origin;
    private String destination;
    private String departureTime;
    private String arrivalTime;
    private String busOperator;
    private String busType;
    private String totalSeats;
    private String seatsAvailable;
    private String pricePerSeat;
    private String amenities;

    public static BusRouteResponse fromEntity(BusRoute busRoute) {
        BusRouteResponse response = new BusRouteResponse();
        response.setId(busRoute.getId());
        response.setOrigin(busRoute.getOrigin());
        response.setDestination(busRoute.getDestination());
        response.setDepartureTime(busRoute.getDepartureTime());
        response.setArrivalTime(busRoute.getArrivalTime());
        response.setBusOperator(busRoute.getBusOperator());
        response.setBusType(busRoute.getBusType());
        response.setTotalSeats(busRoute.getTotalSeats());
        response.setSeatsAvailable(busRoute.getSeatsAvailable());
        response.setPricePerSeat(busRoute.getPricePerSeat());
        response.setAmenities(busRoute.getAmenities());
        return response;
    }
} 