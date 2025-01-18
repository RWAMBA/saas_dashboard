export default function LayoutsPage() {
  return (
    <div className="space-y-6">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Layouts</h1>
      
      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Available Layouts</h2>
        <p className="text-muted-foreground">
          Analytics Pro comes with several pre-built layouts that you can use and customize:
        </p>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Dashboard Layout</h3>
            <p className="text-sm text-muted-foreground mb-2">
              The main dashboard layout includes:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Responsive sidebar navigation</li>
              <li>Top navigation bar</li>
              <li>Main content area</li>
              <li>Customizable widgets grid</li>
            </ul>
          </div>
          
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Reports Layout</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Specialized layout for detailed reports:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Full-width data tables</li>
              <li>Filters sidebar</li>
              <li>Export options header</li>
              <li>Pagination controls</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Customizing Layouts</h2>
        <p className="text-muted-foreground">
          You can customize layouts by modifying the layout components in the <code>components/layouts</code> directory:
        </p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`// Example of customizing dashboard layout
import { DashboardLayout } from '@/components/layouts';

export default function CustomDashboard() {
  return (
    <DashboardLayout
      sidebar={<CustomSidebar />}
      header={<CustomHeader />}
      footer={<CustomFooter />}
    >
      {/* Your dashboard content */}
    </DashboardLayout>
  );
}`}</code>
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Responsive Design</h2>
        <p className="text-muted-foreground">
          All layouts are fully responsive and adapt to different screen sizes:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Mobile-first approach</li>
          <li>Collapsible sidebar on mobile</li>
          <li>Responsive grid systems</li>
          <li>Adaptive typography</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Layout Components</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Container</h3>
            <p className="text-sm text-muted-foreground">
              Responsive container component with configurable max-width and padding:
            </p>
            <pre className="bg-muted p-2 rounded text-sm mt-2">
              <code>{`<Container maxWidth="xl" className="px-4">
  {/* Your content */}
</Container>`}</code>
            </pre>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Grid System</h3>
            <p className="text-sm text-muted-foreground">
              Flexible grid system for creating complex layouts:
            </p>
            <pre className="bg-muted p-2 rounded text-sm mt-2">
              <code>{`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Grid items */}
</div>`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
} 