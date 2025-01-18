export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Dashboard Features</h1>
      
      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Overview</h2>
        <p className="text-muted-foreground">
          The dashboard provides a comprehensive view of your analytics data with multiple features:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Real-time visitor tracking</li>
          <li>Interactive data visualizations</li>
          <li>Customizable widgets</li>
          <li>Date range filtering</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Widgets</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Visitor Stats</h3>
            <p className="text-sm text-muted-foreground">Track unique visitors, page views, and session duration.</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Traffic Sources</h3>
            <p className="text-sm text-muted-foreground">Monitor where your visitors are coming from.</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Conversion Tracking</h3>
            <p className="text-sm text-muted-foreground">Track goals and conversion rates.</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Custom Reports</h3>
            <p className="text-sm text-muted-foreground">Create and save custom report configurations.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 