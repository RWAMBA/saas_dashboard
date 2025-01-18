import { CodeBlock } from "@/components/docs/code-block";

export default function ConfigurationPage() {
  return (
    <div className="space-y-6">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Configuration</h1>
      
      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Environment Variables</h2>
        <p className="text-muted-foreground">
          Configure your environment variables in the <code>.env</code> file:
        </p>
        <CodeBlock
          language="env"
          code={`# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/analytics_pro"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Email Configuration (Resend)
RESEND_API_KEY="re_123..."

# Analytics Configuration
ANALYTICS_ENABLED=true
TRACKING_ID="your-tracking-id"`}
        />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Database Setup</h2>
        <p className="text-muted-foreground">
          Configure your PostgreSQL database and run migrations:
        </p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`# Generate Prisma Client
npx prisma generate

# Run Migrations
npx prisma migrate dev

# Seed Database (Optional)
npx prisma db seed`}</code>
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Email Configuration</h2>
        <p className="text-muted-foreground">
          Set up email notifications and templates using Resend:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Sign up for a Resend account</li>
          <li>Add your domain and verify it</li>
          <li>Configure email templates in <code>emails/</code> directory</li>
          <li>Test email sending functionality</li>
        </ul>
      </div>
    </div>
  );
} 