"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Check, ShieldCheck, Loader2 } from "lucide-react";
import { AuthBrandPanel, AuthMobileBrand } from "./AuthBrandPanel";
import { generateDemoCode } from "@/lib/generateDemoCode";

export type AuthMode = "login" | "signup" | "forgot";

// Demo-only credentials for this frontend-first rebuild — not a real
// account, not connected to any backend. Swap for real authentication later.
const DEMO_EMAIL = "admin@revolgabiogenics.com";
const DEMO_PASSWORD = "Revolga@2025";

const DEPARTMENTS = ["Sales", "Inventory & Warehouse", "Quality & Compliance", "Operations"];

const MODE_LABEL: Record<AuthMode, string> = { login: "LOGIN", signup: "SIGN UP", forgot: "RECOVERY" };

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const inputClass =
  "w-full h-[41px] text-[#d9e9f1] bg-[rgba(18,26,46,0.62)] border border-[rgba(0,240,255,0.17)] rounded-[6px] text-xs px-3 outline-none transition-all placeholder:text-[#5a6f85] focus:border-[rgba(0,240,255,0.7)] focus:shadow-[0_0_0_3px_rgba(0,240,255,0.08)] focus:bg-[rgba(18,26,46,0.9)]";

/**
 * Shared implementation behind /login, /signup and /forgot-password — one
 * component parameterized by `mode`, mirroring the reference design's own
 * structure. Entirely frontend-only: no network calls, a fixed demo
 * account, and a fake (but real, displayed) verification code for the
 * forgot-password flow.
 */
