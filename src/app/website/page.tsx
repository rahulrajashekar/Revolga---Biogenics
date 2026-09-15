"use client";

import React from "react";
import Link from "next/link";
import { Stethoscope, ShieldCheck, Award, Phone, Mail, MapPin, ArrowRight, Package, Sparkles } from "lucide-react";
import { CATEGORIES } from "@/lib/mockData";

export default function TenantPublicWebsitePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Corporate Header */}
      <header className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-600 rounded-xl font-black text-white text-xs tracking-wider">
              RB
            </div>
            <div>
              <h1 className="font-extrabold text-base tracking-tight text-white">Revolga Biogenics</h1>
              <p className="text-[10px] text-sky-300">Medical & Healthcare Solutions</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <Link href="/website" className="text-white hover:text-sky-400">Home</Link>
            <Link href="/about" className="hover:text-sky-400">About Us</Link>
            <Link href="/website/medicines" className="hover:text-sky-400">Products</Link>
            <Link href="/services" className="hover:text-sky-400">Services</Link>
            <Link href="/quality" className="hover:text-sky-400">Quality</Link>
            <Link href="/careers" className="hover:text-sky-400">Careers</Link>
            <Link href="/contact" className="hover:text-sky-400">Contact</Link>
          </nav>

          <Link href="/contact" className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-sky-600 text-white hover:bg-sky-500 shadow-xs">
            Request Information
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sky-950 via-slate-900 to-teal-950 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-200 border border-white/20 text-xs">
            <Sparkles className="w-4 h-4 text-sky-300" />
            <span>Advancing Healthcare Through Quality Medical Solutions</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Revolga Biogenics
          </h1>
          <p className="text-sm sm:text-base text-sky-100 max-w-2xl mx-auto leading-relaxed">
            Revolga Biogenics is focused on providing quality medical products, ethical formulations, surgical supplies, and healthcare solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link href="/website/medicines" className="px-5 py-2.5 rounded-xl bg-sky-600 text-white font-bold text-xs hover:bg-sky-500 shadow-md">
              Explore Products
            </Link>
            <Link href="/contact" className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs hover:bg-white/20">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs space-y-2">
            <div className="p-3 bg-sky-100 w-fit rounded-xl text-sky-700"><ShieldCheck className="w-6 h-6" /></div>
            <h3 className="font-extrabold text-sm text-slate-900">Quality Assured</h3>
            <p className="text-xs text-slate-500">Sourced and managed with stringent quality handling and traceability standards.</p>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs space-y-2">
            <div className="p-3 bg-teal-100 w-fit rounded-xl text-teal-700"><Stethoscope className="w-6 h-6" /></div>
            <h3 className="font-extrabold text-sm text-slate-900">Healthcare Solutions</h3>
            <p className="text-xs text-slate-500">Supporting clinics, healthcare providers, and trade partners with medical products.</p>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs space-y-2">
            <div className="p-3 bg-slate-100 w-fit rounded-xl text-slate-700"><Award className="w-6 h-6" /></div>
            <h3 className="font-extrabold text-sm text-slate-900">Reliable Partner</h3>
            <p className="text-xs text-slate-500">Professional support, transparent communications, and dependable logistics.</p>
          </div>
        </div>
      </section>

      {/* Product Categories Overview */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">Product Categories</h2>
          <Link href="/website/medicines" className="text-xs font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1">
            View All Catalog <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORIES.slice(0, 8).map((cat) => (
            <Link key={cat} href={`/website/medicines?category=${encodeURIComponent(cat)}`}
              className="p-4 bg-white border border-slate-200 rounded-xl hover:border-sky-500 transition-all group">
              <span className="text-xs font-bold text-slate-800 group-hover:text-sky-700">{cat}</span>
              <p className="text-[10px] text-slate-500 mt-1">Medical Products →</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Corporate Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-10 border-t border-slate-800 mt-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-sm mb-2">Revolga Biogenics</h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Revolga Biogenics is dedicated to medical product quality and healthcare partner support.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Navigation</h4>
            <div className="grid grid-cols-2 gap-2 text-slate-400">
              <Link href="/about" className="hover:text-sky-400">About Us</Link>
              <Link href="/website/medicines" className="hover:text-sky-400">Products</Link>
              <Link href="/services" className="hover:text-sky-400">Services</Link>
              <Link href="/quality" className="hover:text-sky-400">Quality</Link>
              <Link href="/careers" className="hover:text-sky-400">Careers</Link>
              <Link href="/contact" className="hover:text-sky-400">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Notice</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Product specifications and trade information are intended for authorized healthcare providers and business partners.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
