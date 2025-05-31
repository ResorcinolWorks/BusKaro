package com.buskaro.api.controller;

import com.buskaro.api.dto.cart.CartItemResponse;
import com.buskaro.api.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @GetMapping
    public ResponseEntity<List<CartItemResponse>> getCartItems(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(cartService.getCartItems(userDetails.getUsername())
                .stream()
                .map(CartItemResponse::fromEntity)
                .collect(Collectors.toList()));
    }

    @PostMapping("/{routeId}")
    public ResponseEntity<CartItemResponse> addToCart(
            @PathVariable Long routeId,
            @RequestParam String seats,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(CartItemResponse.fromEntity(
                cartService.addToCart(userDetails.getUsername(), routeId, seats)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeFromCart(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        cartService.removeFromCart(userDetails.getUsername(), id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart(@AuthenticationPrincipal UserDetails userDetails) {
        cartService.clearCart(userDetails.getUsername());
        return ResponseEntity.ok().build();
    }
} 