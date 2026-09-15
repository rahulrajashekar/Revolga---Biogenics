"use client";

import React from "react";
import { Package, Pencil } from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogCloseButton,
  DialogBody,
  DialogFooter,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Product } from "@/lib/mockData";
import { typeLabel } from "./productDisplay";

export interface ProductViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onEdit: (product: Product) => void;
}

function Field({ label, value }: { label: string; value?: React.ReactNode }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="text-sm text-slate-800 font-medium mt-0.5">{value}</p>
    </div>
  );
}

export function ProductViewDialog({ open, onOpenChange, product, onEdit }: ProductViewDialogProps) {
  if (!product) return null;

  const typeDisplayLabel = typeLabel(product.productType);
  const isLowStock = product.currentStock <= product.reorderLevel;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-700 shrink-0">
            <Package className="w-4 h-4" />
          </div>
          <div>
            <DialogTitle>{product.name}</DialogTitle>
            <DialogDescription>{product.sku} &middot; {typeDisplayLabel}</DialogDescription>
          </div>
        </div>
        <DialogCloseButton onClose={() => onOpenChange(false)} />
      </DialogHeader>

      <DialogBody className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={product.status === "active" ? "success" : "secondary"}>
            {product.status === "active" ? "Active" : "Inactive"}
          </Badge>
          <Badge variant="info">{typeDisplayLabel}</Badge>
          {isLowStock && <Badge variant="warning">Low Stock</Badge>}
        </div>

        {product.description && (
          <p className="text-sm text-slate-600 leading-relaxed border border-slate-200 bg-slate-50 rounded-lg p-3">
            {product.description}
          </p>
        )}

        <section className="space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Basic Details</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Field label="Manufacturer / Brand" value={product.manufacturer} />
            <Field label="Category" value={product.category} />
            <Field label="Unit" value={product.unit} />
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pricing &amp; Stock</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Field label="Purchase Price" value={`₹${product.purchasePrice.toLocaleString("en-IN")}`} />
            <Field label="Selling Price" value={`₹${product.sellingPrice.toLocaleString("en-IN")}`} />
            <Field label="GST / Tax" value={`${product.gstRate}%`} />
            <Field
              label="Current Stock"
              value={<span className={isLowStock ? "text-rose-600" : undefined}>{product.currentStock} {product.unit}</span>}
            />
            <Field label="Reorder Level" value={`${product.reorderLevel} ${product.unit}`} />
          </div>
        </section>

        {product.productType === "medicine" && (
          <section className="space-y-3">
            <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Medicine Details</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Field label="Generic Name" value={product.genericName} />
              <Field label="Strength" value={product.strength} />
              <Field label="Dosage Form" value={product.dosageForm} />
              <Field label="Pack Size" value={product.packSize} />
              <Field label="Batch Tracking" value={product.batchTracking ? "Enabled" : "Disabled"} />
              <Field label="Expiry Tracking" value={product.expiryTracking ? "Enabled" : "Disabled"} />
            </div>
          </section>
        )}

        {product.productType === "medical_device" && (
          <section className="space-y-3">
            <h3 className="text-xs font-bold text-blue-700 uppercase tracking-wider">Medical Device Details</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Field label="Model" value={product.model} />
              <Field label="Size" value={product.size} />
              <Field label="Material" value={product.material} />
              <Field label="Warranty" value={product.warranty} />
            </div>
            <Field label="Specification" value={product.specification} />
          </section>
        )}

        {product.productType === "surgical_product" && (
          <section className="space-y-3">
            <h3 className="text-xs font-bold text-amber-700 uppercase tracking-wider">Surgical Product Details</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Field label="Size" value={product.size} />
              <Field label="Material" value={product.material} />
              <Field label="Sterility" value={product.sterile === "sterile" ? "Sterile" : "Non-Sterile"} />
            </div>
            <Field label="Specification" value={product.specification} />
          </section>
        )}

        {product.productType === "healthcare_product" && (
          <section className="space-y-3">
            <h3 className="text-xs font-bold text-purple-700 uppercase tracking-wider">Healthcare Product Details</h3>
            <Field label="Specification" value={product.specification} />
            <Field label="Usage Information" value={product.usageInformation} />
          </section>
        )}

        <section className="space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Record</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Field label="Created" value={product.createdAt} />
            <Field label="Last Updated" value={product.updatedAt} />
          </div>
        </section>
      </DialogBody>

      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Close
        </Button>
        <Button onClick={() => onEdit(product)} className="gap-1.5">
          <Pencil className="w-3.5 h-3.5" /> Edit Product
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
