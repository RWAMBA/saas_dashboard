import { Suspense } from 'react';
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Testimonials } from "@/components/landing/testimonials";
import { CTASection } from "@/components/landing/cta-section";
import { Screenshots } from "@/components/marketing/screenshots";
import { PricingPlans } from "@/components/marketing/pricing-plans";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Suspense fallback={<div className="w-full py-12 md:py-24 animate-pulse bg-muted/20" />}>
        <Features />
      </Suspense>
      <Suspense fallback={<div className="w-full py-12 md:py-24 animate-pulse bg-muted/20" />}>
        <Testimonials />
      </Suspense>
      <CTASection />
      <section className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <Suspense 
            fallback={
              <div className="w-full aspect-video rounded-lg animate-pulse bg-muted/20" />
            }
          >
            <Screenshots />
          </Suspense>
        </div>
      </section>
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <Suspense 
            fallback={
              <div className="grid gap-6 md:grid-cols-3 animate-pulse">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-96 rounded-lg bg-muted/20" />
                ))}
              </div>
            }
          >
            <PricingPlans />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
