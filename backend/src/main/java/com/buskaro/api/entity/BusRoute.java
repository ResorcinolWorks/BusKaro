package com.buskaro.api.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "bus_routes")
@Data
public class BusRoute {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
} 