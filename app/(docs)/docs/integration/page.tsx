import { CodeBlock } from "@/components/docs/code-block";

export default function IntegrationPage() {
  return (
    <div className="space-y-6">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Integration Guide</h1>
      
      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Quick Start</h2>
        <p className="text-muted-foreground">
          Add Analytics Pro to your application with just a few lines of code:
        </p>
        <CodeBlock
          language="typescript"
          code={`import { AnalyticsPro } from '@analytics-pro/client'

// Initialize the client
const analytics = new AnalyticsPro({
  apiKey: 'your-api-key',
  projectId: 'your-project-id'
})

// Track events
analytics.track('page_view', {
  url: window.location.href,
  referrer: document.referrer
})`}
        />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Supported Platforms</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>React/Next.js Applications</li>
          <li>Vue.js Applications</li>
          <li>Plain JavaScript</li>
          <li>Mobile Apps (React Native)</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Event Tracking</h2>
        <p className="text-muted-foreground">
          Track custom events and user interactions:
        </p>
        <CodeBlock
          language="typescript"
          code={`// Track custom events
analytics.track('purchase', {
  productId: 'prod_123',
  amount: 99.99,
  currency: 'USD'
})

// Track user identification
analytics.identify('user_123', {
  email: 'user@example.com',
  plan: 'premium'
})`}
        />
      </div>
    </div>
  );
} 