"use client";

import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ChevronsUpDown, Search, UserRound } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { PerformanceStatusBadge } from "./StatusBadges";
import { EmployeePerformanceRow } from "@/lib/salesPerformance/types";
import { getEmployee, getManagerName, getTerritory } from "@/lib/salesPerformance/mockCore";
import { cn } from "@/lib/utils";

type SortKey = "name" | "target" | "actualSales" | "achievementPercent" | "orders" | "collection" | "incentive";

const PAGE_SIZE = 8;

function formatCurrency(value: number): string {
  return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

export interface EmployeePerformanceTableRow extends EmployeePerformanceRow {
  incentive: number;
}

function SortHeader({
  label,
  sortField,
  align = "right",
  activeSortKey,
  onSort,
}: {
  label: string;
  sortField: SortKey;
  align?: "left" | "right";
  activeSortKey: SortKey;
  onSort: (key: SortKey) => void;
}) {
  return (
    <th
      className={cn("p-3 cursor-pointer select-none hover:text-slate-700 transition-colors", align === "right" ? "text-right" : "text-left")}
      onClick={() => onSort(sortField)}
    >
      <span className={cn("inline-flex items-center gap-1", align === "right" && "flex-row-reverse")}>
        {label}
        <ChevronsUpDown className={cn("w-3 h-3", activeSortKey === sortField ? "text-blue-600" : "text-slate-300")} />
      </span>
    </th>
  );
}

export function EmployeePerformanceTable({
  rows,
  onSelectEmployee,
}: {
  rows: EmployeePerformanceTableRow[];
  onSelectEmployee: (employeeId: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("achievementPercent");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((r) => {
      const employee = getEmployee(r.employeeId);
      const territory = employee ? getTerritory(employee.territoryId) : undefined;
      return (
        employee?.fullName.toLowerCase().includes(needle) ||
        employee?.employeeCode.toLowerCase().includes(needle) ||
        territory?.name.toLowerCase().includes(needle)
      );
    });
  }, [rows, search]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      let diff = 0;
      switch (sortKey) {
        case "name":
          diff = (getEmployee(a.employeeId)?.fullName ?? "").localeCompare(getEmployee(b.employeeId)?.fullName ?? "");
          break;
        case "target":
          diff = a.target - b.target;
          break;
        case "actualSales":
          diff = a.actualSales - b.actualSales;
          break;
        case "achievementPercent":
          diff = a.achievementPercent - b.achievementPercent;
          break;
        case "orders":
          diff = a.orders - b.orders;
          break;
        case "collection":
          diff = a.collectionActual - b.collectionActual;
          break;
        case "incentive":
          diff = a.incentive - b.incentive;
          break;
      }
      return sortDir === "asc" ? diff : -diff;
    });
    return copy;
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const page_ = Math.min(page, totalPages);
  const paged = sorted.slice((page_ - 1) * PAGE_SIZE, page_ * PAGE_SIZE);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
    setPage(1);
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b border-slate-100">
        <div className="max-w-sm">
          <Input
            placeholder="Search by name, employee ID or territory…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
            <tr>
              <SortHeader label="Employee" sortField="name" align="left" activeSortKey={sortKey} onSort={toggleSort} />
              <th className="p-3 text-left">Territory</th>
              <th className="p-3 text-left">Manager</th>
              <SortHeader label="Target" sortField="target" activeSortKey={sortKey} onSort={toggleSort} />
              <SortHeader label="Actual Sales" sortField="actualSales" activeSortKey={sortKey} onSort={toggleSort} />
              <SortHeader label="Achv. %" sortField="achievementPercent" activeSortKey={sortKey} onSort={toggleSort} />
              <SortHeader label="Orders" sortField="orders" activeSortKey={sortKey} onSort={toggleSort} />
              <SortHeader label="Collection" sortField="collection" activeSortKey={sortKey} onSort={toggleSort} />
              <th className="p-3 text-right">New Cust.</th>
              <SortHeader label="Incentive" sortField="incentive" activeSortKey={sortKey} onSort={toggleSort} />
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paged.map((row) => {
              const employee = getEmployee(row.employeeId);
              if (!employee) return null;
              const territory = getTerritory(employee.territoryId);
              return (
                <tr
                  key={row.employeeId}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => onSelectEmployee(row.employeeId)}
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xl bg-brand-gradient shadow-sm flex items-center justify-center shrink-0 text-[10px] font-bold text-white">
                        {employee.photoInitials}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{employee.fullName}</p>
                        <p className="text-[10px] text-slate-400">{employee.employeeCode} &middot; {employee.designation}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-slate-600">{territory?.name}</td>
                  <td className="p-3 text-slate-600">{getManagerName(employee.managerId)}</td>
                  <td className="p-3 text-right text-slate-600">{formatCurrency(row.target)}</td>
                  <td className="p-3 text-right font-semibold text-slate-800">{formatCurrency(row.actualSales)}</td>
                  <td className="p-3 text-right">
                    <span className={cn("font-bold", row.achievementPercent < 80 ? "text-rose-600" : row.achievementPercent >= 110 ? "text-emerald-600" : "text-blue-600")}>
                      {row.achievementPercent}%
                    </span>
                  </td>
                  <td className="p-3 text-right text-slate-600">{row.orders}</td>
                  <td className="p-3 text-right text-slate-600">{formatCurrency(row.collectionActual)}</td>
                  <td className="p-3 text-right text-slate-600">{row.newCustomers}</td>
                  <td className="p-3 text-right font-semibold text-emerald-700">{formatCurrency(row.incentive)}</td>
                  <td className="p-3 text-center">
                    <PerformanceStatusBadge status={row.status} className="text-[9px]" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile / tablet cards */}
      <div className="lg:hidden divide-y divide-slate-100">
        {paged.map((row) => {
          const employee = getEmployee(row.employeeId);
          if (!employee) return null;
          const territory = getTerritory(employee.territoryId);
          return (
            <button
              key={row.employeeId}
              onClick={() => onSelectEmployee(row.employeeId)}
              className="w-full text-left p-4 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-brand-gradient shadow-sm flex items-center justify-center shrink-0 text-[10px] font-bold text-white">
                    {employee.photoInitials}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 text-sm truncate">{employee.fullName}</p>
                    <p className="text-[10px] text-slate-400">{employee.employeeCode} &middot; {territory?.name}</p>
                  </div>
                </div>
                <PerformanceStatusBadge status={row.status} className="text-[9px] shrink-0" />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center border-t border-slate-100 pt-3 mt-3">
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-bold">Target</p>
                  <p className="text-xs font-bold text-slate-800">{formatCurrency(row.target)}</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-bold">Achieved</p>
                  <p className="text-xs font-bold text-slate-800">{formatCurrency(row.actualSales)}</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-bold">Achv. %</p>
                  <p className="text-xs font-bold text-slate-800">{row.achievementPercent}%</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center border-t border-slate-100 pt-3 mt-3">
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-bold">Incentive</p>
                  <p className="text-xs font-bold text-emerald-700">{formatCurrency(row.incentive)}</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-bold">Collection</p>
                  <p className="text-xs font-bold text-slate-800">{formatCurrency(row.collectionActual)}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {paged.length === 0 && (
        <div className="p-10 text-center text-sm text-slate-500 flex flex-col items-center gap-2">
          <UserRound className="w-6 h-6 text-slate-300" />
          No employees match your search.
        </div>
      )}

      {/* Pagination */}
      {sorted.length > 0 && (
        <div className="flex items-center justify-between p-3 border-t border-slate-100 text-xs text-slate-500">
          <span>
            Showing {(page_ - 1) * PAGE_SIZE + 1}–{Math.min(page_ * PAGE_SIZE, sorted.length)} of {sorted.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page_ === 1}
              className="p-1.5 rounded-xl border border-slate-200 disabled:opacity-40 hover:bg-slate-50 cursor-pointer disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-semibold text-slate-700">
              {page_} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page_ === totalPages}
              className="p-1.5 rounded-xl border border-slate-200 disabled:opacity-40 hover:bg-slate-50 cursor-pointer disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}
