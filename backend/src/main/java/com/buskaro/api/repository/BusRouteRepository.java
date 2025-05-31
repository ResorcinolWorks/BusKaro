package com.buskaro.api.repository;

import com.buskaro.api.entity.BusRoute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusRouteRepository extends JpaRepository<BusRoute, Long> {
    // All queries will be handled in the service layer for simplicity
} 