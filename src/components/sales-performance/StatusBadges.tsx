import React from "react";
import { Badge, BadgeProps } from "@/components/ui/Badge";
import { STATUS_LABEL } from "@/lib/salesPerformance/calculations";
import { IncentiveStatus, PerformanceStatus, SalaryStatus } from "@/lib/salesPerformance/types";

const PERFORMANCE_VARIANT: Record<PerformanceStatus, BadgeProps["variant"]> = {
  "needs-attention": "danger",
  "on-track": "info",
  "target-achieved": "success",
  "above-target": "success",
};

export function PerformanceStatusBadge({ status, className }: { status: PerformanceStatus; className?: string }) {
  return (
    <Badge variant={PERFORMANCE_VARIANT[status]} className={className}>
      {STATUS_LABEL[status]}
    </Badge>
  );
}

const INCENTIVE_LABEL: Record<IncentiveStatus, string> = {
  calculated: "Calculated",
  "pending-approval": "Pending Approval",
  approved: "Approved",
  paid: "Paid",
};

const INCENTIVE_VARIANT: Record<IncentiveStatus, BadgeProps["variant"]> = {
  calculated: "secondary",
  "pending-approval": "warning",
  approved: "info",
  paid: "success",
};

export function IncentiveStatusBadge({ status, className }: { status: IncentiveStatus; className?: string }) {
  return (
    <Badge variant={INCENTIVE_VARIANT[status]} className={className}>
      {INCENTIVE_LABEL[status]}
    </Badge>
  );
}

const SALARY_LABEL: Record<SalaryStatus, string> = {
  draft: "Pending Approval",
  approved: "Approved",
  paid: "Paid",
};

const SALARY_VARIANT: Record<SalaryStatus, BadgeProps["variant"]> = {
  draft: "warning",
  approved: "info",
  paid: "success",
};

export function SalaryStatusBadge({ status, className }: { status: SalaryStatus; className?: string }) {
  return (
    <Badge variant={SALARY_VARIANT[status]} className={className}>
      {SALARY_LABEL[status]}
    </Badge>
  );
}
