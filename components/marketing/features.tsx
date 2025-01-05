import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart2, 
  Lock, 
  LineChart, 
  Users, 
  Zap,
  Clock,
  Globe,
  Sliders,
  Check
} from "lucide-react";

const features = [
  {
    title: "Real-time Analytics",
    description: "Monitor your key metrics in real-time with interactive dashboards",
    icon: BarChart2,
    color: "text-blue-500"
  },
  {
    title: "Custom Reports",
    description: "Create and export custom reports tailored to your needs",
    icon: LineChart,
    color: "text-purple-500"
  },
  {
    title: "Enterprise Security",
    description: "Bank-grade security to protect your sensitive data",
    icon: Lock,
    color: "text-green-500"
  },
  {
    title: "Team Collaboration",
    description: "Work together with your team in real-time",
    icon: Users,
    color: "text-orange-500"
  },
  {
    title: "Fast Performance",
    description: "Lightning-fast data processing and query responses",
    icon: Zap,
    color: "text-yellow-500"
  },
  {
    title: "Historical Data",
    description: "Access and analyze historical data with ease",
    icon: Clock,
    color: "text-pink-500"
  },
  {
    title: "Global CDN",
    description: "Distributed infrastructure for optimal performance",
    icon: Globe,
    color: "text-indigo-500"
  },
  {
    title: "Advanced Filters",
    description: "Powerful filtering and segmentation capabilities",
    icon: Sliders,
    color: "text-red-500"
  }
];

export function Features() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index} className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <div className="mb-4 flex items-center justify-center">
                <div className={`rounded-lg p-3 ring-2 ring-primary/10 ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
              </div>
              <CardTitle className="text-center">{feature.title}</CardTitle>
              <CardDescription className="text-center">
                {feature.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add any additional feature details or CTAs here */}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feature Highlights Section */}
      <div className="mt-24 grid gap-12 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">
            Advanced Analytics Dashboard
          </h2>
          <p className="text-muted-foreground">
            Get a complete view of your business performance with our intuitive dashboard.
            Track key metrics, analyze trends, and make data-driven decisions.
          </p>
          <ul className="space-y-2">
            {[
              "Interactive data visualization",
              "Custom metric tracking",
              "Automated reporting",
              "Real-time updates"
            ].map((item, i) => (
              <li key={i} className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-video rounded-lg bg-muted">
          {/* Add dashboard preview image or interactive demo here */}
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            Dashboard Preview
          </div>
        </div>
      </div>
    </div>
  );
} 