"use client";

import React from "react";
import { useBusiness } from "@/context/BusinessContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Table, Check, Store, Pill, Wrench, Laptop, ArrowRight } from "lucide-react";

export function DynamicTerminologyTable() {
  const { currentBusiness, demoOptions, setBusinessById } = useBusiness();

  const getBusinessIcon = (type: string) => {
    switch (type) {
      case "paint_shop":
        return <Store className="w-4 h-4 text-blue-500" />;
      case "medical_distributor":
        return <Pill className="w-4 h-4 text-emerald-500" />;
      case "hardware_shop":
        return <Wrench className="w-4 h-4 text-amber-500" />;
      case "service_business":
        return <Laptop className="w-4 h-4 text-purple-500" />;
      default:
        return <Store className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <Card className="border-slate-200 shadow-md">
      <CardHeader className="bg-slate-50/80 border-b border-slate-200 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Table className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-base font-bold text-slate-900">
                Multi-Business Terminology & Configuration Matrix
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-500 mt-1">
              Side-by-side architectural proof showing how the SAME codebase maps distinct domain terms per business profile.
            </CardDescription>
          </div>
          <Badge variant="default" className="text-xs bg-blue-600 text-white">
            Phase 2 Core Objective
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100/80 text-slate-700 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
            <tr>
              <th className="p-3.5">Business Name & Type</th>
              <th className="p-3.5">Product Label</th>
              <th className="p-3.5">Customer Label</th>
              <th className="p-3.5">Sales Invoice Label</th>
              <th className="p-3.5">Purchase Label</th>
              <th className="p-3.5">Quote / Estimate</th>
              <th className="p-3.5">Dispatch / Note</th>
              <th className="p-3.5 text-center">Stock Inventory</th>
              <th className="p-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-800">
            {demoOptions.map((option) => {
              const isActive = option.id === currentBusiness.id;
              const cfg = option.config;

              return (
                <tr
                  key={option.id}
                  className={`transition-colors ${
                    isActive ? "bg-blue-50/60 font-semibold" : "hover:bg-slate-50"
                  }`}
                >
                  <td className="p-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                        {getBusinessIcon(option.type)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          {option.name}
                          {isActive && (
                            <Badge variant="success" className="text-[9px] py-0 px-1.5">
                              Active
                            </Badge>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500 font-normal">
                          {option.badge} ({option.type})
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="p-3.5">
                    <span className="font-bold text-blue-700">{cfg.terminology.product}</span>
                    <span className="text-[10px] text-slate-400 block">({cfg.terminology.productPlural})</span>
                  </td>

                  <td className="p-3.5 font-semibold text-slate-800">{cfg.terminology.customer}</td>

                  <td className="p-3.5">
                    <Badge variant="outline" className="bg-white border-slate-300 text-slate-800 font-semibold">
                      {cfg.terminology.invoice}
                    </Badge>
                  </td>

                  <td className="p-3.5 text-slate-700">{cfg.terminology.purchase}</td>

                  <td className="p-3.5 text-slate-700">{cfg.terminology.quotation}</td>

                  <td className="p-3.5 text-slate-700">
                    {cfg.terminology.deliveryNote || cfg.terminology.creditNote || "N/A"}
                  </td>

                  <td className="p-3.5 text-center">
                    <Badge variant={cfg.modules.inventory ? "success" : "secondary"}>
                      {cfg.modules.inventory ? cfg.terminology.inventory : "Disabled (N/A)"}
                    </Badge>
                  </td>

                  <td className="p-3.5 text-right">
                    {isActive ? (
                      <span className="text-xs text-blue-600 font-bold flex items-center justify-end gap-1">
                        Selected <Check className="w-3.5 h-3.5 text-blue-600" />
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setBusinessById(option.id)}
                        className="text-xs h-7 border-slate-300 hover:border-blue-500 hover:text-blue-600"
                      >
                        Switch <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
