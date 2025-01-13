"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { AuthError } from "@/components/ui/auth/auth-error";
import { registerSchema } from "@/lib/validations/auth";
import { useAuthToast } from "@/hooks/use-auth-toast";
import type { AuthError as AuthErrorType } from "@/types";

interface RegisterFormData {
  email: string;
  password: string;
  name?: string;
}

export function RegisterForm() {
  const router = useRouter();
  const authToast = useAuthToast();
  const [error, setError] = useState<AuthErrorType | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      authToast.success(
        "Account created successfully",
        "Please sign in with your new account"
      );
      
      router.push("/login");
    } catch (error) {
      setError({
        message: error instanceof Error ? error.message : "Something went wrong",
      });
      authToast.error(
        "Registration failed",
        error instanceof Error ? error.message : "Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <AuthError message={error?.message} />
      
      <FormInput
        placeholder="Name"
        {...form.register("name")}
        disabled={loading}
        error={form.formState.errors.name?.message}
      />
      <FormInput
        type="email"
        placeholder="Email"
        {...form.register("email")}
        disabled={loading}
        error={form.formState.errors.email?.message}
      />
      <FormInput
        type="password"
        placeholder="Password"
        {...form.register("password")}
        disabled={loading}
        error={form.formState.errors.password?.message}
      />
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
} 