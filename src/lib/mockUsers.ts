// ─── MOCK USERS (AUTH DEMO DATA) ───────────────────────────────────────────
// Frontend-only demo accounts for exercising the Authentication UI before
// real authentication exists. These are NOT real credentials, NOT connected
// to any backend, and NOT to be treated as secrets — everything here is
// fictional and safe to have in source control.
//
// This file is intentionally isolated from `mockData.ts` (the business/
// catalog mock data) since authentication is a separate concern that will
// be replaced by a real identity provider later.

export type UserRole = "admin" | "manager" | "staff";

export interface MockUser {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  companyName: string;
  role: UserRole;
  /** Demo-only password used to simulate login. Never a real credential. */
  demoPassword: string;
}

/** Shared demo password for every seeded account below — for demonstration only. */
export const DEMO_PASSWORD = "Demo@1234";

export const MOCK_USERS: MockUser[] = [
  {
    id: "USR-ADMIN-001",
    fullName: "Demo Admin",
    email: "admin@revolga-demo.local",
    phone: "+91 90000 00001",
    companyName: "Revolga Biogenics",
    role: "admin",
    demoPassword: DEMO_PASSWORD,
  },
  {
    id: "USR-MANAGER-001",
    fullName: "Demo Manager",
    email: "manager@revolga-demo.local",
    phone: "+91 90000 00002",
    companyName: "Revolga Biogenics",
    role: "manager",
    demoPassword: DEMO_PASSWORD,
  },
  {
    id: "USR-STAFF-001",
    fullName: "Demo Staff",
    email: "staff@revolga-demo.local",
    phone: "+91 90000 00003",
    companyName: "Revolga Biogenics",
    role: "staff",
    demoPassword: DEMO_PASSWORD,
  },
];
