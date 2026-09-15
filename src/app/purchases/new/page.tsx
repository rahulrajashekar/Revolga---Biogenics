"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Plus, Trash2, ArrowLeft } from "lucide-react";
import { SUPPLIERS, MEDICINES } from "@/lib/mockData";

interface PurchaseRow {
  id: string;
  medicineId: string;
  batchNumber: string;
  mfgDate: string;
  expiryDate: string;
  quantity: number;
  freeQuantity: number;
  purchaseRate: number;
  mrp: number;
  gstRate: number;
  discount: number;
}

export default function CreatePurchaseBillPage() {
  const router = useRouter();
  const [selectedSupplierId, setSelectedSupplierId] = useState(SUPPLIERS[0]?.id || "");
  const [billNumber, setBillNumber] = useState("PUR-2026-099");
  const [billDate, setBillDate] = useState("2026-09-15");
  const [paymentStatus, setPaymentStatus] = useState<"paid" | "credit">("credit");

  const [rows, setRows] = useState<PurchaseRow[]>([
    { id: "1", medicineId: MEDICINES[0]?.id || "", batchNumber: "DL2026X01", mfgDate: "2026-08-01", expiryDate: "2028-07-31", quantity: 100, freeQuantity: 10, purchaseRate: 65, mrp: 120, gstRate: 12, discount: 0 },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      { id: String(Date.now()), medicineId: MEDICINES[0]?.id || "", batchNumber: `BAT-${Date.now().toString().slice(-4)}`, mfgDate: "2026-09-01", expiryDate: "2028-08-31", quantity: 50, freeQuantity: 0, purchaseRate: 50, mrp: 100, gstRate: 12, discount: 0 },
    ]);
  };

  const removeRow = (id: string) => {
    if (rows.length > 1) setRows(rows.filter((r) => r.id !== id));
  };

  const updateRow = (id: string, field: keyof PurchaseRow, value: any) => {
    setRows(rows.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const calculatedItems = rows.map((r) => {
    const base = r.quantity * r.purchaseRate;
    const disc = (base * r.discount) / 100;
    const taxable = base - disc;
    const gst = (taxable * r.gstRate) / 100;
    const total = taxable + gst;
    return { base, disc, taxable, gst, total };
  });

  const grandTotal = calculatedItems.reduce((s, i) => s + i.total, 0);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Purchase Bill recorded! Total: ₹${grandTotal.toLocaleString("en-IN")}`);
    router.push("/purchases");
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-3">
          <Link href="/purchases" className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">
            <ArrowLeft className="w-4 h-4 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Record Purchase Bill</h1>
            <p className="text-xs text-slate-500">Inward stock & batch creation</p>
          </div>
        </div>
        <button onClick={handleSave} className="px-4 py-2 text-xs font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm">
          Save Purchase Bill
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Supplier Header */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">1. Supplier & Bill Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Supplier *</label>
              <select value={selectedSupplierId} onChange={(e) => setSelectedSupplierId(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs bg-white">
                {SUPPLIERS.map((s) => <option key={s.id} value={s.id}>{s.companyName} ({s.supplierType})</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Supplier Bill No *</label>
              <input value={billNumber} onChange={(e) => setBillNumber(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Bill Date *</label>
              <input type="date" value={billDate} onChange={(e) => setBillDate(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs" />
            </div>
          </div>
        </div>

        {/* Medicines & Inward Batch Table */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">2. Inward Medicines & New Batches</h2>
            <button type="button" onClick={addRow} className="flex items-center gap-1 text-xs font-semibold text-blue-600">
              <Plus className="w-3.5 h-3.5" /> Add Medicine
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-2 text-left w-1/4">Medicine</th>
                  <th className="p-2 text-left">Batch No *</th>
                  <th className="p-2 text-left">Mfg Date</th>
                  <th className="p-2 text-left">Expiry Date *</th>
                  <th className="p-2 text-right w-16">Qty</th>
                  <th className="p-2 text-right w-16">Free</th>
                  <th className="p-2 text-right w-20">Rate (₹)</th>
                  <th className="p-2 text-right w-20">MRP (₹)</th>
                  <th className="p-2 text-right w-16">GST %</th>
                  <th className="p-2 text-right w-24">Total (₹)</th>
                  <th className="p-2 text-center w-8"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((r, i) => {
                  const calc = calculatedItems[i];
                  return (
                    <tr key={r.id}>
                      <td className="p-2">
                        <select value={r.medicineId} onChange={(e) => updateRow(r.id, "medicineId", e.target.value)} className="w-full border rounded p-1 text-xs bg-white">
                          {MEDICINES.map((m) => <option key={m.id} value={m.id}>{m.medicineName}</option>)}
                        </select>
                      </td>
                      <td className="p-2">
                        <input value={r.batchNumber} onChange={(e) => updateRow(r.id, "batchNumber", e.target.value)} className="w-full border rounded p-1 text-xs font-mono" />
                      </td>
                      <td className="p-2">
                        <input type="date" value={r.mfgDate} onChange={(e) => updateRow(r.id, "mfgDate", e.target.value)} className="w-full border rounded p-1 text-xs" />
                      </td>
                      <td className="p-2">
                        <input type="date" value={r.expiryDate} onChange={(e) => updateRow(r.id, "expiryDate", e.target.value)} className="w-full border rounded p-1 text-xs font-semibold" />
                      </td>
                      <td className="p-2">
                        <input type="number" min="1" value={r.quantity} onChange={(e) => updateRow(r.id, "quantity", parseInt(e.target.value) || 1)} className="w-full border rounded p-1 text-xs text-right" />
                      </td>
                      <td className="p-2">
                        <input type="number" min="0" value={r.freeQuantity} onChange={(e) => updateRow(r.id, "freeQuantity", parseInt(e.target.value) || 0)} className="w-full border rounded p-1 text-xs text-right" />
                      </td>
                      <td className="p-2">
                        <input type="number" value={r.purchaseRate} onChange={(e) => updateRow(r.id, "purchaseRate", parseFloat(e.target.value) || 0)} className="w-full border rounded p-1 text-xs text-right" />
                      </td>
                      <td className="p-2">
                        <input type="number" value={r.mrp} onChange={(e) => updateRow(r.id, "mrp", parseFloat(e.target.value) || 0)} className="w-full border rounded p-1 text-xs text-right" />
                      </td>
                      <td className="p-2">
                        <input type="number" value={r.gstRate} onChange={(e) => updateRow(r.id, "gstRate", parseFloat(e.target.value) || 0)} className="w-full border rounded p-1 text-xs text-right" />
                      </td>
                      <td className="p-2 text-right font-bold text-slate-900">₹{calc?.total.toFixed(2)}</td>
                      <td className="p-2 text-center">
                        <button type="button" onClick={() => removeRow(r.id)} className="text-slate-400 hover:text-rose-600 p-1" disabled={rows.length === 1}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex justify-end">
          <div className="w-72 space-y-2 text-xs">
            <div className="flex justify-between text-sm font-extrabold text-slate-900 border-t border-slate-200 pt-2">
              <span>Grand Total:</span>
              <span className="text-blue-700">₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
