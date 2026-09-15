"use client";

import React from "react";
import Link from "next/link";
import { Building2, ShieldCheck, Target, Eye, HeartHandshake, ArrowRight, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-slate-900 text-white p-8 rounded-3xl shadow-xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-200 border border-white/20 text-xs">
            <Building2 className="w-4 h-4 text-sky-300" />
            <span>About Revolga Biogenics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Advancing Healthcare Through Quality Medical Solutions
          </h1>
          <p className="text-sm text-sky-100 leading-relaxed">
            Revolga Biogenics is a medical and healthcare-focused company committed to delivering quality medical products, pharmaceutical formulations, and healthcare solutions.
          </p>
        </div>
      </div>

      {/* Corporate Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="p-3 bg-sky-100 rounded-xl w-fit text-sky-700">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Our Mission</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            To provide healthcare providers, hospitals, and trade partners with reliable, high-quality medical products and healthcare formulations that meet rigorous quality standards.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="p-3 bg-teal-100 rounded-xl w-fit text-teal-700">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Our Vision</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            To be recognized as a trusted medical solutions provider across healthcare institutions, fostering health equity and accessible quality care.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Our Core Principles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
            <div className="font-bold text-xs text-sky-700">Quality First</div>
            <p className="text-[11px] text-slate-500">Uncompromising dedication to product safety and regulatory compliance.</p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
            <div className="font-bold text-xs text-sky-700">Integrity & Trust</div>
            <p className="text-[11px] text-slate-500">Transparent partnerships with healthcare practitioners and organizations.</p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
            <div className="font-bold text-xs text-sky-700">Customer Focus</div>
            <p className="text-[11px] text-slate-500">Responsive service and dependable product availability for medical providers.</p>
          </div>
        </div>
      </div>

      {/* Placeholder Overview */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-3">
        <h3 className="font-bold text-sm">Company History & Detailed Overview</h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Revolga Biogenics continues to expand its medical product portfolio. Detailed company history, manufacturing milestones, and regulatory details will be updated as new corporate disclosures are finalized.
        </p>
        <Link href="/contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 pt-2">
          Contact Revolga Biogenics <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
