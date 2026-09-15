import { SUPPLIERS, Supplier } from "@/lib/mockData";

export const supplierService = {
  async getAll(): Promise<Supplier[]> {
    return [...SUPPLIERS];
  },

  async getById(id: string): Promise<Supplier | undefined> {
    return SUPPLIERS.find((s) => s.id === id);
  },

  async create(supplier: Partial<Supplier>): Promise<Supplier> {
    const newSup: Supplier = {
      id: `SUP${String(SUPPLIERS.length + 1).padStart(3, "0")}`,
      companyName: supplier.companyName || "New Supplier",
      contactPerson: supplier.contactPerson || "",
      phone: supplier.phone || "",
      email: supplier.email || "",
      address: supplier.address || "",
      city: supplier.city || "Kochi",
      gstin: supplier.gstin || "",
      drugLicenseNumber: supplier.drugLicenseNumber,
      supplierType: supplier.supplierType || "manufacturer",
      paymentTerms: supplier.paymentTerms || 30,
      outstandingPayable: 0,
      status: "active",
    };
    SUPPLIERS.push(newSup);
    return newSup;
  },
};
