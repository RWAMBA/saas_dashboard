"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, XCircle, CreditCard, Ban } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center space-y-10 text-center"
        >
          <div className="space-y-4 max-w-[800px]">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Ready to Transform Your Analytics?
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground text-lg md:text-xl">
              Start your free trial today and discover how Analytics Pro can help you make
              better data-driven decisions for your business.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 min-[400px]:flex-row justify-center">
            <Link href="/register">
              <Button size="lg" className="group">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Sales
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col items-center space-y-2 p-4 rounded-lg"
              >
                <benefit.icon className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground text-center">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center space-y-2 p-4 rounded-lg"
          >
            <span className="relative mb-2">
              <CreditCard className="h-8 w-8 text-primary" />
              <Ban className="h-8 w-8 text-primary absolute top-0 left-0 opacity-50" />
            </span>
            <p className="text-sm text-muted-foreground text-center">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

import { Zap, Shield, HeartHandshake } from "lucide-react";

const benefits = [
  {
    title: "Quick Setup",
    description: "Get started in minutes with our easy-to-follow setup process",
    icon: Zap,
  },
  {
    title: "Secure & Reliable",
    description: "Enterprise-grade security with 99.9% uptime guarantee",
    icon: Shield,
  },
  {
    title: "24/7 Support",
    description: "Our dedicated team is here to help you succeed",
    icon: HeartHandshake,
  },
]; 