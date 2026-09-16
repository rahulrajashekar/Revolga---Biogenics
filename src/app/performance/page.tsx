"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Award, Users, Wallet, TrendingUp, Download, RefreshCw, Loader2,
  AlertTriangle, CheckCircle2, FileWarning, Info,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useToast, ToastViewport } from "@/components/ui/Toast";
import { UploadDropzone } from "@/components/performance/UploadDropzone";
import { PerformanceResultsTable } from "@/components/performance/PerformanceResultsTable";
import { employeeService } from "@/services/employeeService";
import { Employee } from "@/lib/mockEmployees";
import { processPerformanceUpload, ProcessUploadOutcome, UploadMode } from "@/lib/performanceUpload";
import { getSingleModeTemplate, getBulkModeTemplate, downloadCsv } from "@/lib/csvTemplate";
import { cn } from "@/lib/utils";

export default function PerformancePage() {
  const { toasts, toast, dismiss } = useToast();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);

  const [mode, setMode] = useState<UploadMode>("single");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [bulkMonth, setBulkMonth] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [outcome, setOutcome] = useState<ProcessUploadOutcome | null>(null);
  const [fatalError, setFatalError] = useState<string | null>(null);

  useEffect(() => {
    employeeService.getActive().then((data) => {
      setEmployees(data);
      setLoadingEmployees(false);
    });
  }, []);

  const selectedEmployee = employees.find((e) => e.id === selectedEmployeeId) || null;
  const contextReady = mode === "single" ? Boolean(selectedEmployee) : Boolean(bulkMonth);

  const resetUpload = () => {
    setFile(null);
    setOutcome(null);
    setFatalError(null);
  };

  const handleModeChange = (next: UploadMode) => {
    setMode(next);
    resetUpload();
  };

  const handleEmployeeChange = (id: string) => {
    setSelectedEmployeeId(id);
    resetUpload();
  };

  const handleMonthChange = (value: string) => {
    setBulkMonth(value);
    resetUpload();
  };

  const handleFileSelected = (selected: File) => {
    setFile(selected);
    setOutcome(null);
    setFatalError(null);
    setProcessing(true);

    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      const result = processPerformanceUpload({
        mode,
        csvText: text,
        employees,
        singleEmployee: selectedEmployee || undefined,
        bulkMonth: mode === "bulk" ? formatMonthLabel(bulkMonth) : undefined,
      });

      setProcessing(false);

      if (result.missingColumns.length > 0) {
        setFatalError(`Couldn't find these expected column(s) in the file: ${result.missingColumns.join(", ")}.`);
        return;
      }
      if (result.results.length === 0) {
        setFatalError("No valid rows could be processed from this file.");
        return;
      }

      setOutcome(result);
      toast({
        title: "File processed",
        description: `${result.results.length} row(s) calculated${result.issues.length ? `, ${result.issues.length} skipped` : ""}.`,
        variant: result.issues.length > 0 ? "info" : "success",
      });
    };
    reader.onerror = () => {
      setProcessing(false);
      setFatalError("Couldn't read this file. Please try again.");
    };
    reader.readAsText(selected);
  };

  const summary = useMemo(() => {
    if (!outcome || outcome.results.length === 0) return null;
    const results = outcome.results;
    const totalIncentive = results.reduce((s, r) => s + r.incentive, 0);
    const totalPayout = results.reduce((s, r) => s + r.totalPayout, 0);
    const avgAchievement = results.reduce((s, r) => s + r.achievementPercent, 0) / results.length;
    const uniqueEmployees = new Set(results.map((r) => r.employeeId)).size;
    return { totalIncentive, totalPayout, avgAchievement, uniqueEmployees, count: results.length };
  }, [outcome]);

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-xl">
              <Award className="w-5 h-5 text-blue-600" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Performance &amp; Incentives</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">
            Upload monthly targets vs. achievements to calculate performance salary and incentive payouts.
          </p>
        </div>
      </div>

      {/* Mode + context selection */}
      <Card>
        <CardContent className="p-5 space-y-4">
          <div>
            <p className="text-xs font-semibold text-slate-700 mb-2">Upload type</p>
            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1 gap-1">
              <button
                onClick={() => handleModeChange("single")}
                className={cn(
                  "px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer",
                  mode === "single" ? "bg-white text-blue-700 shadow-xs" : "text-slate-500 hover:text-slate-800"
                )}
              >
                Single Employee (multiple months)
              </button>
              <button
                onClick={() => handleModeChange("bulk")}
                className={cn(
                  "px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer",
                  mode === "bulk" ? "bg-white text-blue-700 shadow-xs" : "text-slate-500 hover:text-slate-800"
                )}
              >
                All Employees (single month)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mode === "single" ? (
              <Select
                label="Employee *"
                placeholder={loadingEmployees ? "Loading employees..." : "Select an employee..."}
                disabled={loadingEmployees}
                value={selectedEmployeeId}
                onChange={(e) => handleEmployeeChange(e.target.value)}
                options={employees.map((e) => ({ value: e.id, label: `${e.fullName} (${e.employeeCode})` }))}
              />
            ) : (
              <Input
                label="Month *"
                type="month"
                value={bulkMonth}
                onChange={(e) => handleMonthChange(e.target.value)}
              />
            )}

            <div className="flex items-end">
              <Button
                type="button"
                variant="outline"
                size="md"
                className="gap-1.5"
                onClick={() =>
                  downloadCsv(
                    mode === "single" ? "performance-template-single-employee.csv" : "performance-template-all-employees.csv",
                    mode === "single" ? getSingleModeTemplate() : getBulkModeTemplate()
                  )
                }
              >
                <Download className="w-3.5 h-3.5" /> Download CSV Template
              </Button>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            {mode === "single"
              ? "Expected columns: Month, Target, Achievement — one row per month for the selected employee."
              : "Expected columns: Employee Code (or Name), Target, Achievement — one row per employee for the selected month."}
          </p>

          <div>
            {!contextReady && (
              <p className="text-xs text-amber-600 font-medium mb-2">
                {mode === "single" ? "Select an employee before uploading." : "Select a month before uploading."}
              </p>
            )}
            <UploadDropzone
              onFileSelected={handleFileSelected}
              selectedFile={file}
              onClear={resetUpload}
              disabled={!contextReady || processing}
            />
          </div>
        </CardContent>
      </Card>

      {/* Processing state */}
      {processing && (
        <Card>
          <CardContent className="p-12 flex flex-col items-center justify-center text-center gap-3">
            <Loader2 className="w-7 h-7 text-blue-600 animate-spin" />
            <p className="text-sm font-semibold text-slate-600">Reading and calculating…</p>
          </CardContent>
        </Card>
      )}

      {/* Fatal error state */}
      {fatalError && !processing && (
        <Card>
          <CardContent className="p-8 flex flex-col items-center justify-center text-center gap-3">
            <FileWarning className="w-8 h-8 text-rose-500" />
            <p className="text-sm font-bold text-slate-800">Couldn&apos;t process this file</p>
            <p className="text-xs text-slate-500 max-w-md">{fatalError}</p>
            <Button variant="outline" size="sm" onClick={resetUpload} className="gap-1.5 mt-1">
              <RefreshCw className="w-3.5 h-3.5" /> Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Row issues (partial success) */}
      {outcome && outcome.issues.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 space-y-1.5">
          <p className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" /> {outcome.issues.length} row(s) were skipped
          </p>
          <ul className="text-[11px] text-amber-700 list-disc list-inside space-y-0.5">
            {outcome.issues.map((issue, i) => (
              <li key={i}>{issue}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Results */}
      {outcome && summary && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                  <Users className="w-3.5 h-3.5" /> Employees
                </div>
                <p className="text-xl font-extrabold text-slate-900 mt-1">{summary.uniqueEmployees}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                  <TrendingUp className="w-3.5 h-3.5" /> Avg. Achievement
                </div>
                <p className="text-xl font-extrabold text-slate-900 mt-1">{summary.avgAchievement.toFixed(1)}%</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" /> Total Incentive
                </div>
                <p className="text-xl font-extrabold text-emerald-700 mt-1">₹{summary.totalIncentive.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                  <Wallet className="w-3.5 h-3.5" /> Total Payout
                </div>
                <p className="text-xl font-extrabold text-slate-900 mt-1">₹{summary.totalPayout.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
              </CardContent>
            </Card>
          </div>

          <PerformanceResultsTable results={outcome.results} />

          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={resetUpload} className="gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Upload Another File
            </Button>
          </div>
        </>
      )}

      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}

/** Converts an `<input type="month">` value ("2026-09") into a readable label ("September 2026"). */
function formatMonthLabel(value: string): string {
  if (!value) return "";
  const [year, month] = value.split("-").map(Number);
  if (!year || !month) return value;
  const date = new Date(year, month - 1, 1);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}
