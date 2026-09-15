"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { KeyRound, ArrowLeft } from "lucide-react";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthAlert } from "@/components/auth/AuthAlert";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { PasswordStrengthMeter } from "@/components/auth/PasswordStrengthMeter";
import { Button } from "@/components/ui/Button";
import { authService, AuthError } from "@/services/authService";
import { zodResolver } from "@/lib/zodResolver";
import { resetPasswordSchema, ResetPasswordFormValues } from "@/lib/authValidation";

export default function ResetPasswordPage() {
  const [formError, setFormError] = useState<string | null>(null);
  const [resetDone, setResetDone] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const password = useWatch({ control, name: "password" });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    try {
      await authService.resetPassword(values.password);
      setResetDone(true);
    } catch (err) {
      setFormError(err instanceof AuthError ? err.message : "Something went wrong. Please try again.");
    }
  });

  if (resetDone) {
    return (
      <div className="space-y-6">
        <AuthHeader title="Password reset" />
        <AuthAlert variant="success">
          <p className="font-semibold">Your password has been reset successfully.</p>
          <p className="mt-1 text-emerald-700">This is a frontend-only demo — no real password was changed.</p>
        </AuthAlert>
        <Link href="/auth/login">
          <Button className="w-full gap-2">
            <ArrowLeft className="w-4 h-4" /> Return to Login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AuthHeader title="Set a new password" subtitle="Choose a strong password for your account." />

      {formError && <AuthAlert variant="error">{formError}</AuthAlert>}

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div>
          <PasswordInput
            label="New Password"
            autoComplete="new-password"
            placeholder="Enter a new password"
            error={errors.password?.message}
            {...register("password")}
          />
          <div className="mt-2">
            <PasswordStrengthMeter password={password || ""} />
          </div>
        </div>

        <PasswordInput
          label="Confirm New Password"
          autoComplete="new-password"
          placeholder="Re-enter your new password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button type="submit" className="w-full gap-2" isLoading={isSubmitting}>
          {!isSubmitting && <KeyRound className="w-4 h-4" />}
          Reset Password
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
