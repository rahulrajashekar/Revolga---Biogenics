import { medicalDistributorConfig } from "@/config/businesses/medical-distributor";

export const documentService = {
  async getDocumentTypes() {
    return medicalDistributorConfig.documentTypes;
  },

  async generateDocumentNumber(typeId: string): Promise<string> {
    const doc = medicalDistributorConfig.documentTypes.find((d) => d.id === typeId);
    const prefix = doc ? doc.prefix : "DOC";
    return `${prefix}-${String(Math.floor(Math.random() * 10000)).padStart(6, "0")}`;
  },
};

export const expenseService = {
  async getExpenses() {
    return [
      { id: "EXP001", date: "2026-09-12", category: "Cold Storage & Refrigeration", amount: 4500, notes: "Electricity bill for medicine cold storage room" },
      { id: "EXP002", date: "2026-09-10", category: "Transportation & Delivery", amount: 2800, notes: "Fuel for delivery vehicle (Kochi - Thrissur route)" },
      { id: "EXP003", date: "2026-09-08", category: "Drug License Renewal Fee", amount: 15000, notes: "Government licensing & inspection fee" },
    ];
  },
};

export const reportService = {
  async getDashboardSummary() {
    return {
      todaysSales: 24356,
      todaysPurchases: 0,
      totalOutstanding: 866026.8,
      totalReceivables: 781226.8,
      totalPayables: 84800,
      totalStockValue: 4820000,
    };
  },
};
