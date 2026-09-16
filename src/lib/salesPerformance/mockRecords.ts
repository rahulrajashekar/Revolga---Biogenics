// ─── SALES PERFORMANCE — GENERATED MONTHLY RECORDS ────────────────────────
// Generates the raw monthly sales-activity records an Excel upload would
// eventually produce (target, actual sales, orders, visits, collection...)
// for every active employee across the reporting window. Generated once
// with a fixed seed so the numbers are stable across renders/reloads.
//
// DEMO DATA ONLY — targets, sales figures and achievement outcomes below
// are fictional and do not reflect real Revolga Biogenics performance.

import { MonthlyEmployeeRecord, Product, ProductPerformanceRow } from "./types";
import { PRODUCTS, REPORTING_MONTHS, SALES_EMPLOYEES, activeSalesEmployees } from "./mockCore";
import { mulberry32, randFloat, randInt } from "./seededRandom";

// Baseline monthly target (₹) by designation — sets the scale of each
// employee's numbers before the per-employee/per-month variance is applied.
const DESIGNATION_BASE_TARGET: Record<string, number> = {
  "Territory Sales Executive": 280000,
  "Medical Representative": 220000,
  "Business Development Executive": 240000,
  "Key Account Manager": 420000,
  "Regional Sales Manager": 650000,
  "National Sales Head": 900000,
};

function seedFor(employeeId: string, month: string): number {
  let hash = 0;
  const str = `${employeeId}:${month}`;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  return hash;
}

function buildEmployeeRecords(): MonthlyEmployeeRecord[] {
  const records: MonthlyEmployeeRecord[] = [];

  for (const employee of activeSalesEmployees()) {
    const baseTarget = DESIGNATION_BASE_TARGET[employee.designation] ?? 250000;

    REPORTING_MONTHS.forEach((month, monthIndex) => {
      const rnd = mulberry32(seedFor(employee.id, month));

      // Gentle upward trend across the six months plus per-month noise, so
      // achievement% varies enough to populate every status bucket.
      const trend = 1 + monthIndex * 0.015;
      const noise = randFloat(rnd, 0.72, 1.22);
      const target = Math.round((baseTarget * trend) / 1000) * 1000;
      const actualSales = Math.round((target * noise) / 500) * 500;

      const orderValueAvg = randInt(rnd, 3200, 6800);
      const orders = Math.max(6, Math.round(actualSales / orderValueAvg));

      const collectionTarget = Math.round(target * 0.9);
      const collectionEfficiency = randFloat(rnd, 0.65, 1.05);
      const collectionActual = Math.round(collectionTarget * collectionEfficiency);

      const newCustomers = randInt(rnd, 1, 9);
      const workingDays = randInt(rnd, 22, 26);
      const customerVisits = randInt(rnd, 60, 140);
      const newCustomerVisits = Math.min(customerVisits, newCustomers + randInt(rnd, 2, 10));
      const followUps = randInt(rnd, 20, 70);
      const productPresentations = randInt(rnd, 15, 55);

      records.push({
        employeeId: employee.id,
        month,
        target,
        actualSales,
        orders,
        newCustomers,
        collectionTarget,
        collectionActual,
        customerVisits,
        newCustomerVisits,
        followUps,
        productPresentations,
        workingDays,
      });
    });
  }

  return records;
}

export const MONTHLY_EMPLOYEE_RECORDS: MonthlyEmployeeRecord[] = buildEmployeeRecords();

export function recordsForEmployee(employeeId: string): MonthlyEmployeeRecord[] {
  return MONTHLY_EMPLOYEE_RECORDS.filter((r) => r.employeeId === employeeId);
}

export function recordFor(employeeId: string, month: string): MonthlyEmployeeRecord | undefined {
  return MONTHLY_EMPLOYEE_RECORDS.find((r) => r.employeeId === employeeId && r.month === month);
}

export function recordsForMonth(month: string): MonthlyEmployeeRecord[] {
  return MONTHLY_EMPLOYEE_RECORDS.filter((r) => r.month === month);
}

// ─── PRODUCT PERFORMANCE ───────────────────────────────────────────────────

const CATEGORY_NAME: Record<string, string> = {
  "CAT-PHARMA": "Pharmaceutical",
  "CAT-DEVICE": "Medical Devices",
  "CAT-SURGICAL": "Surgical Supplies",
  "CAT-WELLNESS": "Healthcare & Wellness",
};

function buildProductPerformance(product: Product, month: string, monthIndex: number): ProductPerformanceRow {
  const rnd = mulberry32(seedFor(product.id, month));
  const baseUnits = Math.round(1800 / (product.unitPrice / 150));
  const trend = 1 + monthIndex * 0.02;
  const noise = randFloat(rnd, 0.7, 1.3);
  const unitsSold = Math.max(20, Math.round(baseUnits * trend * noise));
  const salesAmount = unitsSold * product.unitPrice;
  const target = Math.round(baseUnits * trend * product.unitPrice * 0.95);
  const achievementPercent = Math.round((salesAmount / target) * 1000) / 10;

  const rndPrev = mulberry32(seedFor(product.id, REPORTING_MONTHS[Math.max(0, monthIndex - 1)]));
  const prevNoise = randFloat(rndPrev, 0.7, 1.3);
  const prevUnits = Math.max(20, Math.round(baseUnits * (1 + Math.max(0, monthIndex - 1) * 0.02) * prevNoise));
  const prevSales = prevUnits * product.unitPrice;
  const growthPercent = monthIndex === 0 ? 0 : Math.round(((salesAmount - prevSales) / prevSales) * 1000) / 10;

  return {
    productId: product.id,
    productName: product.name,
    categoryId: product.categoryId,
    categoryName: CATEGORY_NAME[product.categoryId] ?? product.categoryId,
    unitsSold,
    salesAmount,
    target,
    achievementPercent,
    growthPercent,
  };
}

export const PRODUCT_PERFORMANCE: ProductPerformanceRow[] = REPORTING_MONTHS.flatMap((month, monthIndex) =>
  PRODUCTS.map((product) => buildProductPerformance(product, month, monthIndex))
);

export function productPerformanceByMonth(month: string): ProductPerformanceRow[] {
  const monthIndex = REPORTING_MONTHS.indexOf(month as (typeof REPORTING_MONTHS)[number]);
  if (monthIndex < 0) return [];
  return PRODUCTS.map((product) => buildProductPerformance(product, month, monthIndex));
}

export { SALES_EMPLOYEES };
