"use client";

import { motion } from "framer-motion";
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  Settings, 
  Shield, 
  Zap 
} from "lucide-react";

export function Features() {
  return (
    <section id="features" className="py-24 bg-muted/50">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-[700px] mx-auto">
            Everything you need to track, analyze, and optimize your business performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
              <div className="relative p-6 bg-background rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    title: "Real-time Analytics",
    description: "Monitor your metrics in real-time with our powerful dashboard.",
    icon: LineChart,
  },
  {
    title: "Custom Reports",
    description: "Create and export custom reports tailored to your needs.",
    icon: BarChart,
  },
  {
    title: "Data Visualization",
    description: "Beautiful charts and graphs to visualize your data.",
    icon: PieChart,
  },
  {
    title: "Fast Performance",
    description: "Lightning-fast performance with optimized data processing.",
    icon: Zap,
  },
  {
    title: "Advanced Security",
    description: "Enterprise-grade security to protect your data.",
    icon: Shield,
  },
  {
    title: "Easy Integration",
    description: "Simple integration with your existing tools and workflows.",
    icon: Settings,
  },
]; 