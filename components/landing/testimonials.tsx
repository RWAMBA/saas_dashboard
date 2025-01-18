"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Trusted by Businesses
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what our customers have to say about us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-background rounded-lg p-6 border shadow-sm"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">{testimonial.content}</p>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={testimonial.avatar}
                    alt={testimonial.name}
                  />
                  <AvatarFallback>
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    content: "Analytics Pro has transformed how we track and analyze our business metrics. The real-time insights have helped us increase our conversion rates by 40%.",
    name: "Sarah Johnson",
    role: "CEO at TechStart",
    avatar: "/images/avatars/sarah.jpg",
  },
  {
    content: "The dashboard is incredibly intuitive and the custom reports save us hours every week. Best analytics solution we've used.",
    name: "Michael Chen",
    role: "CTO at GrowthLabs",
    avatar: "/images/avatars/michael.jpg",
  },
  {
    content: "Enterprise-grade analytics with startup-friendly pricing. The support team is amazing and always ready to help.",
    name: "Emma Davis",
    role: "Product Manager at ScaleUp",
    avatar: "/images/avatars/emma.jpg",
  },
]; 