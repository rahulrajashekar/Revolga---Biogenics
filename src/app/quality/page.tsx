"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, FileCheck, ArrowRight } from "lucide-react";

export default function QualityPage() {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-8 rounded-3xl shadow-xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 border border-white/20 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Quality Assurance & Standards</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Quality Commitment at Revolga Biogenics
          </h1>
          <p className="text-sm text-emerald-100 leading-relaxed">
            Revolga Biogenics is dedicated to maintaining high standards of quality, traceability, and compliance across all medical and healthcare product lines.
          </p>
        </div>
      </div>

      {/* Quality Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="p-3 bg-emerald-100 rounded-xl w-fit text-emerald-700">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Product Integrity</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            All medical products and formulations are stored and handled in accordance with manufacturer-recommended storage parameters.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="p-3 bg-sky-100 rounded-xl w-fit text-sky-700">
            <FileCheck className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Batch & Serial Traceability</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Where applicable, products maintain strict batch-level and serial tracking to ensure verification and recall readiness.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="p-3 bg-teal-100 rounded-xl w-fit text-teal-700">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Regulatory Compliance</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Operations comply with statutory licensing requirements, tax reporting standards, and documentation guidelines.
          </p>
        </div>
      </div>

      {/* Placeholder Notice */}
      <div className="bg-slate-100 border border-slate-300 p-6 rounded-2xl space-y-2 text-slate-700">
        <h3 className="font-bold text-sm text-slate-900">Certifications & Compliance Information</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Specific regulatory certifications, licensing documentation, and audit verification documents can be made available to trade partners upon request.
        </p>
        <div className="pt-2">
          <Link href="/contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900">
            Request Quality Documentation <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
