"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { UserPlus, CheckCircle2 } from "lucide-react";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthAlert } from "@/components/auth/AuthAlert";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { PasswordStrengthMeter } from "@/components/auth/PasswordStrengthMeter";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { AuthError } from "@/services/authService";
import { zodResolver } from "@/lib/zodResolver";
import { signupSchema, SignupFormValues } from "@/lib/authValidation";

const ROLE_OPTIONS = [
  { value: "staff", label: "Staff" },
  { value: "manager", label: "Manager" },
];

export default function SignupPage() {
  const { signup } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const [createdEmail, setCreatedEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      role: "staff",
      termsAccepted: false as unknown as true,
    },
  });

  const password = useWatch({ control, name: "password" });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    try {
      const session = await signup(values);
      setCreatedEmail(session.email);
    } catch (err) {
      setFormError(err instanceof AuthError ? err.message : "Something went wrong. Please try again.");
    }
  });

  if (createdEmail) {
    return (
      <div className="space-y-6">
        <AuthHeader title="Account created" />
        <AuthAlert variant="success">
          <p className="font-semibold">Your demo account has been created.</p>
          <p className="mt-1 text-emerald-700">
            {createdEmail} is ready to sign in. This is a frontend-only demo — no real account or email was created.
          </p>
        </AuthAlert>
        <Link href="/auth/login">
          <Button className="w-full gap-2">
            <CheckCircle2 className="w-4 h-4" /> Go to Login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AuthHeader title="Create your account" subtitle="Set up staff or manager access to Revolga Biogenics." />

      {formError && <AuthAlert variant="error">{formError}</AuthAlert>}

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <Input label="Full Name *" autoComplete="name" placeholder="Jane Doe" error={errors.fullName?.message} {...register("fullName")} />
        <Input label="Email *" type="email" autoComplete="email" placeholder="you@company.com" error={errors.email?.message} {...register("email")} />
        <Input label="Phone" type="tel" autoComplete="tel" placeholder="+91 90000 00000" error={errors.phone?.message} {...register("phone")} />

        <div>
          <PasswordInput
            label="Password *"
            autoComplete="new-password"
            placeholder="Create a password"
            error={errors.password?.message}
            {...register("password")}
          />
          <div className="mt-2">
            <PasswordStrengthMeter password={password || ""} />
          </div>
        </div>

        <PasswordInput
          label="Confirm Password *"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Company Name" autoComplete="organization" placeholder="Revolga Biogenics" error={errors.companyName?.message} {...register("companyName")} />
          <Select label="Role *" options={ROLE_OPTIONS} error={errors.role?.message} {...register("role")} />
        </div>
        <p className="text-[11px] text-slate-400 -mt-2">Admin access is granted internally and can&apos;t be self-registered.</p>

        <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
          <input type="checkbox" className="mt-0.5 rounded border-slate-300" {...register("termsAccepted")} />
          <span>
            I agree to the Terms &amp; Conditions and Privacy Policy.
            {errors.termsAccepted?.message && <span className="block text-rose-600 font-medium mt-0.5">{errors.termsAccepted.message}</span>}
          </span>
        </label>

        <Button type="submit" className="w-full gap-2" isLoading={isSubmitting}>
          {!isSubmitting && <UserPlus className="w-4 h-4" />}
          Create Account
        </Button>
      </form>

      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/auth/login" className="font-semibold text-blue-600 hover:text-blue-800">
          Login
        </Link>
      </p>
    </div>
  );
}
