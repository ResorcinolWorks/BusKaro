package com.buskaro.api.controller;

import com.buskaro.api.dto.route.BusRouteResponse;
import com.buskaro.api.service.BusRouteService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/routes")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:8080")
public class BusRouteController {
    private final BusRouteService busRouteService;

    @GetMapping
    public ResponseEntity<List<BusRouteResponse>> getAllRoutes() {
        return ResponseEntity.ok(busRouteService.getAllRoutes()
                .stream()
                .map(BusRouteResponse::fromEntity)
                .collect(Collectors.toList()));
    }

    @GetMapping("/search")
    public ResponseEntity<List<BusRouteResponse>> searchRoutes(
            @RequestParam String from,
            @RequestParam String to,
            @RequestParam String date) {
        return ResponseEntity.ok(busRouteService.searchRoutes(from, to, date)
                .stream()
                .map(BusRouteResponse::fromEntity)
                .collect(Collectors.toList()));
    }

    @GetMapping("/cities")
    public ResponseEntity<List<String>> getAllCities() {
        return ResponseEntity.ok(busRouteService.getAllCities());
    }

    @GetMapping("/operators")
    public ResponseEntity<List<String>> getAllOperators() {
        return ResponseEntity.ok(busRouteService.getAllOperators());
    }

    @GetMapping("/popular")
    public ResponseEntity<List<BusRouteResponse>> getPopularRoutes() {
        return ResponseEntity.ok(busRouteService.getPopularRoutes()
                .stream()
                .map(BusRouteResponse::fromEntity)
                .collect(Collectors.toList()));
    }
} 