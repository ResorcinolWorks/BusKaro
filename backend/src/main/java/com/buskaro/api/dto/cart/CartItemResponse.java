package com.buskaro.api.dto.cart;

import com.buskaro.api.entity.CartItem;
import lombok.Data;

@Data
public class CartItemResponse {
    private Long id;
    private Long userId;
    private Long routeId;
    private String seats;
    private String createdAt;

    public static CartItemResponse fromEntity(CartItem cartItem) {
        CartItemResponse response = new CartItemResponse();
        response.setId(cartItem.getId());
        response.setUserId(cartItem.getUserId());
        response.setRouteId(cartItem.getRouteId());
        response.setSeats(cartItem.getSeats());
        response.setCreatedAt(cartItem.getCreatedAt());
        return response;
    }
} 