"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  UploadCloud, FileSpreadsheet, CheckCircle2, AlertTriangle, XCircle, ArrowRight, RefreshCw,
  ListChecks, Loader2, ArrowLeft, PartyPopper,
} from "lucide-react";
import { SalesPerformanceTabs } from "@/components/sales-performance/SalesPerformanceTabs";
import { UploadDropzone } from "@/components/performance/UploadDropzone";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";
import { useToast, ToastViewport } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";
import { DEFAULT_COLUMN_MAPPING, simulateExcelUpload, SYSTEM_FIELDS } from "@/lib/salesPerformance/excelImportSimulation";
import { ColumnMapping, ExcelImportSummary } from "@/lib/salesPerformance/types";

type Step = "upload" | "validation" | "mapping" | "done";

const STEPS: { id: Step; label: string }[] = [
  { id: "upload", label: "Upload Excel" },
  { id: "validation", label: "Review Import" },
  { id: "mapping", label: "Column Mapping" },
  { id: "done", label: "Import" },
];

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

export default function ExcelUploadPage() {
  const { toasts, toast, dismiss } = useToast();
  const [step, setStep] = useState<Step>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [summary, setSummary] = useState<ExcelImportSummary | null>(null);
  const [showAllIssues, setShowAllIssues] = useState(false);
  const [mapping, setMapping] = useState<ColumnMapping[]>(DEFAULT_COLUMN_MAPPING);
  const [importing, setImporting] = useState(false);

  const stepIndex = STEPS.findIndex((s) => s.id === step);

  const reset = () => {
    setStep("upload");
    setFile(null);
    setSummary(null);
    setShowAllIssues(false);
    setMapping(DEFAULT_COLUMN_MAPPING);
  };

  const handleFileSelected = (selected: File) => {
    setFile(selected);
    setProcessing(true);
    // Simulated processing — no real Excel parsing happens here (frontend demo only).
    setTimeout(() => {
      const result = simulateExcelUpload(selected, "Rahul Krishnan");
      setSummary(result);
      setProcessing(false);
      setStep("validation");
      toast({ title: "File processed", description: `${result.totalRows.toLocaleString("en-IN")} records processed.`, variant: result.errorRows > 0 ? "info" : "success" });
    }, 1200);
  };

  const handleMappingChange = (excelColumn: string, systemField: string) => {
    setMapping((prev) => prev.map((m) => (m.excelColumn === excelColumn ? { ...m, systemField } : m)));
  };

  const handleImport = () => {
    setImporting(true);
    setTimeout(() => {
      setImporting(false);
      setStep("done");
      toast({ title: "Import complete", description: `${summary?.validRows.toLocaleString("en-IN")} records imported successfully.`, variant: "success" });
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/70 shadow-ambient">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-brand-gradient rounded-xl shadow-brand-glow">
              <UploadCloud className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Upload Sales Data</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">
            Simulated Excel/CSV import demo — no file is actually parsed on the server yet.
          </p>
        </div>
      </div>

      <SalesPerformanceTabs />

      {/* Stepper */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.id}>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "h-7 w-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0",
                      i < stepIndex ? "bg-emerald-600 text-white" : i === stepIndex ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"
                    )}
                  >
                    {i < stepIndex ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={cn("text-xs font-semibold hidden sm:inline", i === stepIndex ? "text-slate-900" : "text-slate-400")}>{s.label}</span>
                </div>
                {i < STEPS.length - 1 && <div className={cn("flex-1 h-0.5 mx-2 sm:mx-4", i < stepIndex ? "bg-emerald-500" : "bg-slate-200")} />}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step: Upload */}
      {step === "upload" && (
        <Card>
          <CardContent className="p-5 space-y-4">
            <p className="text-xs text-slate-500 flex items-start gap-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5 mt-0.5 shrink-0" /> Supported formats: .xlsx, .xls, .csv
            </p>
            {processing ? (
              <div className="p-12 flex flex-col items-center justify-center text-center gap-3">
                <Loader2 className="w-7 h-7 text-blue-600 animate-spin" />
                <p className="text-sm font-semibold text-slate-600">Uploading &amp; validating file…</p>
              </div>
            ) : (
              <UploadDropzone
                accept=".xlsx,.xls,.csv"
                onFileSelected={handleFileSelected}
                selectedFile={file}
                onClear={reset}
              />
            )}
          </CardContent>
        </Card>
      )}

      {/* Step: Validation results */}
      {step === "validation" && summary && (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-5 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <p className="text-slate-500">File Name</p>
                  <p className="font-semibold text-slate-800 truncate">{summary.fileName}</p>
                </div>
                <div>
                  <p className="text-slate-500">File Size</p>
                  <p className="font-semibold text-slate-800">{summary.fileSizeKb.toLocaleString("en-IN")} KB</p>
                </div>
                <div>
                  <p className="text-slate-500">Uploaded By</p>
                  <p className="font-semibold text-slate-800">{summary.uploadedBy}</p>
                </div>
                <div>
                  <p className="text-slate-500">Uploaded At</p>
                  <p className="font-semibold text-slate-800">{formatDateTime(summary.uploadedAt)}</p>
                </div>
                <div>
                  <p className="text-slate-500">Number of Rows</p>
                  <p className="font-semibold text-slate-800">{summary.totalRows.toLocaleString("en-IN")}</p>
                </div>
                <div>
                  <p className="text-slate-500">Number of Employees</p>
                  <p className="font-semibold text-slate-800">{summary.employeeCount}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-slate-500">Date Range</p>
                  <p className="font-semibold text-slate-800">{summary.dateRangeStart} – {summary.dateRangeEnd}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl border border-slate-200 p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Records Processed</p>
                  <p className="text-xl font-extrabold text-slate-900 mt-1">{summary.totalRows.toLocaleString("en-IN")}</p>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-emerald-600 flex items-center justify-center gap-1"><CheckCircle2 className="w-3 h-3" /> Valid</p>
                  <p className="text-xl font-extrabold text-emerald-700 mt-1">{summary.validRows.toLocaleString("en-IN")}</p>
                </div>
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-amber-600 flex items-center justify-center gap-1"><AlertTriangle className="w-3 h-3" /> Warnings</p>
                  <p className="text-xl font-extrabold text-amber-700 mt-1">{summary.warningRows.toLocaleString("en-IN")}</p>
                </div>
                <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-rose-600 flex items-center justify-center gap-1"><XCircle className="w-3 h-3" /> Errors</p>
                  <p className="text-xl font-extrabold text-rose-700 mt-1">{summary.errorRows.toLocaleString("en-IN")}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center">
                <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setShowAllIssues((v) => !v)}>
                  <ListChecks className="w-3.5 h-3.5" /> {showAllIssues ? "Hide" : "Review"} Errors &amp; Warnings ({summary.issues.length})
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1.5" onClick={reset}>
                    <RefreshCw className="w-3.5 h-3.5" /> Upload a Different File
                  </Button>
                  <Button size="sm" className="gap-1.5" onClick={() => setStep("mapping")}>
                    Continue to Column Mapping <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              {showAllIssues && (
                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  <div className="max-h-80 overflow-y-auto">
                    <table className="w-full text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider sticky top-0">
                        <tr>
                          <th className="p-2.5 text-left">Row</th>
                          <th className="p-2.5 text-left">Column</th>
                          <th className="p-2.5 text-left">Issue</th>
                          <th className="p-2.5 text-center">Severity</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {summary.issues.map((issue) => (
                          <tr key={issue.id}>
                            <td className="p-2.5 text-slate-600">{issue.row}</td>
                            <td className="p-2.5 text-slate-600">{issue.column}</td>
                            <td className="p-2.5 text-slate-700">{issue.message}</td>
                            <td className="p-2.5 text-center">
                              <Badge variant={issue.severity === "error" ? "danger" : "warning"} className="text-[9px]">
                                {issue.severity === "error" ? "Error" : "Warning"}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step: Column mapping */}
      {step === "mapping" && summary && (
        <Card>
          <CardContent className="p-5 space-y-4">
            <p className="text-xs text-slate-500">
              Match each column detected in <span className="font-semibold text-slate-700">{summary.fileName}</span> to a system field. This mapping is stored locally for this demo and is designed to plug into a real Excel-processing backend later.
            </p>

            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3 text-left">Excel Column</th>
                    <th className="p-3 text-left w-12"></th>
                    <th className="p-3 text-left">System Field</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mapping.map((m) => (
                    <tr key={m.excelColumn}>
                      <td className="p-3 font-semibold text-slate-800">{m.excelColumn}</td>
                      <td className="p-3 text-slate-300"><ArrowRight className="w-3.5 h-3.5" /></td>
                      <td className="p-3">
                        <Select
                          value={m.systemField}
                          onChange={(e) => handleMappingChange(m.excelColumn, e.target.value)}
                          options={SYSTEM_FIELDS.map((f) => ({ value: f.value, label: f.label }))}
                          className="max-w-xs"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => setStep("validation")}>
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Review
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setMapping(DEFAULT_COLUMN_MAPPING)}>Reset Mapping</Button>
                <Button variant="outline" size="sm" onClick={() => toast({ title: "Mapping saved", description: "Column mapping saved locally for this session.", variant: "success" })}>
                  Save Mapping
                </Button>
                <Button size="sm" isLoading={importing} onClick={handleImport} className="gap-1.5">
                  {!importing && <ArrowRight className="w-3.5 h-3.5" />} Continue &amp; Import Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step: Done */}
      {step === "done" && summary && (
        <Card>
          <CardContent className="p-10 flex flex-col items-center text-center gap-3">
            <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center">
              <PartyPopper className="w-7 h-7 text-emerald-600" />
            </div>
            <p className="text-base font-extrabold text-slate-900">Import completed</p>
            <p className="text-xs text-slate-500 max-w-md">
              {summary.validRows.toLocaleString("en-IN")} of {summary.totalRows.toLocaleString("en-IN")} records were imported successfully for {summary.employeeCount} employees.
              Head to Employee Performance to review the updated figures, or Incentives to see calculated payouts.
            </p>
            <div className="flex flex-wrap gap-2 justify-center pt-2">
              <Button variant="outline" size="sm" className="gap-1.5" onClick={reset}>
                <UploadCloud className="w-3.5 h-3.5" /> Upload Another File
              </Button>
              <Link href="/sales-performance/employees">
                <Button size="sm" className="gap-1.5">View Employee Performance <ArrowRight className="w-3.5 h-3.5" /></Button>
              </Link>
              <Link href="/sales-performance/incentives">
                <Button variant="secondary" size="sm" className="gap-1.5">View Incentives <ArrowRight className="w-3.5 h-3.5" /></Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
