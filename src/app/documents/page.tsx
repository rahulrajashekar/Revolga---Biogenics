"use client";

import React from "react";
import { FileText, CheckCircle2, Sliders } from "lucide-react";
import { medicalDistributorConfig } from "@/config/businesses/medical-distributor";

export default function DocumentsPage() {
  const documentTypes = medicalDistributorConfig.documentTypes;

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 rounded-xl"><FileText className="w-5 h-5 text-emerald-600" /></div>
            <h1 className="text-xl font-extrabold text-slate-900">Document Management</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">Document Types, Numbering Rules & Templates for Medical Distributor</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documentTypes.map((doc) => (
          <div key={doc.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900">{doc.label}</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-slate-100 text-slate-700">{doc.prefix}</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${doc.enabled ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                {doc.enabled ? "ENABLED" : "DISABLED"}
              </span>
            </div>
            <p className="text-xs text-slate-500">{doc.description}</p>
            <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 text-[10px] font-semibold text-slate-600">
              <span className="px-2 py-1 rounded bg-slate-50 border border-slate-200">Template: {doc.template}</span>
              {doc.supportsBatches && <span className="px-2 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200">Supports Batches</span>}
              {doc.requiresDelivery && <span className="px-2 py-1 rounded bg-amber-50 text-amber-700 border border-amber-200">Requires Delivery Address</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
