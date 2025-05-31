import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, MapPin, Calendar, Clock, Ticket, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import InternalNavigation from "@/components/InternalNavigation";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Define a type for the booking data we expect from the API
// Note: Backend sends all fields as strings, so we parse them as needed.
interface ApiBooking {
  id: string;
  bookingDate: string; // Will be used as 'date' in display
  routeId: string; // We might not display this directly, but good to have
  seats: string; // Number of seats
  status: string;
  totalAmount: string; // Price
  userId: string; 
  // Assuming the backend doesn't directly provide origin, destination, busOperator directly in booking response.
  // For a more complete display, the frontend might need to fetch route details separately using routeId
  // or the backend /api/account endpoint should provide more detailed booking info.
  // For this iteration, we'll display what's directly available from a simplified BookingResponse.
  // We'll use placeholder or derive values for missing fields like route, from, to, time, busOperator.
}

interface DisplayBooking {
  id: string;
  route: string; // e.g., "Route ID: X" or "Details Unavailable"
  from: string; // Placeholder
  to: string;   // Placeholder
  date: string; // From bookingDate
  time: string; // Placeholder or derived from bookingDate if it has time
  seats: number;
  amount: number;
  status: string;
  busOperator: string; // Placeholder
}

const Account = () => {
  const { token, user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [bookingHistory, setBookingHistory] = useState<DisplayBooking[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated && token) {
      const fetchBookings = async () => {
        setIsLoadingBookings(true);
        try {
          const response = await fetch("http://localhost:8080/api/bookings", {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch booking history");
          }
          const data: ApiBooking[] = await response.json();
          
          // Map API data to DisplayBooking, handling string to number conversions and placeholders
          const displayData = data.map(b => ({
            id: b.id,
            route: `Booking for Route ID: ${b.routeId}`, // Placeholder, ideally fetch route details
            from: "N/A",
            to: "N/A",
            date: b.bookingDate.split("T")[0] || "N/A", // Assuming bookingDate is ISO-like
            time: b.bookingDate.split("T")[1]?.substring(0,5) || "N/A",
            seats: parseInt(b.seats, 10) || 0,
            amount: parseFloat(b.totalAmount) || 0,
            status: b.status,
            busOperator: "N/A", // Placeholder
          }));
          setBookingHistory(displayData);
        } catch (error: any) {
          console.error("Failed to fetch bookings:", error);
          toast({
            title: "Error Fetching Bookings",
            description: error.message || "Could not load your booking history.",
            variant: "destructive",
          });
        }
        setIsLoadingBookings(false);
      };
      fetchBookings();
    } else if (!authLoading) {
      // If not authenticated and auth is not loading, set bookings loading to false.
      setIsLoadingBookings(false);
    }
  }, [isAuthenticated, token, toast, authLoading]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-600">Completed</Badge>;
      case "Upcoming":
        return <Badge className="bg-blue-600">Upcoming</Badge>;
      case "Cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (authLoading || (isAuthenticated && isLoadingBookings)) {
    return (
      <div className="min-h-screen bg-black text-foreground flex flex-col items-center justify-center">
        <InternalNavigation />
        <div className="flex items-center justify-center text-white text-xl">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
            <Ticket className="w-12 h-12 text-primary" />
          </motion.div>
          <span className="ml-4">Loading Account Details...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-foreground flex flex-col items-center justify-center">
        <InternalNavigation />
        <div className="text-center p-8 text-white">
          <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-gray-400 mb-6">Please log in to view your account details.</p>
          <Link to="/">
            <Button className="button-gradient">Go to Homepage</Button>
          </Link>
          {/* Or trigger AuthModal directly if Navigation component's onJoinNow is accessible here */}
        </div>
      </div>
    );
  }

  // User is authenticated, display account details
  // const user = { ... }; // This user object will come from useAuth()
  // const bookingHistory = [ ... ]; // This will come from state

  return (
    <div className="min-h-screen bg-black text-foreground">
      <InternalNavigation />
      
      <div className="container px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gray-200">My</span>
            <br />
            <span className="text-white">Account</span>
          </h1>
          <p className="text-lg text-gray-400">
            Manage your profile and view booking history
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <Card className="glass border-white/10">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{user?.name || 'User'}</h3>
                  {/* Assuming memberSince is not part of basic User from AuthContext */}
                  {/* <p className="text-gray-400">Member since {user.memberSince}</p> */}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium">{user?.email || 'N/A'}</p>
                  </div>
                  {/* Assuming phone is not part of basic User from AuthContext */}
                  {/* <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="font-medium">{user.phone}</p>
                  </div> */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-primary">{bookingHistory.length}</p>
                        <p className="text-sm text-gray-400">Total Trips</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-primary">
                          ₹{bookingHistory.reduce((sum, booking) => sum + booking.amount, 0).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-400">Total Spent</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Booking History */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <Card className="glass border-white/10">
                <CardHeader>
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Ticket className="w-5 h-5" />
                    Booking History
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookingHistory.length === 0 && !isLoadingBookings && (
                      <p className="text-gray-400 text-center py-4">You have no bookings yet.</p>
                    )}
                    {bookingHistory.map((booking, index) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-white">{booking.route}</h4>
                              {getStatusBadge(booking.status)}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-400">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{booking.from} → {booking.to}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>{booking.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{booking.time}</span>
                              </div>
                            </div>
                            
                            <div className="mt-2 text-sm">
                              <span className="text-gray-400">by </span>
                              <span className="text-white">{booking.busOperator}</span>
                              <span className="text-gray-400"> • </span>
                              <span className="text-white">{booking.seats} {booking.seats === 1 ? 'seat' : 'seats'}</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-lg font-bold text-primary mb-1">
                              ₹{booking.amount}
                            </div>
                            <div className="text-xs text-gray-400">
                              Booking ID: {booking.id}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
