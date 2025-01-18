import { SignInForm } from "@/components/auth/signin-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign in to Analytics Pro</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignInForm />
          
          {/* Demo Account Info */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <div className="mt-2 text-sm space-y-1">
                <p className="font-semibold">Demo Account:</p>
                <p>Email: <code className="rounded bg-primary/10 px-1">test@example.com</code></p>
                <p>Password: <code className="rounded bg-primary/10 px-1">password123</code></p>
              </div>
            </AlertDescription>
          </Alert>

          <div className="space-y-2 text-center text-sm text-muted-foreground">
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
            <p>
              <Link href="/forgot-password" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </p>
          </div>

          {/* Enterprise Features Teaser */}
          <div className="mt-6 rounded-lg border p-4">
            <h3 className="text-sm font-semibold mb-2">Enterprise Features Available:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Team Management</li>
              <li>• Custom Reporting</li>
              <li>• White Labeling</li>
              <li>• Priority Support</li>
            </ul>
            <Link 
              href="/pricing" 
              className="text-sm text-primary hover:underline block mt-2"
            >
              View Enterprise Plans →
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 