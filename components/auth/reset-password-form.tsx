"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { resetPasswordSchema } from "@/lib/validations/auth";
import { useAuthToast } from "@/hooks/use-auth-toast";
import { useRouter, useSearchParams } from "next/navigation";

type ResetPasswordData = {
  password: string;
  confirmPassword: string;
};

export function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const authToast = useAuthToast();

  console.log("Reset token:", token); // Debug log

  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordData) => {
    if (!token) {
      authToast.error(
        "Invalid request",
        "Missing reset token"
      );
      return;
    }

    try {
      setLoading(true);
      console.log("Submitting reset password:", { token, password: data.password }); // Debug log

      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password: data.password,
        }),
      });

      const result = await response.json();
      console.log("Reset password response:", result); // Debug log

      if (!response.ok) {
        throw new Error(result.error || "Failed to reset password");
      }

      authToast.success(
        "Password updated",
        "You can now sign in with your new password"
      );
      router.push("/login");
    } catch (error) {
      console.error("Reset password error:", error);
      authToast.error(
        "Error",
        error instanceof Error ? error.message : "Failed to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormInput
        type="password"
        placeholder="New password"
        {...form.register("password")}
        disabled={loading}
        error={form.formState.errors.password?.message}
      />
      <FormInput
        type="password"
        placeholder="Confirm new password"
        {...form.register("confirmPassword")}
        disabled={loading}
        error={form.formState.errors.confirmPassword?.message}
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Updating password..." : "Update password"}
      </Button>
    </form>
  );
} 