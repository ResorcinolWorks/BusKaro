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
@RequestMapping("/bookings")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;

    @GetMapping
    public ResponseEntity<List<BookingResponse>> getUserBookings(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(bookingService.getUserBookings(userDetails.getUsername())
                .stream()
                .map(BookingResponse::fromEntity)
                .collect(Collectors.toList()));
    }

    @PostMapping("/{routeId}")
    public ResponseEntity<BookingResponse> createBooking(
            @PathVariable Long routeId,
            @RequestParam String seats,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(BookingResponse.fromEntity(
                bookingService.createBooking(userDetails.getUsername(), routeId, seats)));
    }

    @PostMapping("/{bookingId}/cancel")
    public ResponseEntity<Void> cancelBooking(
            @PathVariable Long bookingId,
            @AuthenticationPrincipal UserDetails userDetails) {
        bookingService.cancelBooking(bookingId);
        return ResponseEntity.ok().build();
    }
} 