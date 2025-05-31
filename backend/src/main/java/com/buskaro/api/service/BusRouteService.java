package com.buskaro.api.service;

import com.buskaro.api.entity.BusRoute;
import com.buskaro.api.repository.BusRouteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BusRouteService {
    private final BusRouteRepository busRouteRepository;

    public List<BusRoute> getAllRoutes() {
        return busRouteRepository.findAll();
    }

    public List<BusRoute> searchRoutes(String from, String to, String date) {
        return busRouteRepository.findAll().stream()
                .filter(route -> route.getOrigin().equalsIgnoreCase(from) && 
                                route.getDestination().equalsIgnoreCase(to))
                .toList();
    }

    public List<String> getAllCities() {
        return busRouteRepository.findAll().stream()
                .flatMap(route -> List.of(route.getOrigin(), route.getDestination()).stream())
                .distinct()
                .toList();
    }

    public List<String> getAllOperators() {
        return busRouteRepository.findAll().stream()
                .map(BusRoute::getBusOperator)
                .distinct()
                .toList();
    }

    public List<BusRoute> getPopularRoutes() {
        return busRouteRepository.findAll().stream()
                .limit(5)
                .toList();
    }
} 