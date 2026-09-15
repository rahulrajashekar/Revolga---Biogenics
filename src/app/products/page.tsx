"use client";

import React from "react";
import { useBusiness } from "@/context/BusinessContext";
import { DynamicProductForm } from "@/components/dynamic/DynamicProductForm";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Package } from "lucide-react";
import { generateSampleProductData } from "@/lib/configEngine";

export default function ProductsPage() {
  const { currentBusiness, t } = useBusiness();
  const sampleData = generateSampleProductData(currentBusiness);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {t("productPlural")} Management
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Dynamic catalog driven by <strong className="text-slate-800">{currentBusiness.businessName}</strong> configuration schema.
          </p>
        </div>
        <Badge variant="default" className="bg-blue-600 text-white text-xs px-3 py-1">
          Catalog: {t("productPlural")}
        </Badge>
      </div>

      {/* Dynamic Form Component */}
      <DynamicProductForm />

      {/* Dynamic Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-bold text-slate-900">
            Active {t("productPlural")} Catalog Table
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Table headers dynamically generated from <code className="text-blue-600 font-mono">productFields</code> configuration.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[10px] tracking-wider border-y border-slate-200">
              <tr>
                <th className="p-3">#</th>
                {currentBusiness.productFields.map((field) => (
                  <th key={field.id || (field as any).key} className="p-3">
                    {field.label}
                  </th>
                ))}
                <th className="p-3 text-right">Price</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-400">1</td>
                {currentBusiness.productFields.map((field) => {
                  const fieldKey = field.id || (field as any).key;
                  return (
                    <td key={fieldKey} className="p-3 text-slate-900 font-medium">
                      {String(sampleData[fieldKey] || "-")}
                    </td>
                  );
                })}
                <td className="p-3 text-right font-bold text-slate-900">
                  ₹{(sampleData.sellingPrice || sampleData.price || 1500).toLocaleString("en-IN")}
                </td>
                <td className="p-3 text-right">
                  <Badge variant="success" className="text-[10px]">Active</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
