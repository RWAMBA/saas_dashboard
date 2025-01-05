import { PricingPlans } from "@/components/marketing/pricing-plans";

export default function PricingPage() {
  return (
    <section className="container py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-xl text-muted-foreground">
          Choose the perfect plan for your needs. Always know what you'll pay.
        </p>
      </div>
      <PricingPlans />
    </section>
  );
} 