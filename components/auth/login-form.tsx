"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { AuthError } from "@/components/ui/auth/auth-error";
import { loginSchema } from "@/lib/validations/auth";
import { useAuthToast } from "@/hooks/use-auth-toast";
import type { AuthError as AuthErrorType } from "@/types";

export function LoginForm() {
  const router = useRouter();
  const authToast = useAuthToast();
  const [error, setError] = useState<AuthErrorType | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setError(null);
      setLoading(true);

      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        setError({ message: "Invalid email or password" });
        authToast.error(
          "Authentication failed",
          "Please check your credentials and try again"
        );
        return;
      }

      authToast.success(
        "Welcome back!",
        "You have been successfully logged in"
      );
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      setError({
        message: error instanceof Error ? error.message : "Something went wrong",
      });
      authToast.error(
        "Login Error",
        "An unexpected error occurred. Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <AuthError message={error?.message} />
      
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
        {loading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
} 