"use client";

import React, { createContext, useContext, useCallback, useEffect, useState } from "react";
import { authService, AuthSession, LoginInput, SignupInput } from "@/services/authService";

interface AuthContextType {
  user: AuthSession | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (input: LoginInput) => Promise<AuthSession>;
  signup: (input: SignupInput) => Promise<AuthSession>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Frontend-only mock auth session provider. Purely for driving the
 * Authentication UI (e.g. showing a logout action once "logged in") — it is
 * not a route guard and enforces no real authorization.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthSession | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    setUser(authService.getSession());
    setIsInitializing(false);
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    const session = await authService.login(input);
    setUser(session);
    return session;
  }, []);

  const signup = useCallback(async (input: SignupInput) => {
    return authService.signup(input);
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user), isInitializing, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
