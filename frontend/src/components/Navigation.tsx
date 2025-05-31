import { useState, useEffect } from "react";
import { Bus, Menu, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { Link as RouterLink } from "react-router-dom";

interface NavigationProps {
  onJoinNow: () => void;
}

const Navigation = ({ onJoinNow }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'testimonials') {
      const testimonialSection = document.querySelector('.animate-marquee');
      if (testimonialSection) {
        const yOffset = -100;
        const y = testimonialSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { name: "Features", href: "#features", onClick: () => scrollToSection('features') },
    { name: "Routes", href: "/routes" },
    { name: "Reviews", href: "#testimonials", onClick: () => scrollToSection('testimonials') },
  ];

  return (
    <header
      className={`fixed top-3.5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-full ${
        isScrolled 
          ? "h-14 bg-[#1B1B1B]/40 backdrop-blur-xl border border-white/10 scale-95 w-[90%] max-w-2xl" 
          : "h-14 bg-[#1B1B1B] w-[95%] max-w-3xl"
      }`}
    >
      <div className="mx-auto h-full px-6">
        <nav className="flex items-center justify-between h-full">
          <div className="flex items-center gap-2">
            <Bus className="w-5 h-5 text-primary" />
            <span className="font-bold text-base">BusKaro</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              item.href.startsWith("/") ? (
                <RouterLink
                  key={item.name}
                  to={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300"
                >
                  {item.name}
                </RouterLink>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.onClick) {
                      item.onClick();
                    }
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300"
                >
                  {item.name}
                </a>
              )
            ))}
            {isLoading ? (
              <div className="w-20 h-8 bg-gray-700 rounded-full animate-pulse"></div>
            ) : isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <RouterLink 
                  to="/account"
                  className="text-sm text-gray-300 hover:text-primary transition-colors cursor-pointer"
                >
                  Hi, {user.name.split(' ')[0]}
                </RouterLink>
                <Button 
                  onClick={logout}
                  size="sm"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 hover:text-primary rounded-full"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                onClick={onJoinNow}
                size="sm"
                className="button-gradient"
              >
                Join Now
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="glass">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-[#1B1B1B]">
                <div className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    item.href.startsWith("/") ? (
                      <RouterLink
                        key={item.name}
                        to={item.href}
                        className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </RouterLink>
                    ) : (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsMobileMenuOpen(false);
                          if (item.onClick) {
                            item.onClick();
                          }
                        }}
                      >
                        {item.name}
                      </a>
                    )
                  ))}
                  {isLoading ? (
                    <div className="w-full h-10 mt-4 bg-gray-700 rounded-md animate-pulse"></div>
                  ) : isAuthenticated && user ? (
                    <div className="flex flex-col gap-3 mt-4">
                      <RouterLink
                        to="/account"
                        className="text-lg text-gray-300 hover:text-primary transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Hi, {user.name.split(' ')[0]}
                      </RouterLink>
                      <Button 
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          logout();
                        }}
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary/10 hover:text-primary w-full"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onJoinNow();
                      }}
                      className="button-gradient mt-4 w-full"
                    >
                      Join Now
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
