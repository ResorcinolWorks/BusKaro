
import { motion } from "framer-motion";
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import InternalNavigation from "@/components/InternalNavigation";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-black text-foreground">
        <InternalNavigation />
        
        <div className="container px-4 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <ShoppingBag className="w-24 h-24 mx-auto text-gray-600 mb-6" />
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-400 mb-8">
              Looks like you haven't added any bus tickets to your cart yet.
            </p>
            <Link to="/routes">
              <Button className="button-gradient">
                Browse Routes
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
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
            <span className="text-gray-200">Your</span>
            <br />
            <span className="text-white">Shopping Cart</span>
          </h1>
          <p className="text-lg text-gray-400">
            {getTotalItems()} {getTotalItems() === 1 ? 'ticket' : 'tickets'} in your cart
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass border-white/10">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">
                            {item.route}
                          </h3>
                          <div className="space-y-1 text-sm text-gray-400">
                            <p>{item.date} at {item.time}</p>
                            <p>by {item.busOperator}</p>
                            <p className="text-primary font-medium">₹{item.price} per seat</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="h-8 w-8"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.availableSeats}
                              className="h-8 w-8"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <div className="font-bold text-white">
                              ₹{item.price * item.quantity}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-400 hover:text-red-300 mt-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="glass border-white/10 sticky top-32">
                  <CardHeader>
                    <h3 className="text-xl font-semibold">Order Summary</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="font-medium">₹{getTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Service Fee</span>
                      <span className="font-medium">₹50</span>
                    </div>
                    <div className="border-t border-white/10 pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-primary">₹{getTotalPrice() + 50}</span>
                      </div>
                    </div>
                    <Link to="/checkout" className="block">
                      <Button className="w-full button-gradient">
                        Proceed to Checkout
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
