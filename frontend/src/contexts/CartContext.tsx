
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface BusTicket {
  id: string;
  route: string;
  from: string;
  to: string;
  date: string;
  time: string;
  price: number;
  availableSeats: number;
  busOperator: string;
  duration: string;
}

interface CartItem extends BusTicket {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (ticket: BusTicket) => void;
  removeFromCart: (ticketId: string) => void;
  updateQuantity: (ticketId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (ticket: BusTicket) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === ticket.id);
      if (existingItem) {
        if (existingItem.quantity < ticket.availableSeats) {
          return prevItems.map(item =>
            item.id === ticket.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return prevItems;
      }
      return [...prevItems, { ...ticket, quantity: 1 }];
    });
  };

  const removeFromCart = (ticketId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== ticketId));
  };

  const updateQuantity = (ticketId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(ticketId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === ticketId
          ? { ...item, quantity: Math.min(quantity, item.availableSeats) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
