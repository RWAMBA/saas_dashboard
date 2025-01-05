"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: PricingFeature[];
  buttonText: string;
  popular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    description: "Perfect for trying out our platform",
    price: {
      monthly: 0,
      yearly: 0,
    },
    features: [
      { text: "Up to 3 projects", included: true },
      { text: "Basic analytics", included: true },
      { text: "48-hour support response time", included: true },
      { text: "500MB storage", included: true },
      { text: "API access", included: false },
      { text: "Custom integrations", included: false },
    ],
    buttonText: "Get Started Free",
  },
  {
    name: "Pro",
    description: "Perfect for growing businesses",
    price: {
      monthly: 29,
      yearly: 290,
    },
    features: [
      { text: "Unlimited projects", included: true },
      { text: "Advanced analytics", included: true },
      { text: "4-hour support response time", included: true },
      { text: "10GB storage", included: true },
      { text: "API access", included: true },
      { text: "Custom integrations", included: false },
    ],
    buttonText: "Start Pro Plan",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large-scale organizations",
    price: {
      monthly: 99,
      yearly: 990,
    },
    features: [
      { text: "Unlimited everything", included: true },
      { text: "Custom analytics", included: true },
      { text: "1-hour support response time", included: true },
      { text: "Unlimited storage", included: true },
      { text: "API access", included: true },
      { text: "Custom integrations", included: true },
    ],
    buttonText: "Contact Sales",
  },
];

export function PricingPlans() {
  const [interval, setInterval] = React.useState<"monthly" | "yearly">("monthly");

  return (
    <div className="space-y-8">
      {/* Pricing Toggle - Centered */}
      <div className="flex justify-center items-center gap-4">
        <Button
          variant={interval === "monthly" ? "default" : "ghost"}
          onClick={() => setInterval("monthly")}
        >
          Monthly
        </Button>
        <Button
          variant={interval === "yearly" ? "default" : "ghost"}
          onClick={() => setInterval("yearly")}
        >
          Yearly
          <span className="ml-1.5 text-xs font-normal">Save 20%</span>
        </Button>
      </div>

      {/* Pricing Cards - Better Centered with Max Width */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 md:grid-cols-3 md:gap-4 lg:gap-8">
          {pricingTiers.map((tier) => (
            <Card 
              key={tier.name}
              className={`relative flex flex-col ${
                tier.popular 
                  ? "border-primary shadow-lg md:scale-105" 
                  : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    ${interval === "monthly" ? tier.price.monthly : tier.price.yearly}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    /{interval}
                  </span>
                </div>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, index) => (
                    <li 
                      key={index}
                      className={`flex items-center ${
                        feature.included ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      <Check 
                        className={`h-4 w-4 mr-3 flex-shrink-0 ${
                          feature.included ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  variant={tier.popular ? "default" : "outline"}
                  size="lg"
                >
                  {tier.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 