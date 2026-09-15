import { MOCK_USERS, MockUser, UserRole } from "@/lib/mockUsers";

// ─── MOCK AUTH SERVICE ─────────────────────────────────────────────────────
// Frontend-only authentication simulation. Every method here resolves like a
// real API call would (latency + success/failure), so swapping this file's
// internals for real `fetch` calls to a backend later shouldn't require any
// changes to the UI. Nothing here is a security boundary:
//  - No password hashing (demo passwords are compared as plain strings)
//  - No real session tokens — the "session" is just a non-sensitive profile
//    object cached in localStorage so a refresh doesn't log the demo user out
//  - No password reset tokens — forgot/reset password are UI-only no-ops

const SIMULATED_LATENCY_MS = 500;
const SESSION_STORAGE_KEY = "revolga_mock_session";

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS));
}

export class AuthError extends Error {}

/** What we persist for a "logged in" demo session — profile only, never a password or token. */
export interface AuthSession {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  companyName: string;
  loggedInAt: string;
}

export interface LoginInput {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupInput {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
  companyName?: string;
  role: Exclude<UserRole, "admin">;
}

// In-memory copy so signups during this session can "log in" afterwards.
// Resets on page reload — this is demo data, not a real user store.
const users: MockUser[] = [...MOCK_USERS];

function toSession(user: MockUser): AuthSession {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    companyName: user.companyName,
    loggedInAt: new Date().toISOString(),
  };
}

function readSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthSession) : null;
  } catch {
    return null;
  }
}

function writeSession(session: AuthSession | null) {
  if (typeof window === "undefined") return;
  try {
    if (session) {
      window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    } else {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  } catch {
    /* ignore storage failures (private browsing, quota, etc.) */
  }
}

export const authService = {
  async login({ email, password }: LoginInput): Promise<AuthSession> {
    const user = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user || user.demoPassword !== password) {
      return delay(null).then(() => {
        throw new AuthError("Invalid email or password. Please try again.");
      });
    }
    const session = toSession(user);
    return delay(session).then((s) => {
      writeSession(s);
      return s;
    });
  },

  async signup(input: SignupInput): Promise<AuthSession> {
    const exists = users.some((u) => u.email.toLowerCase() === input.email.trim().toLowerCase());
    if (exists) {
      return delay(null).then(() => {
        throw new AuthError("An account with this email already exists.");
      });
    }
    const newUser: MockUser = {
      id: `USR-${Date.now()}`,
      fullName: input.fullName.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone,
      companyName: input.companyName?.trim() || "Revolga Biogenics",
      role: input.role,
      demoPassword: input.password,
    };
    users.push(newUser);
    // Signup only creates the demo account here — it does NOT auto-login,
    // matching the requirement to show a success message with a link to Login.
    return delay(toSession(newUser));
  },

  async logout(): Promise<void> {
    writeSession(null);
    return delay(undefined);
  },

  /** Always resolves the same way regardless of whether the email exists — avoids leaking account existence, mirroring real-world UX. */
  async requestPasswordReset(email: string): Promise<{ message: string }> {
    void email; // a real backend would use this to look up the account; the mock intentionally ignores it
    return delay({ message: "Password reset instructions have been sent." });
  },

  /** No real reset token in this mock — simulates the "user followed the emailed link" step. */
  async resetPassword(newPassword: string): Promise<{ message: string }> {
    void newPassword; // a real backend would persist this; the mock intentionally ignores it
    return delay({ message: "Your password has been reset successfully." });
  },

  getSession(): AuthSession | null {
    return readSession();
  },
};
