package com.buskaro.api.repository;

import com.buskaro.api.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    // All queries will be handled in the service layer for simplicity
} 