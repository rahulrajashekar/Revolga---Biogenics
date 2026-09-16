"use client";

import React from "react";
import { Download, CheckCircle2, BadgeCheck } from "lucide-react";
import { Dialog, DialogBody, DialogCloseButton, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { SalaryStatusBadge } from "./StatusBadges";
import { getEmployee } from "@/lib/salesPerformance/mockCore";
import { SalaryRecord } from "@/lib/salesPerformance/types";

function formatCurrency(value: number): string {
  return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

function Row({ label, value, emphasis, negative }: { label: string; value: number; emphasis?: boolean; negative?: boolean }) {
  return (
    <div className={`flex items-center justify-between text-xs ${emphasis ? "font-extrabold text-slate-900 border-t border-slate-200 pt-2 mt-2" : "text-slate-600"}`}>
      <span>{label}</span>
      <span className={negative ? "text-rose-600" : emphasis ? "text-slate-900" : "font-semibold text-slate-800"}>
        {negative ? "− " : ""}{formatCurrency(value)}
      </span>
    </div>
  );
}

export function PayoutDetailsDialog({
  record,
  onClose,
  onApprove,
  onMarkPaid,
}: {
  record: SalaryRecord | null;
  onClose: () => void;
  onApprove: (employeeId: string) => void;
  onMarkPaid: (employeeId: string) => void;
}) {
  const employee = record ? getEmployee(record.employeeId) : undefined;

  return (
    <Dialog open={Boolean(record)} onOpenChange={(o) => !o && onClose()}>
      {record && employee && (
        <>
          <DialogHeader>
            <div>
              <DialogTitle>Payout Details — {employee.fullName}</DialogTitle>
              <p className="text-xs text-slate-500 mt-0.5">{employee.employeeCode} &middot; {employee.designation}</p>
            </div>
            <DialogCloseButton onClose={onClose} />
          </DialogHeader>
          <DialogBody className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Status</span>
              <SalaryStatusBadge status={record.status} />
            </div>

            <div className="rounded-xl border border-slate-200/70 shadow-ambient p-4 space-y-1">
              <Row label="Basic Salary" value={record.basicSalary} />
              <Row label="Allowances" value={record.allowances} />
              <Row label="Sales Incentive" value={record.salesIncentive} />
              <Row label="Collection Incentive" value={record.collectionIncentive} />
              <Row label="New Customer Incentive" value={record.newCustomerIncentive} />
              <Row label="Performance Bonus" value={record.performanceBonus} />
              <Row label="Deductions" value={record.deductions} negative />
              <Row label="Net Pay" value={record.netPay} emphasis />
            </div>

            <p className="text-[10px] text-amber-600 bg-amber-50 border border-amber-200/80 rounded-lg p-2.5">
              Demo calculation only — not statutory payroll processing (no PF/ESI/TDS applied).
            </p>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={() => window.alert("Export/Download is simulated in this demo.")}>
              <Download className="w-3.5 h-3.5" /> Export / Download
            </Button>
            {record.status === "draft" && (
              <Button variant="secondary" size="sm" className="gap-1.5" onClick={() => onApprove(record.employeeId)}>
                <CheckCircle2 className="w-3.5 h-3.5" /> Approve
              </Button>
            )}
            {record.status === "approved" && (
              <Button size="sm" className="gap-1.5" onClick={() => onMarkPaid(record.employeeId)}>
                <BadgeCheck className="w-3.5 h-3.5" /> Mark as Paid
              </Button>
            )}
          </DialogFooter>
        </>
      )}
    </Dialog>
  );
}
