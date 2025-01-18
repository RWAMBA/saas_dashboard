export default function ThemingPage() {
  return (
    <div className="space-y-6">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Theming</h1>
      
      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Theme Configuration</h2>
        <p className="text-muted-foreground">
          Analytics Pro comes with a powerful theming system that allows you to customize every aspect of your dashboard.
        </p>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Available Themes</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold mb-2">Modern Theme</h4>
              <pre className="bg-muted p-2 rounded text-sm">
                <code>
                  {`--primary: 222.2 89% 42%;
--secondary: 217.2 32.6% 17.5%;
--accent: 210 40% 96.1%;`}
                </code>
              </pre>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold mb-2">Elegant Theme</h4>
              <pre className="bg-muted p-2 rounded text-sm">
                <code>
                  {`--primary: 262 83% 58%;
--secondary: 215 25% 27%;
--accent: 316 72% 86%;`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Custom Theming</h3>
          <p className="text-muted-foreground">
            Create your own theme by modifying the CSS variables in your globals.css file:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>
              {`:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* Add your custom colors */
}`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
} 