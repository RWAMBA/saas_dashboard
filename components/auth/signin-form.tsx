"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthToast } from "@/hooks/use-auth-toast";
import Link from "next/link";

export function SignInForm() {
  const router = useRouter();
  const authToast = useAuthToast();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (response?.error) {
        if (response.error === "Please verify your email before signing in") {
          authToast.error(
            "Email not verified",
            "Please check your email for the verification link"
          );
        } else {
          authToast.error(
            "Authentication failed",
            "Please check your credentials and try again"
          );
        }
        return;
      }

      authToast.success(
        "Welcome back!",
        "You have successfully signed in"
      );
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      authToast.error(
        "Authentication failed",
        "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        type="email"
        name="email"
        placeholder="Email"
        required
        disabled={loading}
      />
      <div className="space-y-2">
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
          disabled={loading}
        />
        <div className="text-sm text-right">
          <Link 
            href="/forgot-password" 
            className="text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        disabled={loading}
      >
        Continue with Google
      </Button>
      <div className="text-center text-sm">
        <Link 
          href="/resend-verification" 
          className="text-primary hover:underline"
        >
          Didn't receive verification email?
        </Link>
      </div>
    </form>
  );
} 