import { CodeBlock } from "@/components/docs/code-block";

export default function InstallationPage() {
  return (
    <div className="space-y-6">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Installation</h1>
      
      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Prerequisites</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Node.js 23 or higher</li>
          <li>PostgreSQL 15 or higher</li>
          <li>npm or yarn package manager</li>
          <li>Git (for version control)</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Step-by-Step Guide</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">1. Project Setup</h3>
            <CodeBlock
              language="bash"
              code={`git clone https://github.com/yourusername/analytics-dashboard.git
cd analytics-dashboard
npm install`}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">2. Environment Configuration</h3>
            <p className="text-muted-foreground mb-2">Create a .env file with the following:</p>
            <CodeBlock
              language="env"
              code={`DATABASE_URL="postgresql://user:password@localhost:5432/analytics"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"`}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">3. Database Setup</h3>
            <CodeBlock
              language="bash"
              code={`npx prisma generate
npx prisma db push
npm run seed # Optional: Add sample data`}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">4. Start Development Server</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>npm run dev</code>
            </pre>
            <p className="text-sm text-muted-foreground mt-2">
              Your dashboard will be available at http://localhost:3000
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Next Steps</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Configure your analytics settings</li>
          <li>Import your existing data</li>
          <li>Set up user accounts</li>
          <li>Customize the dashboard</li>
        </ul>
      </div>
    </div>
  );
} 