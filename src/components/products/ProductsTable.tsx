"use client";

import React from "react";
import { Package, Eye, Pencil, Ban, CheckCircle2, AlertTriangle, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Product } from "@/lib/mockData";
import { typeLabel, typeBadgeColor } from "./productDisplay";
import { cn } from "@/lib/utils";

export type SortField = "name" | "productType" | "category" | "sellingPrice" | "currentStock" | "status";
export type SortDirection = "asc" | "desc";

export interface ProductsTableProps {
  products: Product[];
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onToggleStatus: (product: Product) => void;
}

function SortIcon({ field, activeField, direction }: { field: SortField; activeField: SortField; direction: SortDirection }) {
  if (field !== activeField) return <ArrowUpDown className="w-3 h-3 text-slate-300" />;
  return direction === "asc" ? <ArrowUp className="w-3 h-3 text-blue-600" /> : <ArrowDown className="w-3 h-3 text-blue-600" />;
}

function SortableHeader({
  field,
  label,
  align = "left",
  activeField,
  direction,
  onSort,
}: {
  field: SortField;
  label: string;
  align?: "left" | "right" | "center";
  activeField: SortField;
  direction: SortDirection;
  onSort: (field: SortField) => void;
}) {
  return (
    <th className={cn("p-3", align === "right" && "text-right", align === "center" && "text-center", align === "left" && "text-left")}>
      <button
        className={cn(
          "flex items-center gap-1 cursor-pointer hover:text-slate-800",
          align === "right" && "ml-auto",
          align === "center" && "mx-auto"
        )}
        onClick={() => onSort(field)}
      >
        {label} <SortIcon field={field} activeField={activeField} direction={direction} />
      </button>
    </th>
  );
}

/** Reusable Products table: a sortable desktop/tablet table plus a card layout for mobile — used on the Products page. */
export function ProductsTable({ products, sortField, sortDirection, onSort, onView, onEdit, onToggleStatus }: ProductsTableProps) {
  return (
    <>
      {/* Desktop / tablet table */}
      <div className="hidden sm:block bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
              <tr>
                <SortableHeader field="name" label="Product" activeField={sortField} direction={sortDirection} onSort={onSort} />
                <SortableHeader field="productType" label="Type" activeField={sortField} direction={sortDirection} onSort={onSort} />
                <SortableHeader field="category" label="Category" activeField={sortField} direction={sortDirection} onSort={onSort} />
                <th className="p-3 text-left">Manufacturer</th>
                <th className="p-3 text-left">Unit</th>
                <SortableHeader field="sellingPrice" label="Price" align="right" activeField={sortField} direction={sortDirection} onSort={onSort} />
                <SortableHeader field="currentStock" label="Stock" align="right" activeField={sortField} direction={sortDirection} onSort={onSort} />
                <SortableHeader field="status" label="Status" align="center" activeField={sortField} direction={sortDirection} onSort={onSort} />
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => {
                const isLow = p.currentStock <= p.reorderLevel;
                return (
                  <tr key={p.id} className={cn("hover:bg-slate-50 transition-colors", isLow && "bg-amber-50/20")}>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                          <Package className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{p.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{p.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={cn("px-2 py-0.5 rounded-md text-[10px] font-semibold border", typeBadgeColor[p.productType])}>
                        {typeLabel(p.productType)}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600">{p.category}</td>
                    <td className="p-3 text-slate-600">{p.manufacturer}</td>
                    <td className="p-3 text-slate-600">{p.unit}</td>
                    <td className="p-3 text-right font-semibold text-slate-800">₹{p.sellingPrice.toLocaleString("en-IN")}</td>
                    <td className="p-3 text-right">
                      <span className={cn("font-bold", isLow ? "text-rose-600" : "text-slate-800")}>{p.currentStock}</span>
                      {isLow && <AlertTriangle className="w-3 h-3 text-amber-500 inline ml-1" />}
                    </td>
                    <td className="p-3 text-center">
                      <Badge variant={p.status === "active" ? "success" : "secondary"} className="text-[9px]">
                        {p.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => onView(p)} className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer" title="View">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => onEdit(p)} className="p-1 rounded text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer" title="Edit">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onToggleStatus(p)}
                          className={cn(
                            "p-1 rounded transition-colors cursor-pointer",
                            p.status === "active" ? "text-slate-400 hover:text-rose-600 hover:bg-rose-50" : "text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
                          )}
                          title={p.status === "active" ? "Deactivate" : "Activate"}
                        >
                          {p.status === "active" ? <Ban className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards — a responsive stand-in for the table, not an overflow scroll */}
      <div className="sm:hidden space-y-3">
        {products.map((p) => {
          const isLow = p.currentStock <= p.reorderLevel;
          return (
            <Card key={p.id}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <Package className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-800 text-sm truncate">{p.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{p.sku}</p>
                    </div>
                  </div>
                  <Badge variant={p.status === "active" ? "success" : "secondary"} className="text-[9px] shrink-0">
                    {p.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <span className={cn("px-2 py-0.5 rounded-md text-[10px] font-semibold border", typeBadgeColor[p.productType])}>
                    {typeLabel(p.productType)}
                  </span>
                  <span className="text-[10px] text-slate-500">{p.category}</span>
                  <span className="text-[10px] text-slate-400">&middot;</span>
                  <span className="text-[10px] text-slate-500">{p.manufacturer}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center border-t border-slate-100 pt-3">
                  <div>
                    <p className="text-[9px] text-slate-400 uppercase font-bold">Price</p>
                    <p className="text-xs font-bold text-slate-800">₹{p.sellingPrice.toLocaleString("en-IN")}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-400 uppercase font-bold">Stock</p>
                    <p className={cn("text-xs font-bold", isLow ? "text-rose-600" : "text-slate-800")}>
                      {p.currentStock} {isLow && <AlertTriangle className="w-2.5 h-2.5 inline ml-0.5" />}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-400 uppercase font-bold">Unit</p>
                    <p className="text-xs font-bold text-slate-800">{p.unit}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => onView(p)}>
                    <Eye className="w-3.5 h-3.5" /> View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => onEdit(p)}>
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={p.status === "active" ? "text-rose-600" : "text-emerald-600"}
                    onClick={() => onToggleStatus(p)}
                    title={p.status === "active" ? "Deactivate" : "Activate"}
                  >
                    {p.status === "active" ? <Ban className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