export function AuthScreen({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [demoCode, setDemoCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupSucceeded, setSignupSucceeded] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: DEPARTMENTS[0],
    code: "",
    newPassword: "",
  });

  const setField = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const isForgot = mode === "forgot";
  const codeSent = isForgot && Boolean(demoCode);

  const title =
    mode === "login"
      ? "Welcome back"
      : mode === "signup"
      ? "Create your access"
      : codeSent
      ? "Set a new password"
      : "Recover your access";

  const subtitle =
    mode === "login"
      ? "Sign in to your Revolga Biogenics workspace."
      : mode === "signup"
      ? "Join the Revolga Biogenics operations workspace."
      : codeSent
      ? "Enter the verification code and choose a new password."
      : "We'll send a verification code to your work email.";

  const fillDemo = () => {
    setField("email", DEMO_EMAIL);
    setField("password", DEMO_PASSWORD);
    setError("");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setNotice("");

    if (mode === "login") {
      if (!form.email.trim() || !isValidEmail(form.email)) return setError("Enter a valid email address.");
      if (!form.password) return setError("Password is required.");
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        if (form.email.trim().toLowerCase() === DEMO_EMAIL && form.password === DEMO_PASSWORD) {
          router.push("/dashboard");
        } else {
          setError("Invalid email or password. Try the demo credentials below.");
        }
      }, 700);
      return;
    }

    if (mode === "signup") {
      if (!form.name.trim()) return setError("Full name is required.");
      if (!form.email.trim() || !isValidEmail(form.email)) return setError("Enter a valid email address.");
      if (form.password.length < 8) return setError("Password must be at least 8 characters.");
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSignupSucceeded(true);
      }, 700);
      return;
    }

    // mode === "forgot"
    if (!codeSent) {
      if (!form.email.trim() || !isValidEmail(form.email)) return setError("Enter a valid email address.");
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        const code = generateDemoCode();
        setDemoCode(code);
        setNotice(`Password reset instructions have been sent. Demo code: ${code}`);
      }, 700);
      return;
    }

    if (!form.code.trim()) return setError("Enter the verification code.");
    if (form.code.trim() !== demoCode) return setError("Incorrect verification code.");
    if (form.newPassword.length < 8) return setError("New password must be at least 8 characters.");
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setResetComplete(true);
    }, 700);
  };

  const submitLabel = isSubmitting
    ? "PROCESSING..."
    : mode === "login"
    ? "ENTER WORKSPACE"
    : mode === "signup"
    ? "CREATE ACCOUNT"
    : codeSent
    ? "RESET PASSWORD"
    : "SEND RESET CODE";

  // Terminal success states replace the form entirely, matching how the
  // login/signup/reset flows were designed elsewhere in this rebuild:
  // there's nowhere real to redirect to yet, so show a clear result instead.
  const finished = (mode === "signup" && signupSucceeded) || (mode === "forgot" && resetComplete);

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#060911]" data-testid={`${mode}-page`}>
      <AuthBrandPanel />

      <section
        className="grid place-items-center px-4 py-10 sm:p-12"
        style={{ background: "radial-gradient(circle at 80% 12%, rgba(0,240,255,0.06), transparent 28%), #060911" }}
      >
        <div className="w-full max-w-[425px] font-[family-name:var(--font-jakarta)]">
          <AuthMobileBrand />

          {finished ? (
            <FinishedState mode={mode as Exclude<AuthMode, "login">} />
          ) : (
            <>
              <div className="mb-[22px]">
                <div className="flex items-center gap-2.5 text-[#00f0ff] text-[9px] tracking-[0.16em] font-[family-name:var(--font-mono-display)]">
                  <span className="w-[19px] h-px bg-[#00f0ff] shadow-[0_0_7px_#00f0ff]" />
                  SECURE ACCESS / {MODE_LABEL[mode]}
                </div>
                <h2 className="my-2 font-[family-name:var(--font-grotesk)] font-medium text-[34px] leading-[1.1] tracking-[-0.05em] text-[#f8fafc]">
                  {title}
                </h2>
                <p className="text-[#8193a7] text-xs leading-[1.6]">{subtitle}</p>
              </div>

              {!isForgot && (
                <div
                  data-testid="auth-trust-indicator"
                  className="flex items-center gap-2 text-[#70859a] border border-[rgba(0,240,255,0.13)] bg-[rgba(0,240,255,0.04)] px-3 py-2.5 text-[10px] my-[22px]"
                >
                  <ShieldCheck size={15} className="text-[#00ffaa] shrink-0" />
                  This is a demo workspace
                  <span className="ml-auto text-[#00ffaa] text-[8px] font-[family-name:var(--font-mono-display)]">DEMO</span>
                </div>
              )}

              {error && (
                <div
                  role="alert"
                  data-testid="auth-error-message"
                  className="text-[#ff8094] border border-[rgba(255,59,92,0.25)] bg-[rgba(255,59,92,0.08)] px-3 py-2.5 text-[10px] my-3"
                >
                  {error}
                </div>
              )}
              {notice && (
                <div
                  role="status"
                  data-testid="auth-notice-message"
                  className="flex items-center gap-1.5 text-[#00ffaa] border border-[rgba(0,255,170,0.22)] bg-[rgba(0,255,170,0.07)] px-3 py-2.5 text-[10px] my-3"
                >
                  <Check size={15} className="shrink-0" /> {notice}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate data-testid={`${mode}-form`} className="grid gap-[17px]">
                {mode === "signup" && (
                  <label className="grid gap-2 text-[#7c91a6] text-[9px] tracking-[0.09em] font-[family-name:var(--font-mono-display)]">
                    FULL NAME
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setField("name", e.target.value)}
                      placeholder="e.g. Anjali Menon"
                      autoComplete="name"
                      data-testid="signup-name-input"
                      className={inputClass}
                    />
                  </label>
                )}

                <label className="grid gap-2 text-[#7c91a6] text-[9px] tracking-[0.09em] font-[family-name:var(--font-mono-display)]">
                  WORK EMAIL
                  <div className="relative flex items-center">
                    <Mail size={16} className="absolute left-3 text-[#60778e] pointer-events-none" />
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setField("email", e.target.value)}
                      placeholder="name@revolgabiogenics.com"
                      autoComplete="email"
                      data-testid={`${mode}-email-input`}
                      className={`${inputClass} pl-9 pr-9`}
                    />
                  </div>
                </label>

                {mode === "signup" && (
                  <label className="grid gap-2 text-[#7c91a6] text-[9px] tracking-[0.09em] font-[family-name:var(--font-mono-display)]">
                    DEPARTMENT
                    <select
                      value={form.department}
                      onChange={(e) => setField("department", e.target.value)}
                      data-testid="signup-department-select"
                      className={inputClass}
                    >
                      {DEPARTMENTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </label>
                )}

                {isForgot && codeSent && (
                  <label className="grid gap-2 text-[#7c91a6] text-[9px] tracking-[0.09em] font-[family-name:var(--font-mono-display)]">
                    VERIFICATION CODE
                    <input
                      required
                      value={form.code}
                      onChange={(e) => setField("code", e.target.value)}
                      placeholder="6-digit code"
                      inputMode="numeric"
                      data-testid="forgot-code-input"
                      className={inputClass}
                    />
                  </label>
                )}

                {(!isForgot || codeSent) && (
                  <label className="grid gap-2 text-[#7c91a6] text-[9px] tracking-[0.09em] font-[family-name:var(--font-mono-display)]">
                    {isForgot ? "NEW PASSWORD" : "PASSWORD"}
                    <div className="relative flex items-center">
                      <Lock size={16} className="absolute left-3 text-[#60778e] pointer-events-none" />
                      <input
                        required
                        type={showPassword ? "text" : "password"}
                        minLength={8}
                        value={isForgot ? form.newPassword : form.password}
                        onChange={(e) => setField(isForgot ? "newPassword" : "password", e.target.value)}
                        placeholder="Minimum 8 characters"
                        autoComplete={mode === "signup" ? "new-password" : "current-password"}
                        data-testid={`${mode}-password-input`}
                        className={`${inputClass} pl-9 pr-9`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-2.5 text-[#64788e] hover:text-[#00f0ff] transition-colors cursor-pointer p-1"
                        aria-label="Toggle password visibility"
                        data-testid={`${mode}-password-visibility-button`}
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </label>
                )}

                {mode === "login" && (
                  <div className="flex justify-between items-center -mt-[3px]">
                    <label className="flex items-center gap-1.5 text-[#74889e] text-[10px] cursor-pointer">
                      <input type="checkbox" data-testid="login-remember-checkbox" className="accent-[#00f0ff]" />
                      Remember this device
                    </label>
                    <Link href="/forgot-password" data-testid="login-forgot-link" className="text-[#00f0ff] text-[10px] hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-testid={`${mode}-submit-button`}
                  className="w-full h-[43px] flex items-center justify-center gap-2 mt-[3px] bg-[#00f0ff] text-[#041016] font-[family-name:var(--font-mono-display)] font-semibold text-[10px] tracking-[0.08em] shadow-[0_0_21px_rgba(0,240,255,0.14)] transition-all hover:bg-[#7cffff] hover:shadow-[0_0_28px_rgba(0,240,255,0.3)] hover:-translate-y-px disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
                >
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : (
                    <>
                      {submitLabel} <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>

              {mode === "login" && (
                <button
                  type="button"
                  onClick={fillDemo}
                  data-testid="demo-login-button"
                  className="w-full flex justify-between items-center text-[#6f8498] bg-transparent border border-[rgba(0,240,255,0.14)] mt-3 p-3 text-[10px] cursor-pointer transition-colors hover:border-[rgba(0,240,255,0.45)] hover:text-[#a9bdc9]"
                >
                  <span className="text-[#00ffaa] text-[8px] font-[family-name:var(--font-mono-display)]">QUICK ACCESS</span>
                  <span className="flex items-center gap-1.5">
                    Use demo credentials <ArrowRight size={13} />
                  </span>
                </button>
              )}

              {mode === "login" ? (
                <p className="text-[#71859a] text-center text-[10px] my-6">
                  New to Revolga Biogenics?{" "}
                  <Link href="/signup" data-testid="login-signup-link" className="text-[#00f0ff] hover:underline">
                    Create account
                  </Link>
                </p>
              ) : mode === "signup" ? (
                <p className="text-[#71859a] text-center text-[10px] my-6">
                  Already have access?{" "}
                  <Link href="/login" data-testid="signup-login-link" className="text-[#00f0ff] hover:underline">
                    Sign in
                  </Link>
                </p>
              ) : (
                <p className="text-[#71859a] text-center text-[10px] my-6">
                  <Link href="/login" data-testid="forgot-login-link" className="text-[#00f0ff] hover:underline">
                    Return to sign in
                  </Link>
                </p>
              )}

              <div className="border-t border-[rgba(0,240,255,0.11)] pt-4 flex justify-center gap-4 text-[#50647a] text-[8px] font-[family-name:var(--font-mono-display)]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-[#00f0ff]" /> DEMO ENVIRONMENT
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock size={12} className="text-[#00f0ff]" /> NO REAL DATA STORED
                </span>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function FinishedState({ mode }: { mode: Exclude<AuthMode, "login"> }) {
  const message =
    mode === "signup"
      ? "Your demo account request has been recorded. No real account was created — sign in with the demo credentials on the login page instead."
      : "Your password has been reset successfully. (This is a frontend-only demo — no real password was changed.)";

  return (
    <div>
      <div
        role="status"
        className="flex items-start gap-2 text-[#00ffaa] border border-[rgba(0,255,170,0.22)] bg-[rgba(0,255,170,0.07)] px-3.5 py-3 text-xs leading-relaxed"
      >
        <Check size={16} className="mt-0.5 shrink-0" /> {message}
      </div>
      <Link
        href="/login"
        className="mt-5 w-full h-[43px] flex items-center justify-center gap-2 bg-[#00f0ff] text-[#041016] font-[family-name:var(--font-mono-display)] font-semibold text-[10px] tracking-[0.08em] shadow-[0_0_21px_rgba(0,240,255,0.14)] transition-all hover:bg-[#7cffff]"
      >
        RETURN TO LOGIN <ArrowRight size={16} />
      </Link>
    </div>
  );
}
