import { CUSTOMERS, Customer } from "@/lib/mockData";

export const customerService = {
  async getAll(): Promise<Customer[]> {
    return [...CUSTOMERS];
  },

  async getById(id: string): Promise<Customer | undefined> {
    return CUSTOMERS.find((c) => c.id === id);
  },

  async create(customer: Partial<Customer>): Promise<Customer> {
    const newCust: Customer = {
      id: `CUST${String(CUSTOMERS.length + 1).padStart(3, "0")}`,
      businessName: customer.businessName || "New Pharmacy",
      contactPerson: customer.contactPerson || "",
      phone: customer.phone || "",
      email: customer.email || "",
      address: customer.address || "",
      city: customer.city || "Kochi",
      gstin: customer.gstin,
      drugLicenseNumber: customer.drugLicenseNumber,
      customerType: customer.customerType || "pharmacy",
      creditLimit: customer.creditLimit || 50000,
      paymentTerms: customer.paymentTerms || 30,
      outstandingBalance: 0,
      status: "active",
    };
    CUSTOMERS.push(newCust);
    return newCust;
  },
};
