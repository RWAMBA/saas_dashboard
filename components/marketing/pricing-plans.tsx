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
    name: "Standard",
    description: "Perfect for individual developers and small businesses",
    price: {
      monthly: 149,
      yearly: 149,
    },
    features: [
      { text: "Single end product/domain", included: true },
      { text: "6 months support & updates", included: true },
      { text: "Personal or client projects", included: true },
      { text: "Basic email support", included: true },
      { text: "Multiple domains", included: false },
      { text: "White-label rights", included: false },
    ],
    buttonText: "Get Standard License",
  },
  {
    name: "Extended",
    description: "Ideal for agencies and growing businesses",
    price: {
      monthly: 449,
      yearly: 449,
    },
    features: [
      { text: "Up to 10 domains", included: true },
      { text: "12 months support & updates", included: true },
      { text: "SaaS applications allowed", included: true },
      { text: "Priority support", included: true },
      { text: "Private Slack channel access", included: true },
      { text: "White-label rights", included: false },
    ],
    buttonText: "Get Extended License",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large-scale organizations",
    price: {
      monthly: 1499,
      yearly: 1499,
    },
    features: [
      { text: "Unlimited end products", included: true },
      { text: "White-label rights", included: true },
      { text: "Lifetime support & updates", included: true },
      { text: "Custom modifications", included: true },
      { text: "Custom feature development", included: true },
      { text: "Direct phone support", included: true },
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