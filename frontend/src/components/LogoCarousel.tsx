
import { motion } from "framer-motion";
import { Bus, MapPin, Shield, Clock, Star } from "lucide-react";

const LogoCarousel = () => {
  const icons = [
    { Icon: Bus, label: "Comfortable Buses" },
    { Icon: MapPin, label: "Pan India Routes" },
    { Icon: Shield, label: "Safe Travel" },
    { Icon: Clock, label: "On Time" },
    { Icon: Star, label: "Top Rated" },
  ];

  const extendedIcons = [...icons, ...icons, ...icons];

  return (
    <div className="w-full overflow-hidden bg-background/50 backdrop-blur-sm py-12 mt-20">
      <motion.div 
        className="flex space-x-16"
        initial={{ opacity: 0, x: "0%" }}
        animate={{
          opacity: 1,
          x: "-50%"
        }}
        transition={{
          opacity: { duration: 0.5 },
          x: {
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: 0.5
          }
        }}
        style={{
          width: "fit-content",
          display: "flex",
          gap: "4rem"
        }}
      >
        {extendedIcons.map(({ Icon, label }, index) => (
          <motion.div
            key={`icon-${index}`}
            className="flex flex-col items-center gap-2 min-w-[120px]"
            initial={{ opacity: 0.5 }}
            whileHover={{ 
              opacity: 1,
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            <Icon className="h-8 w-8 text-primary" />
            <span className="text-sm text-gray-400 text-center">{label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default LogoCarousel;
