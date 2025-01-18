export default function ComponentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Components</h1>
      
      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Available Components</h2>
        <p className="text-muted-foreground">
          Analytics Pro includes a comprehensive set of customizable components:
        </p>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Charts</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Line Charts</li>
              <li>Bar Charts</li>
              <li>Area Charts</li>
              <li>Pie Charts</li>
            </ul>
          </div>
          
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Data Display</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Data Tables</li>
              <li>Stats Cards</li>
              <li>Metrics Display</li>
              <li>Progress Indicators</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Customization</h2>
        <p className="text-muted-foreground">
          Learn how to customize and extend components:
        </p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`// Example of customizing a chart component
import { LineChart } from '@/components/charts';

export function CustomChart() {
  return (
    <LineChart
      data={data}
      theme="custom"
      options={{
        // Custom options here
      }}
    />
  );
}`}</code>
        </pre>
      </div>
    </div>
  );
} 