"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthToast } from "@/hooks/use-auth-toast";
import { Loader2 } from "lucide-react";

export default function VerifyEmailPage() {
  const [verificationStatus, setVerificationStatus] = useState<
    'pending' | 'success' | 'error'
  >('pending');
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const authToast = useAuthToast();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      // If already processed, don't verify again
      if (verificationStatus !== 'pending') return;

      try {
        if (!token) {
          setVerificationStatus('error');
          throw new Error("Missing verification token");
        }

        const response = await fetch(`/api/auth/verify?token=${token}`);
        const data = await response.json();

        if (!response.ok) {
          setVerificationStatus('error');
          throw new Error(data.error || "Failed to verify email");
        }

        setVerificationStatus('success');
        
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
        
        // Delay redirect slightly to allow toast to be seen
        setTimeout(() => router.push("/login"), 1500);
      } catch (error) {
        console.error("Verification error:", error);
        const message = error instanceof Error ? error.message : "Verification failed";
        setError(message);
        authToast.error(
          "Verification failed",
          message
        );
      }
    };

    verifyEmail();
  }, [token, router, authToast]); // Removed verified from dependencies

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verify your email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {verificationStatus === 'pending' ? (
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p>Verifying your email...</p>
            </div>
          ) : verificationStatus === 'error' ? (
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