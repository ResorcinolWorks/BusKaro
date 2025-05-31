package com.buskaro.api.service;

import com.buskaro.api.entity.Booking;
import com.buskaro.api.entity.CartItem;
import com.buskaro.api.entity.User;
import com.buskaro.api.repository.BookingRepository;
import com.buskaro.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final CartService cartService;

    public List<Booking> getUserBookings(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return bookingRepository.findAll().stream()
                .filter(booking -> booking.getUserId().equals(user.getId()))
                .toList();
    }

    public Booking createBooking(String email, Long routeId, String seats) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Booking booking = new Booking();
        booking.setUserId(user.getId());
        booking.setRouteId(routeId);
        booking.setSeats(seats);
        booking.setTotalAmount("1000");
        booking.setBookingDate(LocalDateTime.now().toString());
        booking.setStatus("CONFIRMED");
        
        return bookingRepository.save(booking);
    }

    public void cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);
    }

    public List<Booking> checkout(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Get all cart items for the user
        List<CartItem> cartItems = cartService.getCartItems(email);
        
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }
        
        // Create bookings for each cart item
        List<Booking> bookings = cartItems.stream()
                .map(cartItem -> {
                    Booking booking = new Booking();
                    booking.setUserId(user.getId());
                    booking.setRouteId(cartItem.getRouteId());
                    booking.setSeats(cartItem.getSeats());
                    booking.setTotalAmount("1000"); // Calculate based on route price and seats
                    booking.setBookingDate(LocalDateTime.now().toString());
                    booking.setStatus("CONFIRMED");
                    return bookingRepository.save(booking);
                })
                .toList();
        
        // Clear the cart after successful booking
        cartService.clearCart(email);
        
        return bookings;
    }
} 