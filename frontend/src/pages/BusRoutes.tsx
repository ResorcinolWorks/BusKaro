import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, MapPin, Clock, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import InternalNavigation from "@/components/InternalNavigation";
import { useCart, BusTicket as CartBusTicket } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const BusRoutes = () => {
  const { addToCart, cartItems } = useCart();
  const { toast } = useToast();
  const [busRoutes, setBusRoutes] = useState<BusTicket[]>([]);

  interface BusTicket {
    id: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    busOperator: string;
    busType: string;
    pricePerSeat: string;
    totalSeats: string;
    seatsAvailable: string;
    amenities: string;
  }

  useEffect(() => {
    const fetchBusRoutes = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/routes");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBusRoutes(data.map((route: any) => ({
          id: String(route.id),
          origin: route.origin,
          destination: route.destination,
          departureTime: route.departureTime,
          arrivalTime: route.arrivalTime,
          busOperator: route.busOperator,
          busType: route.busType,
          pricePerSeat: route.pricePerSeat,
          totalSeats: route.totalSeats,
          seatsAvailable: route.seatsAvailable,
          amenities: route.amenities
        })));
      } catch (error) {
        console.error("Failed to fetch bus routes:", error);
        toast({
          title: "Error Fetching Routes",
          description: "Could not load bus routes from the server.",
          variant: "destructive",
        });
      }
    };

    fetchBusRoutes();
  }, [toast]);

  const handleAddToCart = (ticketData: BusTicket) => {
    const price = parseFloat(ticketData.pricePerSeat);
    const availableSeats = parseInt(ticketData.seatsAvailable, 10);

    if (isNaN(price) || isNaN(availableSeats)) {
        toast({
            title: "Invalid Data",
            description: "Route data is invalid.",
            variant: "destructive"
        });
        return;
    }
    
    if (availableSeats === 0) {
      toast({
        title: "Out of Stock",
        description: "This route is currently sold out.",
        variant: "destructive"
      });
      return;
    }

    const cartTicket: CartBusTicket = {
        id: ticketData.id,
        route: `${ticketData.origin} to ${ticketData.destination}`,
        from: ticketData.origin,
        to: ticketData.destination,
        date: ticketData.departureTime.split("T")[0] || "N/A",
        time: ticketData.departureTime.split("T")[1]?.substring(0,5) || "N/A",
        price: price,
        availableSeats: availableSeats,
        busOperator: ticketData.busOperator,
        duration: "N/A"
    };

    const cartItem = cartItems.find(item => item.id === cartTicket.id);
    if (cartItem && cartItem.quantity >= cartTicket.availableSeats) {
      toast({
        title: "Maximum Quantity Reached",
        description: `Only ${cartTicket.availableSeats} seats available.`,
        variant: "destructive"
      });
      return;
    }

    addToCart(cartTicket);
    toast({
      title: "Added to Cart",
      description: `${cartTicket.route} has been added to your cart.`
    });
  };

  const getCartQuantity = (ticketId: string) => {
    const cartItem = cartItems.find(item => item.id === ticketId);
    return cartItem ? cartItem.quantity : 0;
  };

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
            <span className="text-gray-200">Available</span>
            <br />
            <span className="text-white">Bus Routes</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Choose from our wide selection of bus routes across major Indian states.
          </p>
        </motion.div>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {busRoutes.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass border-white/10 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {ticket.origin} → {ticket.destination}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{ticket.origin} → {ticket.destination}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{ticket.departureTime} - {ticket.arrivalTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        ₹{ticket.pricePerSeat}
                      </div>
                      <div className="text-sm text-gray-400">per seat</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{ticket.departureTime.split("T")[0]}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{ticket.departureTime.split("T")[1]?.substring(0,5)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{ticket.seatsAvailable} seats left</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-400">by </span>
                      <span className="text-white">{ticket.busOperator}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      {parseInt(ticket.seatsAvailable) === 0 ? (
                        <Badge variant="destructive">Out of Stock</Badge>
                      ) : parseInt(ticket.seatsAvailable) <= 5 ? (
                        <Badge variant="secondary" className="bg-orange-600">
                          Only {ticket.seatsAvailable} left
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-green-600">
                          Available
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {getCartQuantity(ticket.id) > 0 && (
                        <Badge variant="outline" className="mr-2">
                          {getCartQuantity(ticket.id)} in cart
                        </Badge>
                      )}
                      <Button
                        className="bg-primary/80 hover:bg-primary text-white rounded-full text-sm px-6 py-3"
                        onClick={() => handleAddToCart(ticket)}
                        disabled={parseInt(ticket.seatsAvailable) === 0}
                      >
                        {parseInt(ticket.seatsAvailable) === 0 ? "Sold Out" : "Book Now"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusRoutes;
