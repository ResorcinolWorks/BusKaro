package com.buskaro.api.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Date;

@Service
public class JwtService {
    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    public String extractUsername(String token) {
        // Simple token extraction - just decode the base64 token
        try {
            String decoded = new String(Base64.getDecoder().decode(token));
            return decoded.split(":")[0];
        } catch (Exception e) {
            return null;
        }
    }

    public String generateToken(UserDetails userDetails) {
        // Simple token generation for demo - just encode username:timestamp
        String tokenData = userDetails.getUsername() + ":" + System.currentTimeMillis();
        return Base64.getEncoder().encodeToString(tokenData.getBytes());
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username != null && username.equals(userDetails.getUsername()));
    }
} 