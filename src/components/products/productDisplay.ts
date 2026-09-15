import { ProductType, PRODUCT_TYPES } from "@/lib/mockData";

// ─── SHARED DISPLAY HELPERS ────────────────────────────────────────────────
// Single source of truth for how a product type is labelled/colored across
// the table, view dialog and form — avoids each component re-deriving it.

export function typeLabel(type: ProductType): string {
  return PRODUCT_TYPES.find((t) => t.value === type)?.label || type;
}

export const typeBadgeColor: Record<ProductType, string> = {
  medicine: "bg-emerald-50 text-emerald-700 border-emerald-200",
  medical_device: "bg-blue-50 text-blue-700 border-blue-200",
  surgical_product: "bg-amber-50 text-amber-700 border-amber-200",
  healthcare_product: "bg-purple-50 text-purple-700 border-purple-200",
  other: "bg-slate-100 text-slate-600 border-slate-200",
};
