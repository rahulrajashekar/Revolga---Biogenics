"use client";

import React from "react";
import { Filter } from "lucide-react";
import { Select } from "@/components/ui/Select";
import { Card, CardContent } from "@/components/ui/Card";
import { REPORTING_MONTHS, SALES_EMPLOYEES, TERRITORIES, monthLabel } from "@/lib/salesPerformance/mockCore";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/salesPerformance/mockCore";

export interface SalesPerformanceFilters {
  month: string;
  employeeId: string;
  territoryId: string;
  managerId: string;
  productId: string;
  categoryId: string;
}

export const ALL_FILTERS: SalesPerformanceFilters = {
  month: "",
  employeeId: "",
  territoryId: "",
  managerId: "",
  productId: "",
  categoryId: "",
};

export interface FilterBarProps {
  filters: SalesPerformanceFilters;
  onChange: (next: SalesPerformanceFilters) => void;
  /** Which filter dropdowns to show — defaults to month + employee + territory + manager. */
  show?: (keyof SalesPerformanceFilters)[];
  monthOptional?: boolean;
}

const managers = SALES_EMPLOYEES.filter((e) => SALES_EMPLOYEES.some((sub) => sub.managerId === e.id));

export function FilterBar({ filters, onChange, show = ["month", "employeeId", "territoryId", "managerId"], monthOptional = true }: FilterBarProps) {
  const set = (patch: Partial<SalesPerformanceFilters>) => onChange({ ...filters, ...patch });

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">
          <Filter className="w-3.5 h-3.5" /> Filters
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {show.includes("month") && (
            <Select
              label="Month"
              value={filters.month}
              onChange={(e) => set({ month: e.target.value })}
              placeholder={monthOptional ? "All Months" : undefined}
              options={REPORTING_MONTHS.map((m) => ({ value: m, label: monthLabel(m) }))}
            />
          )}
          {show.includes("employeeId") && (
            <Select
              label="Employee"
              value={filters.employeeId}
              onChange={(e) => set({ employeeId: e.target.value })}
              placeholder="All Employees"
              options={SALES_EMPLOYEES.map((e) => ({ value: e.id, label: e.fullName }))}
            />
          )}
          {show.includes("territoryId") && (
            <Select
              label="Territory"
              value={filters.territoryId}
              onChange={(e) => set({ territoryId: e.target.value })}
              placeholder="All Territories"
              options={TERRITORIES.map((t) => ({ value: t.id, label: t.name }))}
            />
          )}
          {show.includes("managerId") && (
            <Select
              label="Manager"
              value={filters.managerId}
              onChange={(e) => set({ managerId: e.target.value })}
              placeholder="All Managers"
              options={managers.map((m) => ({ value: m.id, label: m.fullName }))}
            />
          )}
          {show.includes("productId") && (
            <Select
              label="Product"
              value={filters.productId}
              onChange={(e) => set({ productId: e.target.value })}
              placeholder="All Products"
              options={PRODUCTS.map((p) => ({ value: p.id, label: p.name }))}
            />
          )}
          {show.includes("categoryId") && (
            <Select
              label="Product Category"
              value={filters.categoryId}
              onChange={(e) => set({ categoryId: e.target.value })}
              placeholder="All Categories"
              options={PRODUCT_CATEGORIES.map((c) => ({ value: c.id, label: c.name }))}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
