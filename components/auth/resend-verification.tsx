"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthToast } from "@/hooks/use-auth-toast";

export function ResendVerification() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const authToast = useAuthToast();

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to resend verification email");
      }

      authToast.success(
        "Email sent",
        "If an account exists, you will receive a verification email"
      );
      setEmail("");
    } catch (error) {
      authToast.error(
        "Error",
        error instanceof Error ? error.message : "Failed to resend verification email"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleResend} className="space-y-4">
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Sending..." : "Resend verification email"}
      </Button>
    </form>
  );
} 