"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ArrowLeft, Send } from "lucide-react";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthAlert } from "@/components/auth/AuthAlert";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { authService, AuthError } from "@/services/authService";
import { zodResolver } from "@/lib/zodResolver";
import { forgotPasswordSchema, ForgotPasswordFormValues } from "@/lib/authValidation";

export default function ForgotPasswordPage() {
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    try {
      await authService.requestPasswordReset(values.email);
      setSubmittedEmail(values.email);
    } catch (err) {
      setFormError(err instanceof AuthError ? err.message : "Something went wrong. Please try again.");
    }
  });

  if (submittedEmail) {
    return (
      <div className="space-y-6">
        <AuthHeader title="Check your email" />
        <AuthAlert variant="success">
          <p className="font-semibold">Password reset instructions have been sent.</p>
          <p className="mt-1 text-emerald-700">
            If an account exists for {submittedEmail}, instructions to reset the password have been sent. This is a
            frontend-only demo — no real email was sent.
          </p>
        </AuthAlert>
        <Link href="/auth/login">
          <Button variant="outline" className="w-full gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AuthHeader title="Forgot your password?" subtitle="Enter your account email and we'll send you reset instructions." />

      {formError && <AuthAlert variant="error">{formError}</AuthAlert>}

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <Button type="submit" className="w-full gap-2" isLoading={isSubmitting}>
          {!isSubmitting && <Send className="w-4 h-4" />}
          Send Reset Link
        </Button>
      </form>

      <p className="text-center text-sm text-slate-500">
        <Link href="/auth/login" className="inline-flex items-center gap-1.5 font-semibold text-blue-600 hover:text-blue-800">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to login
        </Link>
      </p>
    </div>
  );
}
