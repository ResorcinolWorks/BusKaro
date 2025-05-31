package com.buskaro.api.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "bookings")
@Data
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long userId;
    private Long routeId;
    private String seats;
    private String totalAmount;
    private String bookingDate;
    private String status;
} 