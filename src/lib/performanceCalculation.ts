import { Employee } from "@/lib/mockEmployees";

// ─── PERFORMANCE SALARY & INCENTIVE CALCULATION ───────────────────────────
// Pure, isolated calculation logic — no UI or I/O — so the formula can be
// reviewed/adjusted independently of the upload flow.
//
// Formula (linear % of target):
//   achievement % = achieved / target × 100
//   payout %      = achievement %, capped at MAX_PAYOUT_PERCENT for the
//                   money calculations below (the *displayed* achievement %
//                   is never capped, so genuine over-performance is still
//                   visible — only the payout multiplier is bounded)
//   performance salary = base salary        × (payout % / 100)
//   incentive          = target incentive   × (payout % / 100)
//   total payout       = performance salary + incentive
//
// These thresholds/caps are the one part of this feature that's a judgment
// call rather than something the user specified — adjust the constants
// below if the real policy differs.

/** Cap on the payout multiplier — prevents a bad data row (e.g. achievement entered as units instead of %) from producing a runaway payout. */
export const MAX_PAYOUT_PERCENT = 150;

/** Achievement % below this is "Below Target". */
export const BELOW_TARGET_THRESHOLD = 90;
/** Achievement % above this is "Exceeded Target"; between the two thresholds is "On Target". */
export const EXCEEDED_TARGET_THRESHOLD = 105;

export type PerformanceStatus = "below" | "on-target" | "exceeded";

export interface PerformanceResult {
  key: string;
  employeeId: string;
  employeeCode: string;
  employeeName: string;
  designation: string;
  month: string;
  target: number;
  achievement: number;
  achievementPercent: number;
  payoutPercent: number;
  baseSalary: number;
  performanceSalary: number;
  incentive: number;
  totalPayout: number;
  status: PerformanceStatus;
}

export function calculateAchievementPercent(target: number, achievement: number): number {
  if (!target || target <= 0) return 0;
  return (achievement / target) * 100;
}

export function classifyPerformance(achievementPercent: number): PerformanceStatus {
  if (achievementPercent < BELOW_TARGET_THRESHOLD) return "below";
  if (achievementPercent <= EXCEEDED_TARGET_THRESHOLD) return "on-target";
  return "exceeded";
}

export function buildPerformanceResult(
  employee: Employee,
  month: string,
  target: number,
  achievement: number
): PerformanceResult {
  const achievementPercent = calculateAchievementPercent(target, achievement);
  const payoutPercent = Math.min(achievementPercent, MAX_PAYOUT_PERCENT);
  const performanceSalary = employee.baseSalary * (payoutPercent / 100);
  const incentive = employee.targetIncentiveAmount * (payoutPercent / 100);

  return {
    key: `${employee.id}-${month}`,
    employeeId: employee.id,
    employeeCode: employee.employeeCode,
    employeeName: employee.fullName,
    designation: employee.designation,
    month,
    target,
    achievement,
    achievementPercent: round(achievementPercent, 1),
    payoutPercent: round(payoutPercent, 1),
    baseSalary: employee.baseSalary,
    performanceSalary: round(performanceSalary, 2),
    incentive: round(incentive, 2),
    totalPayout: round(performanceSalary + incentive, 2),
    status: classifyPerformance(achievementPercent),
  };
}

function round(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}
