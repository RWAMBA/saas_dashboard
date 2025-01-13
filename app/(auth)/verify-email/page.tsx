"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthToast } from "@/hooks/use-auth-toast";
import { Loader2 } from "lucide-react";

export default function VerifyEmailPage() {
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const authToast = useAuthToast();
  const token = searchParams.get("token");

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;

    async function verifyEmail() {
      try {
        if (!token) {
          throw new Error("Missing verification token");
        }

        if (!verified) {
          const response = await fetch(
            `/api/auth/verify?token=${token}`,
            { 
              method: "GET",
              signal: controller.signal 
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Failed to verify email");
          }

          if (mounted) {
            setVerified(true);
            
            if (data.status === "already_verified") {
              authToast.warning(
                "Already verified",
                "This email is already verified. Please sign in."
              );
            } else {
              authToast.success(
                "Email verified",
                "You can now sign in to your account"
              );
            }
            
            router.push("/login");
          }
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return; // Ignore abort errors
        }
        
        console.error("Verification error:", error);
        if (mounted) {
          const message = error instanceof Error ? error.message : "Verification failed";
          setError(message);
          authToast.error(
            "Verification failed",
            message
          );
          setVerifying(false);
        }
      }
    }

    verifyEmail();

    // Cleanup function
    return () => {
      mounted = false;
      controller.abort();
    };
  }, [token, router, authToast, verified]); // Only run once when token is available

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verify your email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {verifying && !verified ? (
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p>Verifying your email...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center space-y-4">
              <p className="text-red-500">{error}</p>
              <p>Verification failed. Please try again or request a new verification email.</p>
              <Button onClick={() => router.push("/login")}>
                Back to login
              </Button>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
} 