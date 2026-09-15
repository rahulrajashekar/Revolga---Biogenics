"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, Plus, Trash2, ArrowLeft, Pill, AlertTriangle, CheckCircle2 } from "lucide-react";
import { CUSTOMERS, MEDICINES, BATCHES, Batch } from "@/lib/mockData";

interface InvoiceRow {
  id: string;
  medicineId: string;
  batchId: string;
  quantity: number;
  freeQuantity: number;
  discount: number;
}

export default function CreateTaxInvoicePage() {
  const router = useRouter();
  const [selectedCustomerId, setSelectedCustomerId] = useState(CUSTOMERS[0]?.id || "");
  const [paymentStatus, setPaymentStatus] = useState<"paid" | "partial" | "credit" | "pending">("credit");
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [notes, setNotes] = useState("");

  const [rows, setRows] = useState<InvoiceRow[]>([
    { id: "1", medicineId: MEDICINES[0]?.id || "", batchId: BATCHES[0]?.id || "", quantity: 10, freeQuantity: 1, discount: 5 },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      { id: String(Date.now()), medicineId: MEDICINES[0]?.id || "", batchId: BATCHES[0]?.id || "", quantity: 1, freeQuantity: 0, discount: 0 },
    ]);
  };

  const removeRow = (id: string) => {
    if (rows.length > 1) {
      setRows(rows.filter((r) => r.id !== id));
    }
  };

  const updateRow = (id: string, field: keyof InvoiceRow, value: any) => {
    setRows(
      rows.map((row) => {
        if (row.id !== id) return row;
        const updated = { ...row, [field]: value };
        if (field === "medicineId") {
          // Select first valid active/near-expiry batch for this medicine
          const availableBatches = BATCHES.filter((b) => b.medicineId === value && b.status !== "expired");
          updated.batchId = availableBatches[0]?.id || "";
        }
        return updated;
      })
    );
  };

  // Calculations
  const calculatedItems = rows.map((row) => {
    const med = MEDICINES.find((m) => m.id === row.medicineId);
    const batch = BATCHES.find((b) => b.id === row.batchId);
    const rate = batch?.sellingRate || med?.sellingPrice || 0;
    const mrp = batch?.mrp || med?.mrp || 0;
    const gstRate = med?.gstRate || 12;

    const baseAmount = row.quantity * rate;
    const discountAmount = (baseAmount * row.discount) / 100;
    const taxableValue = baseAmount - discountAmount;
    const gstAmount = (taxableValue * gstRate) / 100;
    const total = taxableValue + gstAmount;

    return {
      rowId: row.id,
      med,
      batch,
      rate,
      mrp,
      gstRate,
      baseAmount,
      discountAmount,
      taxableValue,
      gstAmount,
      total,
    };
  });

  const subtotal = calculatedItems.reduce((s, i) => s + i.baseAmount, 0);
  const totalDiscount = calculatedItems.reduce((s, i) => s + i.discountAmount, 0);
  const taxableTotal = calculatedItems.reduce((s, i) => s + i.taxableValue, 0);
  const totalGst = calculatedItems.reduce((s, i) => s + i.gstAmount, 0);
  const grandTotal = calculatedItems.reduce((s, i) => s + i.total, 0);

  const selectedCustomer = CUSTOMERS.find((c) => c.id === selectedCustomerId);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Tax Invoice created successfully! Total: ₹${grandTotal.toLocaleString("en-IN")}`);
    router.push("/sales");
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-3">
          <Link href="/sales" className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">
            <ArrowLeft className="w-4 h-4 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Create Tax Invoice</h1>
            <p className="text-xs text-slate-500">INV-000006 (Auto-numbered)</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={handleSave} className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm">
            Save & Print Invoice
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Customer Selection */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">1. Select Customer (Pharmacy / Hospital / Dealer)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Customer Name *</label>
              <select
                value={selectedCustomerId}
                onChange={(e) => setSelectedCustomerId(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
              >
                {CUSTOMERS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.businessName} ({c.customerType}) — Outstanding: ₹{c.outstandingBalance}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Status *</label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value as any)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
              >
                <option value="credit">Credit (Unpaid)</option>
                <option value="paid">Paid</option>
                <option value="partial">Partial</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          {selectedCustomer && (
            <div className="p-3 bg-slate-50 rounded-lg text-xs grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-600">
              <div><span className="font-semibold text-slate-800">GSTIN:</span> {selectedCustomer.gstin || "N/A"}</div>
              <div><span className="font-semibold text-slate-800">Drug Lic:</span> {selectedCustomer.drugLicenseNumber || "N/A"}</div>
              <div><span className="font-semibold text-slate-800">Credit Limit:</span> ₹{selectedCustomer.creditLimit.toLocaleString("en-IN")}</div>
              <div><span className="font-semibold text-slate-800">Payment Terms:</span> {selectedCustomer.paymentTerms} days</div>
            </div>
          )}
        </div>

        {/* Medicines & Batch Selection Table */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">2. Medicines & Batch Selection</h2>
            <button
              type="button"
              onClick={addRow}
              className="flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
            >
              <Plus className="w-3.5 h-3.5" /> Add Line Item
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-2 text-left w-1/3">Medicine</th>
                  <th className="p-2 text-left">Batch (Expiry & Stock)</th>
                  <th className="p-2 text-right w-16">Qty</th>
                  <th className="p-2 text-right w-16">Free Qty</th>
                  <th className="p-2 text-right w-20">Rate (₹)</th>
                  <th className="p-2 text-right w-16">Disc %</th>
                  <th className="p-2 text-right w-16">GST %</th>
                  <th className="p-2 text-right w-24">Total (₹)</th>
                  <th className="p-2 text-center w-8"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row, index) => {
                  const calc = calculatedItems[index];
                  const availableBatches = BATCHES.filter(
                    (b) => b.medicineId === row.medicineId && b.status !== "expired"
                  );
                  const expiredCount = BATCHES.filter(
                    (b) => b.medicineId === row.medicineId && b.status === "expired"
                  ).length;

                  return (
                    <tr key={row.id}>
                      {/* Medicine dropdown */}
                      <td className="p-2">
                        <select
                          value={row.medicineId}
                          onChange={(e) => updateRow(row.id, "medicineId", e.target.value)}
                          className="w-full border border-slate-200 rounded p-1.5 text-xs bg-white"
                        >
                          {MEDICINES.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.medicineName} ({m.packSize})
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Batch dropdown */}
                      <td className="p-2">
                        {availableBatches.length > 0 ? (
                          <select
                            value={row.batchId}
                            onChange={(e) => updateRow(row.id, "batchId", e.target.value)}
                            className="w-full border border-slate-200 rounded p-1.5 text-xs bg-white font-mono"
                          >
                            {availableBatches.map((b) => (
                              <option key={b.id} value={b.id}>
                                {b.batchNumber} (Exp: {b.expiryDate} · Stock: {b.quantity})
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-rose-600 font-semibold text-[10px]">No valid active batches</span>
                        )}
                        {expiredCount > 0 && (
                          <p className="text-[9px] text-amber-600 mt-0.5">({expiredCount} expired batch hidden)</p>
                        )}
                      </td>

                      {/* Qty */}
                      <td className="p-2">
                        <input
                          type="number"
                          min="1"
                          value={row.quantity}
                          onChange={(e) => updateRow(row.id, "quantity", Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full border border-slate-200 rounded p-1.5 text-xs text-right"
                        />
                      </td>

                      {/* Free Qty */}
                      <td className="p-2">
                        <input
                          type="number"
                          min="0"
                          value={row.freeQuantity}
                          onChange={(e) => updateRow(row.id, "freeQuantity", Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full border border-slate-200 rounded p-1.5 text-xs text-right"
                        />
                      </td>

                      {/* Rate */}
                      <td className="p-2 text-right font-semibold text-slate-700">₹{calc?.rate}</td>

                      {/* Disc */}
                      <td className="p-2">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={row.discount}
                          onChange={(e) => updateRow(row.id, "discount", Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-full border border-slate-200 rounded p-1.5 text-xs text-right"
                        />
                      </td>

                      {/* GST */}
                      <td className="p-2 text-right text-slate-600">{calc?.gstRate}%</td>

                      {/* Total */}
                      <td className="p-2 text-right font-bold text-slate-900">
                        ₹{calc?.total.toFixed(2)}
                      </td>

                      {/* Remove */}
                      <td className="p-2 text-center">
                        <button
                          type="button"
                          onClick={() => removeRow(row.id)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                          disabled={rows.length === 1}
                        >
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

        {/* Invoice Summary */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row justify-between gap-6">
          <div className="flex-1 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Invoice Notes / Payment Remarks</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Special delivery instructions or payment terms…"
                className="w-full border border-slate-200 rounded-lg p-2 text-xs"
              />
            </div>
          </div>

          <div className="w-full sm:w-72 space-y-2 text-xs border-t sm:border-t-0 sm:border-l border-slate-200 pt-4 sm:pt-0 sm:pl-6">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Discount Total:</span>
              <span className="text-emerald-600">-₹{totalDiscount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Taxable Amount:</span>
              <span>₹{taxableTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Total GST:</span>
              <span>₹{totalGst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-slate-900 border-t border-slate-200 pt-2">
              <span>Grand Total:</span>
              <span className="text-emerald-700">₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
