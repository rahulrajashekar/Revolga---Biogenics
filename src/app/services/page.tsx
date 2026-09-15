"use client";

import React from "react";
import Link from "next/link";
import { Stethoscope, Shield, Truck, Handshake, Info, ArrowRight } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      icon: Stethoscope,
      title: "Healthcare Product Supply",
      description: "Supplying comprehensive medical devices, ethical formulations, surgical supplies, and healthcare products.",
    },
    {
      icon: Shield,
      title: "Medical Product Solutions",
      description: "Providing tailored product selection and supply chain support for clinics, hospitals, and medical practitioners.",
    },
    {
      icon: Truck,
      title: "Distribution & Logistics Support",
      description: "Dependable temperature-controlled logistics for sensitive medical formulations and healthcare supplies.",
    },
    {
      icon: Handshake,
      title: "Business & Trade Partnerships",
      description: "Collaborating with authorized healthcare distributors, hospital purchase managers, and medical trade partners.",
    },
    {
      icon: Info,
      title: "Product Information & Compliance",
      description: "Delivering detailed technical specifications, composition data, and usage documentation to medical professionals.",
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 via-sky-900 to-slate-900 text-white p-8 rounded-3xl shadow-xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-200 border border-white/20 text-xs">
            <Stethoscope className="w-4 h-4 text-teal-300" />
            <span>Revolga Biogenics — Corporate Services</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Medical & Healthcare Solutions
          </h1>
          <p className="text-sm text-teal-100 leading-relaxed">
            Revolga Biogenics provides medical solutions designed to support healthcare providers, institutional buyers, and trade partners with quality medical products and reliable service.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 hover:border-sky-500 transition-all">
              <div className="p-3 bg-sky-100 rounded-xl w-fit text-sky-700">
                <Icon className="w-6 h-6" />
              </div>
              <h2 className="text-base font-bold text-slate-900">{item.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          );
        })}
      </div>

      {/* Request Information CTA */}
      <div className="bg-sky-50 border border-sky-200 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-extrabold text-sm text-sky-950">Inquire About Our Services</h3>
          <p className="text-xs text-sky-800">
            Contact our business representative for product catalogs, institutional inquiries, or trade support.
          </p>
        </div>
        <Link href="/contact" className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-xl whitespace-nowrap shadow-xs flex items-center gap-1.5">
          Request Information <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
