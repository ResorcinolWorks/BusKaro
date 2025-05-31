package com.buskaro.api.repository;

import com.buskaro.api.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    // All queries will be handled in the service layer for simplicity
} 