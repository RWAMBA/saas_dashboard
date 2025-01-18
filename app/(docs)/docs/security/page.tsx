export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Security</h1>
      
      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Data Protection</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>AES-256 encryption for data at rest</li>
          <li>TLS 1.3 for data in transit</li>
          <li>Regular security audits</li>
          <li>GDPR compliance features</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Authentication</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Multi-factor authentication</li>
          <li>JWT-based API authentication</li>
          <li>Role-based access control</li>
          <li>Session management</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Compliance</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>GDPR compliance tools</li>
          <li>Data retention policies</li>
          <li>Privacy controls</li>
          <li>Audit logging</li>
        </ul>
      </div>
    </div>
  );
} 