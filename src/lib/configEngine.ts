import { BusinessConfig, DocumentTypeConfig, ProductFieldConfig } from "@/types/config";

/**
 * Format a document number according to the configuration for the active business.
 * Example: CWP-BILL-2026-0001 or MED-INV-2026-0042
 */
export function formatDocumentNumber(config: BusinessConfig, docTypeId: string, sequenceNumber: number = 101): string {
  const docConfig = config.documentTypes.find((d) => d.id === docTypeId) || config.documentTypes[0];
  const prefix = docConfig ? docConfig.prefix : "INV";
  const year = new Date().getFullYear();
  const padded = String(sequenceNumber).padStart(4, "0");
  return `${prefix}-${year}-${padded}`;
}

/**
 * Generate sample dynamic data for a product/item based on configured product fields
 */
export function generateSampleProductData(config: BusinessConfig): Record<string, any> {
  const sampleMap: Record<string, Record<string, any>> = {
    paint_shop: {
      brand: "Asian Paints",
      colourCode: "Royale Blue #0942",
      finish: "Emulsion",
      size: "4 Liters",
      baseType: "Deep Base",
      unit: "Can",
      gst: 18,
      price: 2450,
      stock: 45,
    },
    medical_distributor: {
      genericName: "Paracetamol 650mg (Dolo)",
      manufacturer: "Cipla Pharma Ltd",
      batchNumber: "BATCH-2026-X90",
      expiryDate: "2027-12-31",
      hsn: "30049099",
      mrp: 120,
      schedule: "OTC",
      gst: 12,
      price: 85,
      stock: 500,
    },
    hardware_shop: {
      category: "Plumbing",
      brand: "Supreme Pipes",
      dimension: "1 inch x 3 meters",
      material: "PVC",
      sku: "PVC-PIPE-100",
      unit: "Pieces",
      gst: 18,
      price: 340,
      stock: 120,
    },
    service_business: {
      serviceCategory: "Software Development",
      billingModel: "Fixed Price Scope",
      deliverableScope: "Next.js Architecture & API Integration",
      estimatedHours: 60,
      sacCode: "998314",
      gst: 18,
      price: 45000,
      stock: null, // Service business has no stock!
    },
  };

  return sampleMap[config.businessType] || {
    name: `Sample ${config.terminology.product}`,
    gst: 18,
    price: 1000,
  };
}

/**
 * Get active document types for the business
 */
export function getActiveDocumentTypes(config: BusinessConfig): DocumentTypeConfig[] {
  return config.documentTypes.filter((d) => d.enabled);
}

/**
 * Check if a specific feature parameter is required for the business type
 */
export function requiresPhysicalStock(config: BusinessConfig): boolean {
  return config.modules.inventory && config.businessType !== "service_business";
}
