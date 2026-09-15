"use client";

import React, { useState } from "react";
import { Briefcase, Send, CheckCircle2 } from "lucide-react";

export default function CareersPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white p-8 rounded-3xl shadow-xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-200 border border-white/20 text-xs">
            <Briefcase className="w-4 h-4 text-sky-300" />
            <span>Careers at Revolga Biogenics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Build Your Future in Healthcare Solutions
          </h1>
          <p className="text-sm text-sky-100 leading-relaxed">
            Explore opportunities with Revolga Biogenics and contribute to delivering quality medical products and solutions.
          </p>
        </div>
      </div>

      {/* Career Overview */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Working at Revolga Biogenics</h2>
        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
          We welcome energetic, integrity-driven professionals passionate about medical products, supply chain management, regulatory compliance, and customer care.
        </p>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <h3 className="font-bold text-xs text-slate-900">Current Openings Notice</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We review applications on an ongoing basis for roles in Sales & Distribution, Regulatory Documentation, Inventory Operations, and Administrative Support.
          </p>
        </div>
      </div>

      {/* Resume Inquiry Form */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs max-w-2xl space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Submit Your Resume</h2>
          <p className="text-xs text-slate-500 mt-1">
            Send us your information for upcoming career opportunities.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Application Submitted Successfully</span>
            </div>
            <p className="text-xs text-emerald-700">
              Thank you for your interest in Revolga Biogenics. Our recruitment team will get in touch if a suitable opening matches your qualifications.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Full Name</label>
                <input required type="text" placeholder="e.g. Anjali Sharma" className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-sky-500" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Email Address</label>
                <input required type="email" placeholder="e.g. anjali@example.com" className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-sky-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Phone Number</label>
                <input required type="tel" placeholder="+91 98765 43210" className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-sky-500" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Department / Role of Interest</label>
                <select className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-sky-500 bg-white">
                  <option>Medical Product Sales</option>
                  <option>Supply Chain & Logistics</option>
                  <option>Regulatory & Compliance</option>
                  <option>Administration & Finance</option>
                  <option>Other / General Inquiry</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Brief Introduction / Qualifications</label>
              <textarea rows={3} placeholder="Tell us briefly about your experience..." className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-sky-500" />
            </div>

            <button type="submit" className="px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2">
              <Send className="w-3.5 h-3.5" /> Submit Resume Inquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
