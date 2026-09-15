// ─── PASSWORD STRENGTH HEURISTIC ───────────────────────────────────────────
// Frontend-only scoring used purely for UI feedback (Weak/Medium/Strong).
// Not a security control — real strength/breach checking belongs server-side
// once real authentication is implemented.

export type PasswordStrengthLevel = "empty" | "weak" | "medium" | "strong";

export interface PasswordStrengthResult {
  level: PasswordStrengthLevel;
  score: number; // 0-5
  label: string;
}

export function getPasswordStrength(password: string): PasswordStrengthResult {
  if (!password) return { level: "empty", score: 0, label: "" };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { level: "weak", score, label: "Weak" };
  if (score <= 3) return { level: "medium", score, label: "Medium" };
  return { level: "strong", score, label: "Strong" };
}
