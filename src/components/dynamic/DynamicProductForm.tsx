"use client";

import React, { useState } from "react";
import { useBusiness } from "@/context/BusinessContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Package, Plus, Sparkles, Check, Info } from "lucide-react";

export function DynamicProductForm() {
  const { currentBusiness, t } = useBusiness();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);

  // Clear form when business changes
  React.useEffect(() => {
    setFormData({});
    setSubmittedData(null);
  }, [currentBusiness.id]);

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedData(formData);
  };

  return (
    <Card className="border-slate-200 shadow-md">
      <CardHeader className="bg-slate-50/80 border-b border-slate-200 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-slate-900">
                Config-Driven Add New {t("product")} Form
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Form inputs are dynamically rendered from <code className="text-blue-600 font-mono">productFields</code> schema.
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
            {currentBusiness.productFields.length} Dynamic Fields
          </Badge>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentBusiness.productFields.map((field) => {
              const fieldKey = field.id || (field as any).key;
              const value = formData[fieldKey] || "";

              return (
                <div key={fieldKey} className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                    <span>
                      {field.label} {field.required && <span className="text-rose-500">*</span>}
                    </span>
                    {field.unit && <span className="text-[10px] text-slate-400 font-normal">({field.unit})</span>}
                  </label>

                  {field.type === "select" && field.options ? (
                    <select
                      value={value}
                      onChange={(e) => handleChange(fieldKey, e.target.value)}
                      required={field.required}
                      className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                    >
                      <option value="">Select {field.label}...</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea
                      placeholder={field.placeholder || `Enter ${field.label}...`}
                      value={value}
                      onChange={(e) => handleChange(fieldKey, e.target.value)}
                      required={field.required}
                      rows={2}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                    />
                  ) : field.type === "date" ? (
                    <Input
                      type="date"
                      value={value}
                      onChange={(e) => handleChange(fieldKey, e.target.value)}
                      required={field.required}
                      className="text-xs h-9"
                    />
                  ) : field.type === "number" || field.type === "currency" ? (
                    <Input
                      type="number"
                      placeholder={field.placeholder || "Enter value..."}
                      value={value}
                      onChange={(e) => handleChange(fieldKey, e.target.value)}
                      required={field.required}
                      className="text-xs h-9"
                    />
                  ) : (
                    <Input
                      type="text"
                      placeholder={field.placeholder || `Enter ${field.label}...`}
                      value={value}
                      onChange={(e) => handleChange(fieldKey, e.target.value)}
                      required={field.required}
                      className="text-xs h-9"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Submitted payload verification block */}
          {submittedData && (
            <div className="mt-4 p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 space-y-2 animate-in fade-in">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                <Check className="w-4 h-4 text-emerald-600" /> Form Data Validated & Captured
              </div>
              <div className="p-2.5 rounded bg-white border border-emerald-200 text-xs font-mono text-emerald-800 overflow-x-auto">
                {JSON.stringify(submittedData, null, 2)}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="bg-slate-50/50 border-t border-slate-200 px-6 py-3 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-blue-500" /> Mode: {currentBusiness.businessType.replace("_", " ")} catalog schema
          </div>
          <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs flex items-center gap-1 shadow-xs">
            <Plus className="w-3.5 h-3.5" /> Save New {t("product")}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
