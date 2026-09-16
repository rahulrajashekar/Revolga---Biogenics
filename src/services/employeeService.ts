import { MOCK_EMPLOYEES, Employee } from "@/lib/mockEmployees";

// ─── EMPLOYEE SERVICE ──────────────────────────────────────────────────────
// Thin async wrapper over the mock employee directory, mirroring the other
// `*Service` files in this project so the Performance module can later point
// at a real HR/employee API without UI changes.

const SIMULATED_LATENCY_MS = 250;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS));
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export const employeeService = {
  async getAll(): Promise<Employee[]> {
    return delay([...MOCK_EMPLOYEES]);
  },

  async getActive(): Promise<Employee[]> {
    return delay(MOCK_EMPLOYEES.filter((e) => e.status === "active"));
  },

  async getById(id: string): Promise<Employee | undefined> {
    return delay(MOCK_EMPLOYEES.find((e) => e.id === id));
  },

  /** Matches by employee code first (exact, case-insensitive), then by full name. */
  findByCodeOrName(value: string): Employee | undefined {
    const needle = normalize(value);
    if (!needle) return undefined;
    return (
      MOCK_EMPLOYEES.find((e) => normalize(e.employeeCode) === needle) ||
      MOCK_EMPLOYEES.find((e) => normalize(e.fullName) === needle)
    );
  },
};
