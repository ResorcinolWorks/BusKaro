package com.buskaro.api.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "cart_items")
@Data
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long userId;
    private Long routeId;
    private String seats;
    private String createdAt;
} 