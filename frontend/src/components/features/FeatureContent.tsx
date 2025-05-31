
import { motion } from "framer-motion";
import { Bus } from "lucide-react";

interface FeatureContentProps {
  image: string;
  title: string;
}

export const FeatureContent = ({ image, title }: FeatureContentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full flex items-center justify-center"
    >
      <div className="glass rounded-xl overflow-hidden w-full relative p-12 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <Bus className="w-32 h-32 mx-auto text-primary mb-4 relative z-10" />
        <h3 className="text-xl font-medium text-white relative z-10">{title}</h3>
        <p className="text-gray-400 relative z-10 mt-2">Experience seamless bus booking</p>
      </div>
    </motion.div>
  );
};
