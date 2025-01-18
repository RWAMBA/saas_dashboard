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
      <Features />
      <Testimonials />
      <CTASection />
      <section className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <Screenshots />
        </div>
      </section>
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <PricingPlans />
        </div>
      </section>
    </div>
  );
}
