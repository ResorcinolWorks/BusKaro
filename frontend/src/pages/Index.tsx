
import { motion } from "framer-motion";
import { ArrowRight, Bus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { FeaturesSection } from "@/components/features/FeaturesSection";
import LogoCarousel from "@/components/LogoCarousel";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { useState } from "react";
import AuthModal from "@/components/AuthModal";
import { Link } from "react-router-dom";

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen bg-black text-foreground">
      <Navigation onJoinNow={() => setShowAuthModal(true)} />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative container px-4 pt-40 pb-20 text-center"
      >
        {/* Background */}
        <div 
          className="absolute inset-0 -z-10 bg-[#0A0A0A]"
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full glass mx-auto"
        >
          <span className="text-sm font-medium">
            <Bus className="w-4 h-4 inline-block mr-2" />
            All-in-one bus booking platform
          </span>
        </motion.div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-7xl font-normal mb-4 tracking-tight">
            <span className="text-gray-200">
              <TextGenerateEffect words="Travel across India with" />
            </span>
            <br />
            <span className="text-white font-medium">
              <TextGenerateEffect words="BusKaro" />
            </span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-4 max-w-2xl mx-auto"
          >
            Book bus tickets across major Indian states with ease. Real-time availability, secure payments, and instant confirmations.{" "}
            <span className="text-white">Start your journey today.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < 4 ? "text-yellow-400" : "text-gray-400"}>★</span>
              ))}
            </div>
            <span className="text-gray-300 ml-2">4.5/5 (10,000+ reviews)</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <Button 
              size="lg" 
              className="button-gradient"
              onClick={() => setShowAuthModal(true)}
            >
              Join Now
            </Button>
            <Link to="/routes">
              <Button size="lg" variant="link" className="text-white">
                View Routes <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="relative mx-auto max-w-5xl mt-20"
        >
          <div className="glass rounded-xl p-12 text-center">
            <Bus className="w-32 h-32 mx-auto text-primary mb-4" />
            <h3 className="text-2xl font-medium mb-2">Your Journey Starts Here</h3>
            <p className="text-gray-400">Experience seamless bus booking across India</p>
          </div>
        </motion.div>
      </motion.section>

      {/* Logo Carousel */}
      <LogoCarousel />

      {/* Features Section */}
      <div id="features" className="bg-black">
        <FeaturesSection />
      </div>

      {/* Testimonials Section */}
      <div className="bg-black">
        <TestimonialsSection />
      </div>

      {/* CTA Section */}
      <section className="container px-4 py-20 relative bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0A0A0A]/80 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to start your journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who have already discovered the convenience of BusKaro.
          </p>
          <Button 
            size="lg" 
            className="button-gradient"
            onClick={() => setShowAuthModal(true)}
          >
            Join Now
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <div className="bg-black">
        <Footer />
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
};

export default Index;
