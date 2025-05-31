
import { MapPin, Shield, Smartphone, Clock } from "lucide-react";

export const features = [
  {
    title: "Route Planning",
    description: "Find the best bus routes across major Indian states with real-time availability and pricing.",
    icon: <MapPin className="w-6 h-6" />,
    image: "/placeholder-route.svg"
  },
  {
    title: "Secure Booking",
    description: "Book your tickets with confidence using our secure payment gateway and instant confirmation.",
    icon: <Shield className="w-6 h-6" />,
    image: "/placeholder-security.svg"
  },
  {
    title: "Mobile Experience",
    description: "Access your tickets, track buses, and manage bookings seamlessly on your mobile device.",
    icon: <Smartphone className="w-6 h-6" />,
    image: "/placeholder-mobile.svg"
  },
  {
    title: "Real-time Tracking",
    description: "Track your bus in real-time and get live updates about arrival times and delays.",
    icon: <Clock className="w-6 h-6" />,
    image: "/placeholder-tracking.svg"
  }
];
