import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart2, Lock, LineChart } from "lucide-react";

export function Features() {
  return (
    <section id="features" className="py-24 px-4 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="mb-4">
                  <feature.icon className="w-10 h-10 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    title: "Real-time Analytics",
    description: "Monitor your key metrics in real-time with interactive dashboards",
    icon: BarChart2
  },
  {
    title: "Custom Reports",
    description: "Create and export custom reports tailored to your needs",
    icon: LineChart
  },
  {
    title: "Data Security",
    description: "Enterprise-grade security to protect your sensitive data",
    icon: Lock
  }
]; 