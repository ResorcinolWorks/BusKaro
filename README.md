# BusKaro - Modern Bus Booking Platform

A full-stack bus booking application built with React (TypeScript) frontend and Spring Boot backend, featuring JWT authentication, real-time booking, and modern UI design.

![BusKaro](https://img.shields.io/badge/BusKaro-Bus%20Booking%20Platform-blue)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)

## 📋 Table of Contents
- [Features](#-features)
- [Architecture](#️-architecture)
- [Technology Stack](#️-technology-stack)
- [Getting Started](#-getting-started)
- [Detailed Setup](#️-detailed-setup)
- [API Documentation](#-api-documentation)
- [Frontend Structure](#-frontend-structure)
- [Backend Structure](#-backend-structure)
- [Database Schema](#-database-schema)
- [Authentication & Security](#-authentication--security)
- [UI/UX Features](#-uiux-features)
- [Configuration](#-configuration)
- [Deployment](#-deployment)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Performance](#-performance)
- [Contributing](#-contributing)

## 🚀 Features

### Core Functionality
- **User Authentication**: JWT-based login/signup system with secure token management
- **Bus Route Search**: Browse and filter available bus routes with real-time data
- **Shopping Cart**: Add/remove tickets with quantity management and persistence
- **Booking System**: Complete checkout process with booking confirmation
- **Account Management**: View booking history, user profile, and booking status
- **Responsive Design**: Modern UI that works seamlessly on desktop, tablet, and mobile

### Technical Features
- **Real-time Updates**: Dynamic content updates without page refresh
- **State Management**: Context-based state management for auth and cart
- **Protected Routes**: Secure access to user-specific pages with route guards
- **Modern UI**: Glassmorphic design with smooth animations and transitions
- **Type Safety**: Full TypeScript implementation with strict type checking
- **RESTful API**: Clean API design with proper HTTP methods and status codes
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Data Validation**: Input validation on both frontend and backend
- **Cross-platform**: Works on all modern browsers and devices

## 🏗️ Architecture

### System Architecture
```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐
│   React Frontend │ ◄─────────────► │ Spring Boot API │
│   (Port 5173)   │                 │   (Port 8080)   │
└─────────────────┘                 └─────────────────┘
         │                                    │
         │                                    │
    ┌────▼────┐                         ┌────▼────┐
    │ Browser │                         │   H2    │
    │LocalStorage│                      │Database │
    │(JWT Token)│                       │(In-Mem) │
    └─────────┘                         └─────────┘
```

### Frontend (React + TypeScript)
```
frontend/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui base components
│   │   │   ├── button.tsx  # Button component
│   │   │   ├── card.tsx    # Card component
│   │   │   ├── input.tsx   # Input component
│   │   │   └── ...         # Other UI components
│   │   ├── Navigation.tsx   # Main navigation bar
│   │   ├── AuthModal.tsx    # Authentication modal
│   │   ├── Footer.tsx       # Footer component
│   │   └── features/        # Feature-specific components
│   ├── pages/              # Page components (routes)
│   │   ├── Index.tsx       # Homepage with hero section
│   │   ├── BusRoutes.tsx   # Route listing and search
│   │   ├── Cart.tsx        # Shopping cart management
│   │   ├── Checkout.tsx    # Checkout and payment
│   │   └── Account.tsx     # User dashboard
│   ├── contexts/           # React contexts for state
│   │   ├── AuthContext.tsx # Authentication state
│   │   └── CartContext.tsx # Shopping cart state
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── types/              # TypeScript type definitions
│   └── styles/             # Global styles and themes
├── package.json            # Dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

### Backend (Spring Boot)
```
backend/
├── src/main/java/com/buskaro/api/
│   ├── controller/         # REST API controllers
│   │   ├── AuthController.java      # Authentication endpoints
│   │   ├── BusRouteController.java  # Bus route operations
│   │   ├── CartController.java      # Cart management
│   │   ├── BookingController.java   # Booking operations
│   │   └── CheckoutController.java  # Checkout process
│   ├── service/            # Business logic layer
│   │   ├── AuthService.java         # Authentication logic
│   │   ├── BusRouteService.java     # Route business logic
│   │   ├── CartService.java         # Cart operations
│   │   └── BookingService.java      # Booking management
│   ├── repository/         # Data access layer (JPA)
│   │   ├── UserRepository.java      # User data operations
│   │   ├── BusRouteRepository.java  # Route data access
│   │   ├── CartItemRepository.java  # Cart persistence
│   │   └── BookingRepository.java   # Booking data access
│   ├── entity/             # JPA entity classes
│   │   ├── User.java               # User entity
│   │   ├── BusRoute.java           # Bus route entity
│   │   ├── CartItem.java           # Cart item entity
│   │   └── Booking.java            # Booking entity
│   ├── dto/                # Data Transfer Objects
│   │   ├── auth/                   # Authentication DTOs
│   │   ├── booking/                # Booking DTOs
│   │   └── busroute/               # Bus route DTOs
│   ├── security/           # Security configuration
│   │   ├── JwtService.java              # JWT token handling
│   │   ├── JwtAuthenticationFilter.java # JWT filter
│   │   └── CustomUserDetailsService.java # User details service
│   ├── config/             # Application configuration
│   │   └── SecurityConfig.java          # Spring Security config
│   └── util/               # Utility classes
├── src/main/resources/
│   ├── application.properties       # App configuration
│   └── data.sql                    # Initial data (optional)
├── pom.xml                         # Maven dependencies
└── target/                         # Compiled classes (ignored)
```

## 🛠️ Technology Stack

### Frontend Dependencies
```json
{
  "dependencies": {
    "react": "^18.3.1",                    // Core React library
    "react-dom": "^18.3.1",               // React DOM rendering
    "react-router-dom": "^6.26.2",        // Client-side routing
    "typescript": "^5.5.3",               // Type safety
    "@radix-ui/react-*": "^1.x.x",        // Accessible UI primitives
    "tailwindcss": "^3.4.11",             // Utility CSS framework
    "framer-motion": "^11.11.17",         // Animation library
    "lucide-react": "^0.451.0",           // Icon library
    "react-hook-form": "^7.53.0",         // Form handling
    "zod": "^3.23.8",                     // Schema validation
    "sonner": "^1.5.0"                    // Toast notifications
  },
  "devDependencies": {
    "@vitejs/plugin-react-swc": "^3.5.0", // Fast React refresh
    "eslint": "^9.9.0",                   // Code linting
    "autoprefixer": "^10.4.20",           // CSS prefixing
    "vite": "^5.4.1"                      // Build tool
  }
}
```

### Backend Dependencies
```xml
<dependencies>
    <!-- Spring Boot Starters -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    
    <!-- Database -->
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
    </dependency>
    
    <!-- Utilities -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
</dependencies>
```

## 🚦 Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js** 18+ and npm/yarn
- **Java** 17+ (OpenJDK recommended)
- **Maven** 3.6+ or use the included Maven wrapper
- **Git** for version control
- **IDE** (VS Code, IntelliJ IDEA, Eclipse)

### Quick Start (5-minute setup)

1. **Clone and navigate**
   ```bash
   git clone <your-repo-url>
   cd BusBookerFinal
   ```

2. **Start Backend** (Terminal 1)
   ```bash
   cd backend
   ./mvnw spring-boot:run
   # Wait for "Started BusBookingApiApplication"
   ```

3. **Start Frontend** (Terminal 2)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access Application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:8080/api
   - H2 Console: http://localhost:8080/h2-console

## ⚙️ Detailed Setup

### Backend Setup (Spring Boot)

1. **Java Environment**
   ```bash
   # Verify Java version
   java -version  # Should be 17+
   
   # Set JAVA_HOME if needed
   export JAVA_HOME=/path/to/java17
   ```

2. **Build and Run**
   ```bash
   cd backend
   
   # Clean build
   ./mvnw clean compile
   
   # Run tests
   ./mvnw test
   
   # Start application
   ./mvnw spring-boot:run
   
   # Alternative: Build JAR and run
   ./mvnw clean package
   java -jar target/bus-booking-api-*.jar
   ```

3. **Database Access**
   - URL: `http://localhost:8080/h2-console`
   - JDBC URL: `jdbc:h2:mem:testdb`
   - Username: `sa`
   - Password: (empty)

### Frontend Setup (React)

1. **Node Environment**
   ```bash
   # Verify Node version
   node --version  # Should be 18+
   npm --version
   ```

2. **Install and Run**
   ```bash
   cd frontend
   
   # Install dependencies
   npm install
   
   # Development server
   npm run dev
   
   # Production build
   npm run build
   
   # Preview production build
   npm run preview
   
   # Linting
   npm run lint
   ```

## 📡 API Documentation

### Base URL
```
Development: http://localhost:8080/api
Production: https://your-domain.com/api
```

### Authentication Endpoints

#### POST /auth/signup
Register a new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST /auth/login
Authenticate user and get JWT token.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Bus Route Endpoints

#### GET /routes
Get all available bus routes.

**Response:**
```json
[
  {
    "id": 1,
    "origin": "New York",
    "destination": "Boston",
    "departureTime": "08:00 AM",
    "arrivalTime": "12:00 PM",
    "pricePerSeat": "45",
    "seatsAvailable": "25",
    "totalSeats": "40",
    "busOperator": "MegaBus",
    "busType": "AC Sleeper",
    "amenities": "WiFi, Charging, Entertainment"
  }
]
```

### Cart Management Endpoints

#### GET /cart
Get current user's cart items.
**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
[
  {
    "id": 1,
    "routeId": 1,
    "seats": "2",
    "createdAt": "2024-01-01T10:00:00"
  }
]
```

#### POST /cart/{routeId}?seats={quantity}
Add items to cart.
**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "id": 1,
  "routeId": 1,
  "seats": "2",
  "createdAt": "2024-01-01T10:00:00"
}
```

### Booking Endpoints

#### GET /bookings
Get user's booking history.
**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
[
  {
    "id": 1,
    "routeId": 1,
    "seats": "2",
    "bookingDate": "2024-01-01T10:00:00",
    "status": "CONFIRMED",
    "totalAmount": "90"
  }
]
```

#### POST /checkout
Process cart checkout and create bookings.
**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
[
  {
    "id": 1,
    "routeId": 1,
    "seats": "2",
    "bookingDate": "2024-01-01T10:00:00",
    "status": "CONFIRMED",
    "totalAmount": "90"
  }
]
```

## 🎨 Frontend Structure

### Key Components

#### Navigation.tsx
```typescript
// Main navigation with authentication state
interface NavigationProps {
  onJoinNow: () => void;
}

// Features:
// - Responsive design (mobile/desktop)
// - Authentication state display
// - Route navigation
// - User menu with account access
```

#### AuthModal.tsx
```typescript
// Authentication modal for login/signup
// Features:
// - Form validation with react-hook-form
// - JWT token management
// - Error handling and user feedback
// - Responsive modal design
```

#### Cart Management
```typescript
// CartContext.tsx - Global cart state
interface CartItem {
  routeId: number;
  quantity: number;
  pricePerSeat: number;
  // ... other fields
}

// Features:
// - Add/remove items
// - Quantity updates
// - Total calculation
// - Persistence across sessions
```

### Routing Structure
```typescript
// App.tsx routing configuration
const routes = [
  { path: "/", element: <Index /> },           // Homepage
  { path: "/routes", element: <BusRoutes /> }, // Route listing
  { path: "/cart", element: <Cart /> },        // Shopping cart
  { path: "/checkout", element: <Checkout /> }, // Checkout process
  { path: "/account", element: <Account /> }   // User account (protected)
];
```

## 🏛️ Backend Structure

### Entity Relationships
```
User (1) ←→ (N) CartItem (N) ←→ (1) BusRoute
User (1) ←→ (N) Booking (N) ←→ (1) BusRoute
```

### Service Layer
```java
@Service
public class BookingService {
    // Business logic for:
    // - Creating bookings from cart
    // - Validating seat availability
    // - Processing payments
    // - Managing booking status
}
```

### Security Configuration
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    // JWT authentication filter
    // CORS configuration
    // Password encoding
    // Route protection
}
```

## 📊 Database Schema

### Complete Schema
```sql
-- Users table with authentication data
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,        -- BCrypt hashed
    phone VARCHAR(255),
    created_at VARCHAR(255),
    INDEX idx_email (email)
);

-- Bus routes with operational data
CREATE TABLE bus_routes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    origin VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    departure_time VARCHAR(255),
    arrival_time VARCHAR(255),
    price_per_seat VARCHAR(255),
    seats_available VARCHAR(255),
    total_seats VARCHAR(255),
    bus_operator VARCHAR(255),
    bus_type VARCHAR(255),
    amenities TEXT,
    INDEX idx_origin_dest (origin, destination)
);

-- Shopping cart for user sessions
CREATE TABLE cart_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    route_id BIGINT NOT NULL,
    seats VARCHAR(255),
    created_at VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (route_id) REFERENCES bus_routes(id) ON DELETE CASCADE,
    INDEX idx_user_cart (user_id)
);

-- Booking records and history
CREATE TABLE bookings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    route_id BIGINT NOT NULL,
    seats VARCHAR(255),
    booking_date VARCHAR(255),
    status VARCHAR(255) DEFAULT 'CONFIRMED',
    total_amount VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (route_id) REFERENCES bus_routes(id) ON DELETE CASCADE,
    INDEX idx_user_bookings (user_id),
    INDEX idx_booking_date (booking_date)
);
```

### Sample Data
```sql
-- Sample bus routes (automatically seeded)
INSERT INTO bus_routes VALUES 
(1, 'New York', 'Boston', '08:00 AM', '12:00 PM', '45', '25', '40', 'MegaBus', 'AC Sleeper', 'WiFi, Charging'),
(2, 'Los Angeles', 'San Francisco', '09:30 AM', '02:30 PM', '55', '30', '35', 'Greyhound', 'Luxury Coach', 'WiFi, Entertainment'),
-- ... 6 more routes
```

## 🔐 Authentication & Security

### JWT Implementation
```java
// Simplified JWT for development
public class JwtService {
    // Token format: username:timestamp (Base64 encoded)
    // Production should use proper JWT libraries
    
    public String generateToken(UserDetails userDetails) {
        String tokenData = userDetails.getUsername() + ":" + System.currentTimeMillis();
        return Base64.getEncoder().encodeToString(tokenData.getBytes());
    }
    
    public boolean isTokenValid(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        return username != null && username.equals(userDetails.getUsername());
    }
}
```

### Security Features
- **Password Hashing**: BCrypt with salt
- **JWT Tokens**: Secure token-based authentication
- **CORS Protection**: Configured for development/production
- **SQL Injection Prevention**: JPA parameterized queries
- **XSS Protection**: Input sanitization and validation
- **Route Protection**: Frontend and backend route guards

### Frontend Security
```typescript
// AuthContext with token management
const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: (token: string, user: User) => {},
  logout: () => {},
  token: null
});

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
};
```

## 🎨 UI/UX Features

### Design System
- **Color Palette**: Dark theme with accent colors
- **Typography**: Geist font family for modern look
- **Spacing**: Consistent 8px grid system
- **Components**: Reusable shadcn/ui components
- **Icons**: Lucide React icon library
- **Animations**: Framer Motion for smooth transitions

### Responsive Breakpoints
```css
/* Mobile First Approach */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### Key UI Components
- **Glassmorphic Cards**: Modern glass effect styling
- **Modal System**: Accessible modal components
- **Toast Notifications**: Real-time user feedback
- **Loading States**: Skeleton loaders and spinners
- **Form Validation**: Real-time validation with error states
- **Button States**: Loading, disabled, and hover effects

## ⚙️ Configuration

### Environment Variables

#### Backend (application.properties)
```properties
# Server Configuration
server.port=8080
server.servlet.context-path=/api

# Database Configuration
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# JPA Configuration
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true

# JWT Configuration
jwt.secret=mySecretKey
jwt.expiration=86400000

# CORS Configuration
cors.allowed-origins=http://localhost:5173
cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
cors.allowed-headers=*
cors.allow-credentials=true

# Logging Configuration
logging.level.com.buskaro.api=INFO
logging.level.org.springframework.security=DEBUG
```

#### Frontend (package.json scripts)
```json
{
  "scripts": {
    "dev": "vite --port 5173",              // Development server
    "build": "vite build",                  // Production build
    "build:dev": "vite build --mode development", // Dev build
    "lint": "eslint .",                     // Code linting
    "preview": "vite preview",              // Preview build
    "type-check": "tsc --noEmit"           // TypeScript check
  }
}
```

### Build Configuration

#### Vite Configuration (vite.config.ts)
```typescript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
});
```

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
# Build for production
cd frontend
npm run build

# Deploy build folder
# Vercel: vercel --prod
# Netlify: netlify deploy --prod --dir=dist
```

### Backend Deployment (Heroku/Railway)
```bash
# Build JAR file
cd backend
./mvnw clean package -DskipTests

# Deploy JAR
java -jar target/bus-booking-api-*.jar
```

### Docker Deployment
```dockerfile
# Multi-stage Dockerfile
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM openjdk:17-jdk-slim AS backend-build
WORKDIR /app/backend
COPY backend/pom.xml ./
COPY backend/src ./src
RUN ./mvnw clean package -DskipTests

FROM openjdk:17-jdk-slim
COPY --from=backend-build /app/backend/target/*.jar app.jar
COPY --from=frontend-build /app/frontend/dist /static
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

### Environment-Specific Configuration
```bash
# Development
export SPRING_PROFILES_ACTIVE=development

# Production
export SPRING_PROFILES_ACTIVE=production
export JWT_SECRET=your-production-secret
export DATABASE_URL=your-production-db-url
```

## 🧪 Testing

### Backend Testing
```bash
cd backend

# Unit tests
./mvnw test

# Integration tests
./mvnw verify

# Test with coverage
./mvnw test jacoco:report

# Specific test class
./mvnw test -Dtest=AuthControllerTest
```

### Frontend Testing
```bash
cd frontend

# Linting
npm run lint

# Type checking
npm run type-check

# Build validation
npm run build
```

### API Testing with cURL
```bash
# Register user
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get routes
curl http://localhost:8080/api/routes

# Add to cart (with token)
curl -X POST "http://localhost:8080/api/cart/1?seats=2" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🔧 Troubleshooting

### Common Issues

#### Backend Issues

**Port 8080 already in use**
```bash
# Find process using port 8080
lsof -i :8080
# Kill the process
kill -9 PID

# Or use different port
server.port=8081
```

**H2 Database connection issues**
```bash
# Verify H2 console access
curl http://localhost:8080/h2-console

# Check database URL in logs
grep "H2 console available" logs/application.log
```

**JWT Authentication not working**
```bash
# Check token in browser localStorage
console.log(localStorage.getItem('authToken'))

# Verify token format (should be Base64)
echo "TOKEN_HERE" | base64 -d
```

#### Frontend Issues

**CORS errors**
- Verify backend CORS configuration
- Check if backend is running on port 8080
- Ensure frontend uses correct API base URL

**Build failures**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear build cache
rm -rf dist .vite
npm run build
```

**TypeScript errors**
```bash
# Check for type issues
npm run type-check

# Update type definitions
npm update @types/react @types/react-dom
```

### Debug Mode

#### Backend Debug
```bash
# Enable debug logging
logging.level.com.buskaro.api=DEBUG
logging.level.org.springframework.security=DEBUG

# Run with debug port
./mvnw spring-boot:run -Dspring-boot.run.jvmArguments="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005"
```

#### Frontend Debug
```bash
# Run with debug info
npm run dev -- --debug

# Check network requests in browser DevTools
# Monitor console for errors and warnings
```

## 📈 Performance

### Frontend Optimization
- **Code Splitting**: Lazy loading of routes
- **Bundle Analysis**: Use `npm run build && npx vite-bundle-analyzer`
- **Image Optimization**: WebP format, lazy loading
- **Caching**: Service worker for static assets

### Backend Optimization
- **Database Indexing**: Added indexes on frequently queried columns
- **Connection Pooling**: Configured for production database
- **Caching**: Spring Cache for static data
- **Query Optimization**: Efficient JPA queries

### Monitoring
```bash
# Backend health check
curl http://localhost:8080/api/actuator/health

# Frontend bundle size
npm run build && du -sh dist/

# Memory usage monitoring
./mvnw spring-boot:run -Dspring.profiles.active=monitoring
```

## 📝 Contributing

### Development Workflow
1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/amazing-feature`)
3. **Follow** coding standards (ESLint for frontend, Checkstyle for backend)
4. **Write** tests for new features
5. **Commit** with conventional commits format
6. **Push** to your fork
7. **Create** Pull Request

### Coding Standards
```bash
# Frontend
npm run lint          # ESLint checking
npm run type-check    # TypeScript validation

# Backend
./mvnw checkstyle:check  # Code style checking
./mvnw test             # Unit tests
```

### Commit Message Format
```
feat: add user authentication system
fix: resolve cart calculation bug
docs: update API documentation
style: format code with prettier
refactor: optimize database queries
test: add unit tests for booking service
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Create GitHub issues for bugs and feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Email**: Contact at your-email@example.com

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful and accessible component library
- [Spring Boot](https://spring.io/projects/spring-boot) - Robust Java framework
- [React](https://reactjs.org/) - Modern frontend library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vite](https://vitejs.dev/) - Lightning fast build tool
- [H2 Database](https://www.h2database.com/) - Fast in-memory database

---

**BusKaro** - Making bus travel booking simple and modern! 🚌✨

*Built with ❤️ using modern web technologies* 