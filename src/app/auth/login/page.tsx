"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LogIn, Info } from "lucide-react";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthAlert } from "@/components/auth/AuthAlert";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { AuthError } from "@/services/authService";
import { zodResolver } from "@/lib/zodResolver";
import { loginSchema, LoginFormValues } from "@/lib/authValidation";
import { DEMO_PASSWORD, MOCK_USERS } from "@/lib/mockUsers";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const [loginSucceeded, setLoginSucceeded] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    try {
      await login(values);
      setLoginSucceeded(true);
      router.push("/dashboard");
    } catch (err) {
      setFormError(err instanceof AuthError ? err.message : "Something went wrong. Please try again.");
    }
  });

  return (
    <div className="space-y-6">
      <AuthHeader title="Welcome back" subtitle="Sign in to manage your Revolga Biogenics workspace." />

      {formError && <AuthAlert variant="error">{formError}</AuthAlert>}
      {loginSucceeded && <AuthAlert variant="success">Login successful — redirecting to your dashboard…</AuthAlert>}

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <PasswordInput
          label="Password"
          autoComplete="current-password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer">
            <input type="checkbox" className="rounded border-slate-300" {...register("rememberMe")} />
            Remember me
          </label>
          <Link href="/auth/forgot-password" className="text-xs font-semibold text-blue-600 hover:text-blue-800">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full gap-2" isLoading={isSubmitting}>
          {!isSubmitting && <LogIn className="w-4 h-4" />}
          Login
        </Button>
      </form>

      <p className="text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="font-semibold text-blue-600 hover:text-blue-800">
          Create account
        </Link>
      </p>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-[11px] text-slate-500 space-y-1.5">
        <p className="flex items-center gap-1.5 font-semibold text-slate-600">
          <Info className="w-3.5 h-3.5" /> Demo accounts (frontend testing only)
        </p>
        {MOCK_USERS.map((u) => (
          <p key={u.id} className="font-mono">
            {u.role}: {u.email}
          </p>
        ))}
        <p className="font-mono">password: {DEMO_PASSWORD}</p>
      </div>
    </div>
  );
}
