import { Check, X } from "lucide-react";

// Define the type for features
type CompetitorFeatures = {
  "Real-time Analytics": boolean;
  "Custom Reports": boolean | string;
  "Data Export": boolean;
  "API Access": boolean | string;
  "Team Collaboration": boolean | string;
  "White Labeling": boolean | string;
  "Priority Support": string;
  "Custom Development": boolean | string;
  "Price/month": string;
  "Free Trial": string;
};

// Define the type for a competitor
interface Competitor {
  name: string;
  price: string;
  features: CompetitorFeatures;
  highlight?: boolean;
}

const competitors: Competitor[] = [
  {
    name: "Analytics Pro",
    price: "$149",
    features: {
      "Real-time Analytics": true,
      "Custom Reports": true,
      "Data Export": true,
      "API Access": true,
      "Team Collaboration": true,
      "White Labeling": "Extended Plan",
      "Priority Support": "Extended Plan",
      "Custom Development": "Enterprise",
      "Price/month": "$149",
      "Free Trial": "14 days",
    },
    highlight: true,
  },
  {
    name: "Competitor A",
    price: "$299",
    features: {
      "Real-time Analytics": true,
      "Custom Reports": true,
      "Data Export": true,
      "API Access": true,
      "Team Collaboration": "Enterprise",
      "White Labeling": "Enterprise",
      "Priority Support": "Enterprise",
      "Custom Development": false,
      "Price/month": "$299",
      "Free Trial": "7 days",
    },
  },
  {
    name: "Competitor B",
    price: "$199",
    features: {
      "Real-time Analytics": true,
      "Custom Reports": "Enterprise",
      "Data Export": true,
      "API Access": "Enterprise",
      "Team Collaboration": "Enterprise",
      "White Labeling": false,
      "Priority Support": "Enterprise",
      "Custom Development": false,
      "Price/month": "$199",
      "Free Trial": "None",
    },
  },
];

export default function ComparisonPage() {
  // Get typed keys from the features
  const featureKeys = Object.keys(competitors[0].features) as Array<keyof CompetitorFeatures>;

  return (
    <section className="container py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Compare Analytics Pro
        </h1>
        <p className="text-xl text-muted-foreground">
          See how we stack up against the competition
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-4 border-b">Features</th>
              {competitors.map((competitor) => (
                <th
                  key={competitor.name}
                  className={`text-left p-4 border-b ${
                    competitor.highlight ? "bg-primary/5" : ""
                  }`}
                >
                  {competitor.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featureKeys.map((feature) => (
              <tr key={feature} className="border-b">
                <td className="p-4 font-medium">{feature}</td>
                {competitors.map((competitor) => (
                  <td
                    key={`${competitor.name}-${feature}`}
                    className={`p-4 ${
                      competitor.highlight ? "bg-primary/5" : ""
                    }`}
                  >
                    {typeof competitor.features[feature] === "boolean" ? (
                      competitor.features[feature] ? (
                        <Check className="text-green-500 h-5 w-5" />
                      ) : (
                        <X className="text-red-500 h-5 w-5" />
                      )
                    ) : (
                      competitor.features[feature]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
} 