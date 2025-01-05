import { Features } from "@/components/marketing/features";

export default function FeaturesPage() {
  return (
    <section className="container py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Powerful Analytics Features
        </h1>
        <p className="text-xl text-muted-foreground">
          Everything you need to understand your data and grow your business
        </p>
      </div>
      <Features />
    </section>
  );
} 