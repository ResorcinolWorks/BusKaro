import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleAuthAction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const url = isLogin 
      ? "http://localhost:8080/api/auth/login" 
      : "http://localhost:8080/api/auth/signup";
    
    const payload = isLogin 
      ? { email, password } 
      : { name, email, password, phone: "0000000000" };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || (isLogin ? "Login failed" : "Signup failed"));
      }

      const userData = { name: data.name, email: data.email };
      login(data.token, userData);

      toast({
        title: isLogin ? "Login Successful" : "Signup Successful",
        description: data.token ? `Welcome, ${data.name || 'User'}!` : "", 
      });
      onClose();
      if (isLogin) {
        navigate("/routes");
      }

    } catch (error: any) {
      console.error("Auth error:", error);
      toast({
        title: isLogin ? "Login Failed" : "Signup Failed",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-[#1B1B1B] border border-white/10 rounded-xl p-8 w-full max-w-md mx-4"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">
              {isLogin ? "Welcome Back" : "Join BusKaro"}
            </h2>
            <p className="text-gray-400">
              {isLogin ? "Sign in to your account" : "Create your account to get started"}
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleAuthAction}>
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                />
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
              />
            </div>

            <Button type="submit" className="w-full button-gradient" disabled={isLoading}>
              {isLoading ? (isLogin ? 'Signing In...' : 'Creating Account...') : (isLogin ? "Sign In" : "Create Account")}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-primary hover:underline"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
