import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Lock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InternalNavigation from "@/components/InternalNavigation";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);

    if (!isAuthenticated || !token) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to complete the purchase.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    try {
      // Step 1: Add all frontend cart items to backend cart
      for (const item of cartItems) {
        // Construct URL with routeId as path variable and seats as query param
        const cartApiUrl = `http://localhost:8080/api/cart/${item.id}?seats=${item.quantity}`;

        const cartResponse = await fetch(cartApiUrl, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!cartResponse.ok) {
          const errorData = await cartResponse.json();
          throw new Error(errorData.message || `Failed to add ${item.route} to backend cart.`);
        }
      }

      const checkoutResponse = await fetch("http://localhost:8080/api/checkout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!checkoutResponse.ok) {
        const errorData = await checkoutResponse.json();
        throw new Error(errorData.message || "Checkout process failed.");
      }

      setOrderComplete(true);
      clearCart();
      toast({
        title: "Payment Successful!",
        description: "Your bus tickets have been booked successfully.",
      });

      setTimeout(() => {
        navigate("/account");
      }, 3000);

    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout Failed",
        description: error.message || "An unexpected error occurred during checkout.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated && !orderComplete && !isProcessing) {
    return (
      <div className="min-h-screen bg-black text-foreground flex flex-col items-center justify-center">
        <InternalNavigation />
        <div className="text-center p-8 text-white">
          <Lock className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Please Log In</h2>
          <p className="text-gray-400 mb-6">You need to be logged in to proceed with checkout.</p>
          <Link to="/">
            <Button className="button-gradient">Go to Homepage & Log In</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-black text-foreground">
        <InternalNavigation />
        
        <div className="container px-4 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <h1 className="text-3xl font-bold mb-4">No Items to Checkout</h1>
            <p className="text-gray-400 mb-8">
              Your cart is empty. Add some bus tickets to proceed with checkout.
            </p>
            <Link to="/routes">
              <Button className="button-gradient">Browse Routes</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-black text-foreground">
        <InternalNavigation />
        
        <div className="container px-4 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md mx-auto"
          >
            <CheckCircle className="w-24 h-24 mx-auto text-green-500 mb-6" />
            <h1 className="text-3xl font-bold mb-4">Order Successful!</h1>
            <p className="text-gray-400 mb-8">
              Your bus tickets have been booked successfully. You will be redirected to your account page shortly.
            </p>
            <Link to="/account">
              <Button className="button-gradient">View My Bookings</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

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
            <span className="text-gray-200">Secure</span>
            <br />
            <span className="text-white">Checkout</span>
          </h1>
          <p className="text-lg text-gray-400">
            Complete your booking with our secure payment system
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass border-white/10">
                <CardHeader>
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Details
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Cardholder Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>

                  <div className="pt-4">
                    <Button 
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="w-full button-gradient"
                    >
                      {isProcessing ? (
                        "Processing Payment..."
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Pay ₹{getTotalPrice() + 50}
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass border-white/10">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Order Summary</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium">{item.route}</p>
                        <p className="text-sm text-gray-400">
                          {item.date} • {item.quantity} {item.quantity === 1 ? 'seat' : 'seats'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t border-white/10 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span>₹{getTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Service Fee</span>
                      <span>₹50</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">₹{getTotalPrice() + 50}</span>
                    </div>
                  </div>

                  <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-3 mt-4">
                    <div className="flex items-center gap-2 text-green-400">
                      <Lock className="w-4 h-4" />
                      <span className="text-sm">Secure 256-bit SSL encryption</span>
                    </div>
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

export default Checkout;
