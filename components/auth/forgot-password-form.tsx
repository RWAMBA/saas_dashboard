"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import { useAuthToast } from "@/hooks/use-auth-toast";

type ForgotPasswordData = {
  email: string;
};

export function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const authToast = useAuthToast();

  const form = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    try {
      setLoading(true);
      console.log("Submitting forgot password form:", data); // Debug log

      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Forgot password response:", result); // Debug log

      if (!response.ok) {
        throw new Error(result.error || "Failed to send reset email");
      }

      authToast.success(
        "Check your email",
        "If an account exists, you will receive a reset link"
      );
    } catch (error) {
      console.error("Forgot password error:", error); // Debug log
      authToast.error(
        "Error",
        "Failed to send reset email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormInput
        type="email"
        placeholder="Enter your email"
        {...form.register("email")}
        disabled={loading}
        error={form.formState.errors.email?.message}
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Sending reset link..." : "Send reset link"}
      </Button>
    </form>
  );
} 