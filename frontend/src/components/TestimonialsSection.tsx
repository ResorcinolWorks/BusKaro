
"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Frequent Traveler",
    image: "https://avatars.githubusercontent.com/u/1234567?v=4",
    content: "BusKaro made my journey from Delhi to Jaipur so smooth. Real-time tracking and comfortable buses. Highly recommended!"
  },
  {
    name: "Rajesh Kumar",
    role: "Business Traveler",
    image: "https://avatars.githubusercontent.com/u/2345678?v=4",
    content: "The mobile app is fantastic. I can book tickets on the go and track my bus in real-time. Great service across all routes."
  },
  {
    name: "Anita Patel",
    role: "Student",
    image: "https://avatars.githubusercontent.com/u/3456789?v=4",
    content: "Affordable prices and reliable service. I travel from Mumbai to Pune every weekend and BusKaro never disappoints."
  },
  {
    name: "Suresh Reddy",
    role: "Senior Citizen",
    image: "https://avatars.githubusercontent.com/u/4567890?v=4",
    content: "Easy booking process and helpful customer support. The senior citizen discounts are a great bonus!"
  },
  {
    name: "Kavita Singh",
    role: "Solo Traveler",
    image: "https://avatars.githubusercontent.com/u/5678901?v=4",
    content: "Safe and secure travel experience. The GPS tracking feature gives me peace of mind during long journeys."
  },
  {
    name: "Amit Gupta",
    role: "Family Traveler",
    image: "https://avatars.githubusercontent.com/u/6789012?v=4",
    content: "Traveling with family has never been easier. Group bookings and seat selection features are excellent."
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 overflow-hidden bg-black">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-normal mb-4">Trusted by Travelers</h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of satisfied travelers on BusKaro
          </p>
        </motion.div>

        <div className="relative flex flex-col antialiased">
          <div className="relative flex overflow-hidden py-4">
            <div className="animate-marquee flex min-w-full shrink-0 items-stretch gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={`${index}-1`} className="w-[400px] shrink-0 bg-black/40 backdrop-blur-xl border-white/5 hover:border-white/10 transition-all duration-300 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-white/90">{testimonial.name}</h4>
                      <p className="text-sm text-white/60">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    {testimonial.content}
                  </p>
                </Card>
              ))}
            </div>
            <div className="animate-marquee flex min-w-full shrink-0 items-stretch gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={`${index}-2`} className="w-[400px] shrink-0 bg-black/40 backdrop-blur-xl border-white/5 hover:border-white/10 transition-all duration-300 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-white/90">{testimonial.name}</h4>
                      <p className="text-sm text-white/60">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    {testimonial.content}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
