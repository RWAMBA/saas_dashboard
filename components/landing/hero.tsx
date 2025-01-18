"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BarChart2, LineChart, PieChart } from "lucide-react";

export function Hero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container px-4 md:px-6">
        {/* Floating Background Elements */}
        <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] opacity-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <LineChart className="absolute top-20 right-10 w-24 h-24 text-primary/40" />
            <BarChart2 className="absolute top-40 right-40 w-32 h-32 text-primary/30" />
            <PieChart className="absolute top-60 right-20 w-20 h-20 text-primary/50" />
          </motion.div>
        </div>

        <div className="flex flex-col items-center space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
              Analytics Dashboard
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent block mt-2">
                for Modern SaaS
              </span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
              Transform your business data into actionable insights. Monitor, analyze, 
              and optimize your SaaS metrics in real-time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col gap-4 min-[400px]:flex-row justify-center"
          >
            <Link href="/register">
              <Button size="lg" className="group">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-3xl font-bold">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
  { value: "45+", label: "Countries" },
]; 