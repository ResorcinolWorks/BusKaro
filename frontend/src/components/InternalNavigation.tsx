
import { useState } from "react";
import { Bus, Menu, ShoppingCart, User } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "./ui/badge";

const InternalNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  const navItems = [
    { name: "Routes", href: "/routes" },
    { name: "Account", href: "/account" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-3.5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-full h-14 bg-[#1B1B1B]/40 backdrop-blur-xl border border-white/10 w-[90%] max-w-2xl">
      <div className="mx-auto h-full px-6">
        <nav className="flex items-center justify-between h-full">
          <Link to="/" className="flex items-center gap-2">
            <Bus className="w-5 h-5 text-primary" />
            <span className="font-bold text-base">BusKaro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm transition-all duration-300 ${
                  isActive(item.href)
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <Link to="/cart" className="relative">
              <Button variant="outline" size="sm" className="glass">
                <ShoppingCart className="h-4 w-4" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <Link to="/cart" className="relative">
              <Button variant="outline" size="icon" className="glass">
                <ShoppingCart className="h-4 w-4" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
            
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="glass">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-[#1B1B1B]">
                <div className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`text-lg transition-colors ${
                        isActive(item.href)
                          ? "text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default InternalNavigation;
