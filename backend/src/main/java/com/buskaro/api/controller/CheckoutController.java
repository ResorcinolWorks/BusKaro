package com.buskaro.api.controller;

import com.buskaro.api.dto.booking.BookingResponse;
import com.buskaro.api.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/checkout")
@RequiredArgsConstructor
public class CheckoutController {
    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<List<BookingResponse>> checkout(@AuthenticationPrincipal UserDetails userDetails) {
        List<BookingResponse> bookings = bookingService.checkout(userDetails.getUsername())
                .stream()
                .map(BookingResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(bookings);
    }
} 