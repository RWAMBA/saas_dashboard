import { CodeBlock } from "@/components/docs/code-block";

export default function APIDocsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">API Reference</h1>
        <p className="text-lg text-muted-foreground mt-4">
          Complete reference for the Analytics Pro API
        </p>
      </div>

      <div className="space-y-6">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Authentication</h2>
          <p>All API requests require authentication using an API key.</p>
          <CodeBlock
            language="bash"
            code={`Authorization: Bearer your_api_key_here`}
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Analytics Endpoints</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold">Get Analytics Data</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Retrieve analytics data for a specific time period.
              </p>
              <CodeBlock
                language="bash"
                code={`GET /api/analytics
Parameters:
  - startDate: YYYY-MM-DD
  - endDate: YYYY-MM-DD
  - metrics: Array<string>`}
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold">Track Event</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Track a new analytics event.
              </p>
              <CodeBlock
                language="bash"
                code={`POST /api/events
{
  "event": "page_view",
  "url": "/dashboard",
  "timestamp": "2024-01-17T20:33:26Z",
  "properties": {
    "referrer": "google",
    "device": "mobile"
  }
}`}
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold">Export Data</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Export analytics data in various formats.
              </p>
              <CodeBlock
                language="bash"
                code={`GET /api/export
Parameters:
  - format: "csv" | "pdf" | "json"
  - startDate: YYYY-MM-DD
  - endDate: YYYY-MM-DD`}
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Rate Limits</h2>
          <p>API requests are limited to:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>1000 requests per minute for standard plans</li>
            <li>5000 requests per minute for enterprise plans</li>
            <li>Rate limit headers are included in all responses</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Error Handling</h2>
          <p className="mb-4">The API uses standard HTTP response codes:</p>
          <CodeBlock
            language="json"
            code={`{
  "error": {
    "code": "invalid_request",
    "message": "Invalid date format",
    "details": {
      "field": "startDate",
      "expected": "YYYY-MM-DD"
    }
  }
}`}
          />
        </section>
      </div>
    </div>
  );
} 