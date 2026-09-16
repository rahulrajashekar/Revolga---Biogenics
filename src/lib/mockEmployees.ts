// ─── MOCK EMPLOYEES (PERFORMANCE & PAYROLL DEMO DATA) ─────────────────────
// Isolated mock directory used by the Performance & Incentives module.
// Fictional employees, salaries and incentive targets — not real payroll
// data. Structured so it can later be replaced by a real HR/employee API
// without changing the UI (see `employeeService`).

export interface Employee {
  id: string;
  employeeCode: string;
  fullName: string;
  designation: string;
  department: string;
  /** Fixed monthly base salary (₹). */
  baseSalary: number;
  /** Incentive payable at 100% target achievement (₹). */
  targetIncentiveAmount: number;
  status: "active" | "inactive";
}

export const MOCK_EMPLOYEES: Employee[] = [
  { id: "EMP001", employeeCode: "RB-E001", fullName: "Arjun Menon", designation: "Territory Sales Executive", department: "Sales", baseSalary: 32000, targetIncentiveAmount: 8000, status: "active" },
  { id: "EMP002", employeeCode: "RB-E002", fullName: "Divya Pillai", designation: "Regional Sales Manager", department: "Sales", baseSalary: 55000, targetIncentiveAmount: 15000, status: "active" },
  { id: "EMP003", employeeCode: "RB-E003", fullName: "Nikhil Varghese", designation: "Medical Representative", department: "Sales", baseSalary: 28000, targetIncentiveAmount: 6000, status: "active" },
  { id: "EMP004", employeeCode: "RB-E004", fullName: "Sreelakshmi Nair", designation: "Medical Representative", department: "Sales", baseSalary: 28000, targetIncentiveAmount: 6000, status: "active" },
  { id: "EMP005", employeeCode: "RB-E005", fullName: "Thomas Abraham", designation: "Key Account Manager", department: "Sales", baseSalary: 42000, targetIncentiveAmount: 10000, status: "active" },
  { id: "EMP006", employeeCode: "RB-E006", fullName: "Fathima Rasheed", designation: "Territory Sales Executive", department: "Sales", baseSalary: 32000, targetIncentiveAmount: 8000, status: "active" },
  { id: "EMP007", employeeCode: "RB-E007", fullName: "Vishnu Prasad", designation: "Business Development Executive", department: "Sales", baseSalary: 30000, targetIncentiveAmount: 7000, status: "active" },
  { id: "EMP008", employeeCode: "RB-E008", fullName: "Anjali Krishnan", designation: "Medical Representative", department: "Sales", baseSalary: 28000, targetIncentiveAmount: 6000, status: "inactive" },
];
