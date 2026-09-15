"use client";

import React, { useState } from "react";
import { useBusiness } from "@/context/BusinessContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Code, Copy, Check, FileText, CheckCircle2, AlertCircle } from "lucide-react";

export function ConfigInspector() {
  const { currentBusiness, hasCustomizations, resetBusinessConfig } = useBusiness();
  const [activeTab, setActiveTab] = useState<"schema" | "terminology" | "fields" | "documents" | "modules">("schema");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(currentBusiness, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-slate-800 bg-slate-900 text-slate-100 shadow-xl overflow-hidden">
      {/* Header */}
      <CardHeader className="border-b border-slate-800 bg-slate-950/60 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-blue-400" />
              <CardTitle className="text-base text-white font-bold">
                Configuration Engine Inspector
              </CardTitle>
              {hasCustomizations && (
                <Badge variant="warning" className="text-[10px]">
                  Customized Live
                </Badge>
              )}
            </div>
            <CardDescription className="text-slate-400 text-xs mt-1">
              Active configuration payload driving all UI components for{" "}
              <strong className="text-blue-300 font-semibold">{currentBusiness.businessName}</strong>.
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            {hasCustomizations && (
              <Button
                variant="outline"
                size="sm"
                onClick={resetBusinessConfig}
                className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs"
              >
                Reset Default
              </Button>
            )}
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 text-xs flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy JSON"}</span>
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1 mt-4 pt-2 border-t border-slate-800/60 text-xs font-medium">
          <button
            onClick={() => setActiveTab("schema")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === "schema"
                ? "bg-blue-600 text-white font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
          >
            Raw JSON Payload
          </button>
          <button
            onClick={() => setActiveTab("terminology")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === "terminology"
                ? "bg-blue-600 text-white font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
          >
            Terminology Dictionary ({Object.keys(currentBusiness.terminology).length})
          </button>
          <button
            onClick={() => setActiveTab("fields")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === "fields"
                ? "bg-blue-600 text-white font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
          >
            Product Schema ({currentBusiness.productFields.length} Fields)
          </button>
          <button
            onClick={() => setActiveTab("documents")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === "documents"
                ? "bg-blue-600 text-white font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
          >
            Document Config ({currentBusiness.documentTypes.length} Protocols)
          </button>
          <button
            onClick={() => setActiveTab("modules")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === "modules"
                ? "bg-blue-600 text-white font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
          >
            Module Flags
          </button>
        </div>
      </CardHeader>

      {/* Body Content */}
      <CardContent className="p-4 sm:p-6">
        {activeTab === "schema" && (
          <div className="relative rounded-xl bg-slate-950 p-4 border border-slate-800 max-h-96 overflow-y-auto font-mono text-xs text-blue-300">
            <pre className="whitespace-pre-wrap">{JSON.stringify(currentBusiness, null, 2)}</pre>
          </div>
        )}

        {activeTab === "terminology" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(currentBusiness.terminology).map(([key, val]) => (
              <div
                key={key}
                className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">{key}</span>
                  <span className="text-sm font-bold text-white mt-0.5 block">{String(val)}</span>
                </div>
                <Badge variant="outline" className="border-slate-700 text-slate-400 text-[10px]">
                  Configured
                </Badge>
              </div>
            ))}
          </div>
        )}

        {activeTab === "fields" && (
          <div className="space-y-3">
            <div className="text-xs text-slate-400 mb-2">
              Dynamic inputs injected into forms and table headers for this business type:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentBusiness.productFields.map((field) => {
                const fieldKey = field.id || (field as any).key;
                return (
                  <div
                    key={fieldKey}
                    className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-300">{field.label}</span>
                      <Badge variant="secondary" className="bg-slate-800 text-slate-300 text-[10px]">
                        {field.type}
                      </Badge>
                    </div>
                    <div className="text-[11px] text-slate-400 flex flex-wrap gap-2">
                      <span>ID: <code className="text-amber-300">{fieldKey}</code></span>
                      {field.required && <span className="text-rose-400 font-semibold">• Required</span>}
                      {field.options && <span>• Options: {field.options.length}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentBusiness.documentTypes.map((doc) => (
              <div
                key={doc.id}
                className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex flex-col justify-between space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-amber-400" />
                      <span className="font-bold text-xs text-white">{doc.label}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{doc.description || "Configured invoice workflow"}</p>
                  </div>
                  <Badge variant="outline" className="border-amber-500/30 text-amber-300 text-[10px]">
                    Prefix: {doc.prefix}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60 text-[10px] text-slate-400">
                  <span>Template: <strong className="text-slate-200 capitalize">{doc.template}</strong></span>
                  {doc.requiresDelivery && <span className="text-blue-300">• Dispatch Slip</span>}
                  {doc.supportsBatches && <span className="text-emerald-300">• Batch Tracking</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "modules" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {Object.entries(currentBusiness.modules).map(([modKey, isEnabled]) => (
              <div
                key={modKey}
                className={`p-3 rounded-lg border flex flex-col items-center justify-center text-center space-y-1 ${
                  isEnabled
                    ? "bg-emerald-950/30 border-emerald-800/50 text-emerald-300"
                    : "bg-slate-950/30 border-slate-800 text-slate-500"
                }`}
              >
                {isEnabled ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-slate-600" />
                )}
                <span className="text-xs font-bold capitalize mt-1">{modKey}</span>
                <span className="text-[10px] opacity-75">{isEnabled ? "Enabled" : "Disabled"}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
