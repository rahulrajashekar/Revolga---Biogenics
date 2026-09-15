import { z } from "zod";

// ─── AUTH FORM VALIDATION ───────────────────────────────────────────────────
// Validation schemas for the Authentication UI. Password rules here are
// UI-level guidance only (paired with the strength meter) — real password
// policy enforcement belongs server-side once real auth exists.

const emailField = z.string().trim().min(1, "Email is required").email("Enter a valid email address");

const passwordField = z
  .string()
  .min(1, "Password is required")
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Za-z]/, "Password must include at least one letter")
  .regex(/[0-9]/, "Password must include at least one number");

const phoneField = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .refine((value) => !value || /^[+]?[\d\s-]{7,15}$/.test(value), {
    message: "Enter a valid phone number",
  });

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});
export type LoginFormValues = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    fullName: z.string().trim().min(2, "Full name must be at least 2 characters").max(100),
    email: emailField,
    phone: phoneField,
    password: passwordField,
    confirmPassword: z.string().min(1, "Please confirm your password"),
    companyName: z.string().trim().max(150).optional().or(z.literal("")),
    role: z.enum(["staff", "manager"], { error: "Select a role" }),
    termsAccepted: z.literal(true, { error: "You must accept the Terms & Conditions" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({ code: "custom", path: ["confirmPassword"], message: "Passwords do not match" });
    }
  });
export type SignupFormValues = z.infer<typeof signupSchema>;

export const forgotPasswordSchema = z.object({
  email: emailField,
});
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: passwordField,
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({ code: "custom", path: ["confirmPassword"], message: "Passwords do not match" });
    }
  });
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
