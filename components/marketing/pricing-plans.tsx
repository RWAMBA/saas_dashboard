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
import { cn } from "@/lib/utils";

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
  highlightedFeature?: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Standard",
    description: "Perfect for individual developers and small businesses",
    price: {
      monthly: 149,
      yearly: 119,
    },
    features: [
      { text: "Single end product/domain", included: true },
      { text: "6 months support & updates", included: true },
      { text: "Personal or client projects", included: true },
      { text: "Basic email support", included: true },
      { text: "Export to PDF/CSV", included: true },
      { text: "Basic analytics", included: true },
      { text: "Multiple domains", included: false },
      { text: "White-label rights", included: false },
    ],
    highlightedFeature: "Most Popular for Freelancers",
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
    <div className="flex flex-col items-center space-y-8">
      {/* Billing Toggle */}
      <div className="flex items-center gap-4">
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
          <span className="ml-1.5 rounded-full bg-primary/20 px-2 py-0.5 text-xs">
            Save 20%
          </span>
        </Button>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-8 md:grid-cols-3 lg:gap-8">
        {pricingTiers.map((tier) => (
          <div key={tier.name} className="relative">
            {tier.popular && (
              <div className="absolute -top-5 left-0 right-0 mx-auto w-fit">
                <span className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground">
                  Most Popular
                </span>
              </div>
            )}
            <Card 
              className={cn(
                "flex flex-col h-full border-2",
                tier.popular 
                  ? "border-primary shadow-lg scale-105 bg-primary/5" 
                  : "border-border"
              )}
            >
              <CardHeader>
                <CardTitle className="text-xl">{tier.name}</CardTitle>
                <CardDescription className="mt-2">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-8">
                  <span className="text-5xl font-bold">
                    ${interval === "monthly" ? tier.price.monthly : tier.price.yearly}
                  </span>
                  <span className="text-muted-foreground ml-2 text-base">
                    /{interval}
                  </span>
                </div>
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, index) => (
                    <li 
                      key={index}
                      className={cn(
                        "flex items-center",
                        feature.included 
                          ? "text-foreground" 
                          : "text-muted-foreground/60"
                      )}
                    >
                      <Check 
                        className={cn(
                          "h-5 w-5 mr-3 flex-shrink-0",
                          feature.included 
                            ? "text-primary" 
                            : "text-muted-foreground/50"
                        )}
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
          </div>
        ))}
      </div>
    </div>
  );
} 