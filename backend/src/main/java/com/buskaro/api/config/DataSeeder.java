package com.buskaro.api.config;

import com.buskaro.api.entity.BusRoute;
import com.buskaro.api.repository.BusRouteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class DataSeeder {
    private final BusRouteRepository busRouteRepository;

    @Bean
    public CommandLineRunner seedData() {
        return args -> {
            if (busRouteRepository.count() == 0) {
                // Delhi to Mumbai
                BusRoute route1 = createRoute("Delhi", "Mumbai", "08:00", "20:00", "Delhi Express", "AC Sleeper", "40", "40", "1500", "WiFi, Water, Snacks, Blanket");
                
                // Mumbai to Bangalore
                BusRoute route2 = createRoute("Mumbai", "Bangalore", "09:00", "22:00", "Mumbai Travels", "AC Seater", "35", "35", "1200", "WiFi, Water, Blanket");
                
                // Delhi to Kolkata
                BusRoute route3 = createRoute("Delhi", "Kolkata", "07:30", "19:30", "Royal Express", "AC Sleeper", "45", "45", "1800", "WiFi, Water, Snacks, Blanket, Pillow");
                
                // Chennai to Bangalore
                BusRoute route4 = createRoute("Chennai", "Bangalore", "06:00", "14:00", "South Express", "AC Seater", "30", "30", "800", "WiFi, Water, Snacks");
                
                // Lucknow to Delhi
                BusRoute route5 = createRoute("Lucknow", "Delhi", "10:00", "18:00", "UP Express", "AC Sleeper", "38", "38", "1000", "WiFi, Water, Snacks, Blanket");
                
                // Amritsar to Delhi
                BusRoute route6 = createRoute("Amritsar", "Delhi", "11:00", "19:00", "Punjab Express", "AC Seater", "42", "42", "900", "WiFi, Water, Snacks");
                
                // Kolkata to Chennai
                BusRoute route7 = createRoute("Kolkata", "Chennai", "08:30", "22:30", "East Coast Express", "AC Sleeper", "40", "40", "2000", "WiFi, Water, Snacks, Blanket, Pillow, Dinner");
                
                // Bangalore to Lucknow
                BusRoute route8 = createRoute("Bangalore", "Lucknow", "07:00", "23:00", "Central Express", "AC Sleeper", "36", "36", "2200", "WiFi, Water, Snacks, Blanket, Pillow, Breakfast, Dinner");

                // Save all routes
                busRouteRepository.save(route1);
                busRouteRepository.save(route2);
                busRouteRepository.save(route3);
                busRouteRepository.save(route4);
                busRouteRepository.save(route5);
                busRouteRepository.save(route6);
                busRouteRepository.save(route7);
                busRouteRepository.save(route8);
            }
        };
    }

    private BusRoute createRoute(String origin, String destination, String departureTime, String arrivalTime, String operator, String busType, String totalSeats, String availableSeats, String pricePerSeat, String amenities) {
        BusRoute route = new BusRoute();
        route.setOrigin(origin);
        route.setDestination(destination);
        route.setDepartureTime(departureTime);
        route.setArrivalTime(arrivalTime);
        route.setBusOperator(operator);
        route.setBusType(busType);
        route.setTotalSeats(totalSeats);
        route.setSeatsAvailable(availableSeats);
        route.setPricePerSeat(pricePerSeat);
        route.setAmenities(amenities);
        return route;
    }
} 