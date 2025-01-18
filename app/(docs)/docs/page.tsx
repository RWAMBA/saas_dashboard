export default function DocsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Analytics Dashboard Documentation
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          A comprehensive guide to using and customizing your analytics dashboard.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {documentationSections.map((section) => (
          <div
            key={section.title}
            className="rounded-lg border p-4 hover:bg-muted/50 transition-colors"
          >
            <h3 className="font-semibold mb-2">{section.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              {section.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

const documentationSections = [
  {
    title: "Getting Started",
    description: "Everything you need to start using the dashboard.",
    topics: [
      "Quick installation guide",
      "Environment setup",
      "Database configuration",
      "First-time setup"
    ]
  },
  {
    title: "Core Features",
    description: "Learn about the main features and capabilities.",
    topics: [
      "Real-time analytics",
      "CSV import/export",
      "Data visualization",
      "Custom reports"
    ]
  },
  {
    title: "Dashboard Guide",
    description: "Understanding your analytics dashboard.",
    topics: [
      "Overview metrics",
      "Top pages analysis",
      "Recent activity tracking",
      "User behavior insights"
    ]
  },
  {
    title: "Data Management",
    description: "Managing your analytics data effectively.",
    topics: [
      "Data import guide",
      "Export options",
      "Data retention",
      "Backup strategies"
    ]
  },
  {
    title: "Customization",
    description: "Customize the dashboard to your needs.",
    topics: [
      "Theme customization",
      "Widget configuration",
      "Custom metrics",
      "Layout options"
    ]
  },
  {
    title: "Troubleshooting",
    description: "Common issues and their solutions.",
    topics: [
      "Import/Export issues",
      "Data discrepancies",
      "Performance optimization",
      "Common errors"
    ]
  }
]; 