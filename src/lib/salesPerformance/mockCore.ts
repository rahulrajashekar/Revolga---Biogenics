// ─── SALES PERFORMANCE — MOCK REFERENCE DATA ──────────────────────────────
// Employees, territories, products and the reporting month range for the
// Sales Employee Performance demo. Isolated from the rest of the app's mock
// data (see `src/lib/mockEmployees.ts`, used by the separate `/performance`
// module) so the two features can evolve independently.
//
// All names, territories, salaries and targets below are FICTIONAL DEMO
// DATA for the client walkthrough — they are not Revolga Biogenics' real
// employees, org structure or compensation figures.

import { Product, ProductCategory, SalesEmployee, Territory } from "./types";

export const REPORTING_MONTHS = ["2026-04", "2026-05", "2026-06", "2026-07", "2026-08", "2026-09"] as const;

export function monthLabel(month: string): string {
  const [year, mo] = month.split("-").map(Number);
  return new Date(year, mo - 1, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function monthShortLabel(month: string): string {
  const [year, mo] = month.split("-").map(Number);
  return new Date(year, mo - 1, 1).toLocaleDateString("en-US", { month: "short" });
}

export const CURRENT_MONTH = REPORTING_MONTHS[REPORTING_MONTHS.length - 1];

export const TERRITORIES: Territory[] = [
  { id: "TER-KOC", name: "Kochi" },
  { id: "TER-ALP", name: "Alappuzha" },
  { id: "TER-KOL", name: "Kollam" },
  { id: "TER-KTM", name: "Kottayam" },
  { id: "TER-TSR", name: "Thrissur" },
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { id: "CAT-PHARMA", name: "Pharmaceutical" },
  { id: "CAT-DEVICE", name: "Medical Devices" },
  { id: "CAT-SURGICAL", name: "Surgical Supplies" },
  { id: "CAT-WELLNESS", name: "Healthcare & Wellness" },
];

export const PRODUCTS: Product[] = [
  { id: "PRD-001", name: "BioCef-500 Tablets", categoryId: "CAT-PHARMA", unitPrice: 185 },
  { id: "PRD-002", name: "Revoflam Gel", categoryId: "CAT-PHARMA", unitPrice: 95 },
  { id: "PRD-003", name: "Cardiozen Capsules", categoryId: "CAT-PHARMA", unitPrice: 320 },
  { id: "PRD-004", name: "Digital BP Monitor", categoryId: "CAT-DEVICE", unitPrice: 1450 },
  { id: "PRD-005", name: "Pulse Oximeter Pro", categoryId: "CAT-DEVICE", unitPrice: 890 },
  { id: "PRD-006", name: "Nebulizer Compact", categoryId: "CAT-DEVICE", unitPrice: 2100 },
  { id: "PRD-007", name: "Surgical Gloves (Box)", categoryId: "CAT-SURGICAL", unitPrice: 340 },
  { id: "PRD-008", name: "Sterile Dressing Kit", categoryId: "CAT-SURGICAL", unitPrice: 210 },
  { id: "PRD-009", name: "ImmunoBoost Syrup", categoryId: "CAT-WELLNESS", unitPrice: 165 },
  { id: "PRD-010", name: "OrthoCare Support Belt", categoryId: "CAT-WELLNESS", unitPrice: 480 },
];

export const SALES_EMPLOYEES: SalesEmployee[] = [
  { id: "EMP-101", employeeCode: "RB-S101", fullName: "Arjun Menon", designation: "Territory Sales Executive", territoryId: "TER-KOC", managerId: "EMP-108", joiningDate: "2023-06-12", status: "active", basicSalary: 32000, allowances: 6000, photoInitials: "AM" },
  { id: "EMP-102", employeeCode: "RB-S102", fullName: "Divya Pillai", designation: "Regional Sales Manager", territoryId: "TER-KOC", managerId: null, joiningDate: "2021-02-01", status: "active", basicSalary: 55000, allowances: 12000, photoInitials: "DP" },
  { id: "EMP-103", employeeCode: "RB-S103", fullName: "Nikhil Varghese", designation: "Medical Representative", territoryId: "TER-ALP", managerId: "EMP-108", joiningDate: "2024-01-15", status: "active", basicSalary: 28000, allowances: 5000, photoInitials: "NV" },
  { id: "EMP-104", employeeCode: "RB-S104", fullName: "Sreelakshmi Nair", designation: "Medical Representative", territoryId: "TER-KOL", managerId: "EMP-108", joiningDate: "2023-09-04", status: "active", basicSalary: 28000, allowances: 5000, photoInitials: "SN" },
  { id: "EMP-105", employeeCode: "RB-S105", fullName: "Thomas Abraham", designation: "Key Account Manager", territoryId: "TER-KTM", managerId: "EMP-108", joiningDate: "2022-05-20", status: "active", basicSalary: 42000, allowances: 8000, photoInitials: "TA" },
  { id: "EMP-106", employeeCode: "RB-S106", fullName: "Fathima Rasheed", designation: "Territory Sales Executive", territoryId: "TER-TSR", managerId: "EMP-108", joiningDate: "2023-11-11", status: "active", basicSalary: 32000, allowances: 6000, photoInitials: "FR" },
  { id: "EMP-107", employeeCode: "RB-S107", fullName: "Vishnu Prasad", designation: "Business Development Executive", territoryId: "TER-ALP", managerId: "EMP-108", joiningDate: "2024-03-18", status: "active", basicSalary: 30000, allowances: 5500, photoInitials: "VP" },
  { id: "EMP-108", employeeCode: "RB-S108", fullName: "Rahul Krishnan", designation: "National Sales Head", territoryId: "TER-KOC", managerId: null, joiningDate: "2020-07-01", status: "active", basicSalary: 68000, allowances: 15000, photoInitials: "RK" },
  { id: "EMP-109", employeeCode: "RB-S109", fullName: "Anjali Krishnan", designation: "Medical Representative", territoryId: "TER-KTM", managerId: "EMP-105", joiningDate: "2022-08-09", status: "active", basicSalary: 28000, allowances: 5000, photoInitials: "AK" },
  { id: "EMP-110", employeeCode: "RB-S110", fullName: "Sanjay Kumar", designation: "Territory Sales Executive", territoryId: "TER-TSR", managerId: "EMP-108", joiningDate: "2024-05-27", status: "active", basicSalary: 32000, allowances: 6000, photoInitials: "SK" },
  { id: "EMP-111", employeeCode: "RB-S111", fullName: "Meera Suresh", designation: "Medical Representative", territoryId: "TER-KOL", managerId: "EMP-108", joiningDate: "2023-02-14", status: "active", basicSalary: 28000, allowances: 5000, photoInitials: "MS" },
  { id: "EMP-112", employeeCode: "RB-S112", fullName: "George Mathew", designation: "Business Development Executive", territoryId: "TER-KOC", managerId: "EMP-102", joiningDate: "2021-10-30", status: "inactive", basicSalary: 30000, allowances: 5500, photoInitials: "GM" },
];

export function activeSalesEmployees(): SalesEmployee[] {
  return SALES_EMPLOYEES.filter((e) => e.status === "active");
}

export function getEmployee(id: string): SalesEmployee | undefined {
  return SALES_EMPLOYEES.find((e) => e.id === id);
}

export function getTerritory(id: string): Territory | undefined {
  return TERRITORIES.find((t) => t.id === id);
}

export function getManagerName(managerId: string | null): string {
  if (!managerId) return "—";
  return getEmployee(managerId)?.fullName ?? "—";
}
