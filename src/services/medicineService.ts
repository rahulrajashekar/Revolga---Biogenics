import { MEDICINES, Medicine, CATEGORIES, MANUFACTURERS } from "@/lib/mockData";

export const medicineService = {
  async getAll(): Promise<Medicine[]> {
    return [...MEDICINES];
  },

  async getById(id: string): Promise<Medicine | undefined> {
    return MEDICINES.find((m) => m.id === id);
  },

  async getCategories(): Promise<string[]> {
    return [...CATEGORIES];
  },

  async getManufacturers(): Promise<string[]> {
    return [...MANUFACTURERS];
  },

  async search(query: string, category?: string, manufacturer?: string): Promise<Medicine[]> {
    return MEDICINES.filter((m) => {
      const matchQuery =
        !query ||
        m.medicineName.toLowerCase().includes(query.toLowerCase()) ||
        m.genericName.toLowerCase().includes(query.toLowerCase()) ||
        m.composition.toLowerCase().includes(query.toLowerCase());
      const matchCat = !category || category === "All" || m.category === category;
      const matchMfr = !manufacturer || manufacturer === "All" || m.manufacturer === manufacturer;
      return matchQuery && matchCat && matchMfr;
    });
  },

  async create(medicine: Partial<Medicine>): Promise<Medicine> {
    const newMed: Medicine = {
      id: `MED${String(MEDICINES.length + 1).padStart(3, "0")}`,
      medicineName: medicine.medicineName || "New Medicine",
      genericName: medicine.genericName || "",
      brand: medicine.brand || "",
      manufacturer: medicine.manufacturer || MANUFACTURERS[0],
      category: medicine.category || CATEGORIES[0],
      composition: medicine.composition || "",
      dosageForm: medicine.dosageForm || "Tablet",
      strength: medicine.strength || "",
      packSize: medicine.packSize || "10 Tablets",
      unit: medicine.unit || "Strip",
      sku: medicine.sku || `SKU-${Date.now()}`,
      hsnCode: medicine.hsnCode || "30049099",
      mrp: medicine.mrp || 0,
      purchasePrice: medicine.purchasePrice || 0,
      sellingPrice: medicine.sellingPrice || 0,
      discount: medicine.discount || 0,
      gstRate: medicine.gstRate || 12,
      openingStock: medicine.openingStock || 0,
      currentStock: medicine.currentStock || 0,
      minStockLevel: medicine.minStockLevel || 10,
      reorderLevel: medicine.reorderLevel || 20,
      prescriptionRequired: medicine.prescriptionRequired ?? false,
      status: medicine.status || "active",
      notes: medicine.notes,
    };
    MEDICINES.push(newMed);
    return newMed;
  },
};
