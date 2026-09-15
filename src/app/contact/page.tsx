"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Building, HelpCircle } from "lucide-react";
import { useBusiness } from "@/context/BusinessContext";

export default function ContactPage() {
  const { currentBusiness } = useBusiness();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-slate-900 text-white p-8 rounded-3xl shadow-xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-200 border border-white/20 text-xs">
            <Mail className="w-4 h-4 text-sky-300" />
            <span>Contact & Inquiries</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Connect With Revolga Biogenics
          </h1>
          <p className="text-sm text-sky-100 leading-relaxed">
            Have questions about our medical products, trade terms, or institutional supply? Our team is ready to assist you.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Sidebar */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building className="w-4 h-4 text-sky-600" /> Corporate Details
            </h2>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 font-semibold block">Office Address:</strong>
                  <span>{currentBusiness.address}, {currentBusiness.city}, {currentBusiness.state} — {currentBusiness.pincode}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 font-semibold block">Phone Number:</strong>
                  <span>{currentBusiness.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 font-semibold block">Email:</strong>
                  <span>{currentBusiness.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-sky-50 border border-sky-200 p-5 rounded-2xl space-y-2 text-xs text-sky-900">
            <h3 className="font-bold flex items-center gap-1.5 text-sky-950">
              <HelpCircle className="w-4 h-4 text-sky-700" /> Trade & Partner Inquiries
            </h3>
            <p className="leading-relaxed text-sky-800">
              Healthcare providers, hospitals, and licensed trade dealers can request custom price quotes and bulk catalog information.
            </p>
          </div>
        </div>

        {/* Request Information / Contact Form */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Request Information Form</h2>
            <p className="text-xs text-slate-500 mt-1">
              Submit your inquiry and a Revolga Biogenics representative will respond promptly.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Inquiry Submitted Successfully</span>
              </div>
              <p className="text-xs text-emerald-700">
                Thank you for contacting Revolga Biogenics. Your request has been logged and assigned to our representative.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Full Name *</label>
                  <input required type="text" placeholder="Your name" className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-sky-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Company / Organization *</label>
                  <input required type="text" placeholder="Organization name" className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-sky-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Email Address *</label>
                  <input required type="email" placeholder="email@example.com" className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-sky-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Phone Number *</label>
                  <input required type="tel" placeholder="+91 94471 00000" className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-sky-500" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Product / Service Interest</label>
                <input type="text" placeholder="e.g., Medical Devices, Surgical Supplies, Pharmaceuticals" className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-sky-500" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Message / Inquiry Details *</label>
                <textarea required rows={4} placeholder="Please detail your product inquiry or requirements..." className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-sky-500" />
              </div>

              <button type="submit" className="px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2">
                <Send className="w-3.5 h-3.5" /> Submit Information Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
