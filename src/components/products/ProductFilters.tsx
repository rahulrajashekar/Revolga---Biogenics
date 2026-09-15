"use client";

import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { PRODUCT_TYPES, PRODUCT_CATEGORIES } from "@/lib/mockData";

export interface ProductFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  typeFilter: string;
  onTypeFilterChange: (value: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  resultCount: number;
  totalCount: number;
}

/** Search + Product Type / Category / Status filter bar, reused on the Products page. */
export function ProductFilters({
  search,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  statusFilter,
  onStatusFilterChange,
  hasActiveFilters,
  onClearFilters,
  resultCount,
  totalCount,
}: ProductFiltersProps) {
  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Search by name, SKU or generic name…"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              leftIcon={<Search className="w-3.5 h-3.5" />}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:w-[560px] shrink-0">
            <Select
              aria-label="Filter by product type"
              value={typeFilter}
              onChange={(e) => onTypeFilterChange(e.target.value)}
              options={[{ value: "All", label: "All Types" }, ...PRODUCT_TYPES.map((t) => ({ value: t.value, label: t.label }))]}
            />
            <Select
              aria-label="Filter by category"
              value={categoryFilter}
              onChange={(e) => onCategoryFilterChange(e.target.value)}
              options={[{ value: "All", label: "All Categories" }, ...PRODUCT_CATEGORIES.map((c) => ({ value: c, label: c }))]}
            />
            <Select
              aria-label="Filter by status"
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
              options={[
                { value: "All", label: "All Statuses" },
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ]}
            />
          </div>
        </div>
        {hasActiveFilters && (
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-slate-500 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" /> {resultCount} of {totalCount} shown
            </p>
            <button onClick={onClearFilters} className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 cursor-pointer">
              Clear filters
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
