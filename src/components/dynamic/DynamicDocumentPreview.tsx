"use client";

import React, { useState } from "react";
import { useBusiness } from "@/context/BusinessContext";
import { formatDocumentNumber, generateSampleProductData } from "@/lib/configEngine";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FileText, Building2, ShieldCheck } from "lucide-react";

export function DynamicDocumentPreview() {
  const { currentBusiness, t } = useBusiness();
  const [selectedDocId, setSelectedDocId] = useState<string>(
    currentBusiness.documentTypes[0]?.id || "sales_invoice"
  );

  // Sync selected document type when active business changes
  React.useEffect(() => {
    if (currentBusiness.documentTypes.length > 0) {
      setSelectedDocId(currentBusiness.documentTypes[0].id);
    }
  }, [currentBusiness.id]);

  const activeDocConfig =
    currentBusiness.documentTypes.find((d) => d.id === selectedDocId) ||
    currentBusiness.documentTypes[0] || {
      id: "invoice",
      label: t("invoice"),
      prefix: "INV",
      enabled: true,
      template: "modern",
    };

  const documentNumber = formatDocumentNumber(currentBusiness, activeDocConfig.id, 1042);
  const sampleProduct = generateSampleProductData(currentBusiness);

  return (
    <Card className="border-slate-200 shadow-md overflow-hidden">
      <CardHeader className="bg-slate-50/80 border-b border-slate-200 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-600" />
              <CardTitle className="text-base font-bold text-slate-900">
                Dynamic Document Protocol & Invoice Preview
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-500 mt-1">
              Select document type configured for <strong className="text-slate-800">{currentBusiness.businessName}</strong>.
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-amber-300 text-amber-700 bg-amber-50 text-xs">
              Protocol: {activeDocConfig.prefix}
            </Badge>
          </div>
        </div>

        {/* Document Selector Pills */}
        <div className="flex flex-wrap gap-2 mt-3">
          {currentBusiness.documentTypes.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setSelectedDocId(doc.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedDocId === doc.id
                  ? "bg-slate-900 text-white font-semibold shadow-xs"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span>{doc.label}</span>
              <span className="text-[10px] opacity-75 font-mono">({doc.prefix})</span>
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        {/* Rendered Invoice Sheet Paper */}
        <div className="max-w-3xl mx-auto rounded-xl bg-white border border-slate-300 shadow-lg p-6 sm:p-8 space-y-6 text-slate-800 relative">
          {/* Header section with brand color accent */}
          <div className="flex flex-col sm:flex-row justify-between items-start border-b border-slate-200 pb-6 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: currentBusiness.branding?.brandColor || "#2563eb" }}
                >
                  <Building2 className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">{currentBusiness.businessName}</h3>
              </div>
              <p className="text-xs text-slate-500 font-medium">{currentBusiness.tagline}</p>
              <p className="text-[11px] text-slate-500">{currentBusiness.address}, {currentBusiness.city}, {currentBusiness.state} - {currentBusiness.pincode}</p>
              <p className="text-[11px] text-slate-500">GSTIN: <strong className="text-slate-700">{currentBusiness.gstin || "N/A"}</strong> | Phone: {currentBusiness.phone}</p>
            </div>

            <div className="text-right sm:text-right space-y-1">
              <div className="inline-block px-3 py-1 rounded bg-slate-100 text-slate-800 font-extrabold text-sm uppercase tracking-wider border border-slate-200">
                {activeDocConfig.label}
              </div>
              <p className="text-xs font-mono font-bold text-slate-900 mt-2">{documentNumber}</p>
              <p className="text-[11px] text-slate-500">Date: {new Date().toLocaleDateString("en-IN")}</p>
              <p className="text-[11px] text-slate-500">Template: <span className="capitalize font-semibold">{activeDocConfig.template}</span></p>
            </div>
          </div>

          {/* Customer / Client Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Billed To ({t("customer")}):
              </span>
              <p className="font-bold text-slate-900 text-sm">Royal Infrastructure Ltd.</p>
              <p className="text-slate-600 mt-0.5">MG Road Junction, Kochi, Kerala</p>
              <p className="text-slate-500">GSTIN: 32ABCDE9988F1Z1</p>
            </div>
            <div className="sm:text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Workflow Details:
              </span>
              <p className="text-slate-700">Payment Terms: <span className="font-semibold text-slate-900">Net 15 Days</span></p>
              <p className="text-slate-700">Vendor Type: <span className="font-semibold text-slate-900">{t("supplier")} Direct</span></p>
              {activeDocConfig.requiresDelivery && (
                <Badge variant="info" className="mt-1 text-[10px]">Delivery Slip Required</Badge>
              )}
            </div>
          </div>

          {/* Product Items Table dynamically rendered */}
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">{t("product")} Details</th>
                  {currentBusiness.productFields
                    .filter((f) => f.showInTable)
                    .slice(0, 3)
                    .map((f) => (
                      <th key={f.id || (f as any).key} className="p-3">
                        {f.label}
                      </th>
                    ))}
                  <th className="p-3 text-right">Qty</th>
                  <th className="p-3 text-right">Rate</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                <tr>
                  <td className="p-3 font-semibold text-slate-400">1</td>
                  <td className="p-3">
                    <p className="font-bold text-slate-900">
                      {sampleProduct.medicineName || sampleProduct.genericName || sampleProduct.brand || sampleProduct.serviceName || sampleProduct.itemName || `Premium ${t("product")}`}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {sampleProduct.deliverableScope || sampleProduct.colour || sampleProduct.batchNumber || sampleProduct.sku || "Standard Spec"}
                    </p>
                  </td>
                  {currentBusiness.productFields
                    .filter((f) => f.showInTable)
                    .slice(0, 3)
                    .map((f) => {
                      const fieldKey = f.id || (f as any).key;
                      return (
                        <td key={fieldKey} className="p-3 text-slate-600 font-medium">
                          {String(sampleProduct[fieldKey] || "-")}
                        </td>
                      );
                    })}
                  <td className="p-3 text-right font-semibold">2</td>
                  <td className="p-3 text-right">₹{(sampleProduct.sellingPrice || sampleProduct.price || 1500).toLocaleString("en-IN")}</td>
                  <td className="p-3 text-right font-bold text-slate-900">
                    ₹{((sampleProduct.sellingPrice || sampleProduct.price || 1500) * 2).toLocaleString("en-IN")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer Totals */}
          <div className="flex flex-col sm:flex-row justify-between items-end gap-4 pt-4 border-t border-slate-200">
            <div className="text-xs text-slate-500 space-y-1">
              <p className="flex items-center gap-1 font-semibold text-emerald-700">
                <ShieldCheck className="w-4 h-4" /> GST Compliant {activeDocConfig.label} Format
              </p>
              <p className="text-[11px]">Authorized Signatory: ____________________</p>
            </div>

            <div className="w-full sm:w-64 space-y-1.5 text-xs text-right">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span>₹{((sampleProduct.sellingPrice || sampleProduct.price || 1500) * 2).toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{currentBusiness.terminology.taxLabel || "GST"} (18%):</span>
                <span>₹{(((sampleProduct.sellingPrice || sampleProduct.price || 1500) * 2) * 0.18).toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between font-extrabold text-sm text-slate-900 pt-2 border-t border-slate-300">
                <span>Total Amount:</span>
                <span className="text-blue-600">
                  ₹{(((sampleProduct.sellingPrice || sampleProduct.price || 1500) * 2) * 1.18).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
