export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Reports</h1>
      
      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Available Reports</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Traffic Report</h3>
            <p className="text-muted-foreground mb-2">
              Comprehensive traffic analysis including:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Page views and unique visitors</li>
              <li>Traffic sources and referrers</li>
              <li>Geographic distribution</li>
              <li>Device and browser statistics</li>
            </ul>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Conversion Report</h3>
            <p className="text-muted-foreground mb-2">
              Track conversion goals and user behavior:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Goal completion rates</li>
              <li>Conversion funnels</li>
              <li>User journey analysis</li>
              <li>Revenue tracking</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Export Options</h2>
        <p className="text-muted-foreground">
          Export your reports in multiple formats:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>CSV for spreadsheet analysis</li>
          <li>PDF for presentations</li>
          <li>JSON for API integration</li>
          <li>Scheduled automated exports</li>
        </ul>
      </div>
    </div>
  );
} 