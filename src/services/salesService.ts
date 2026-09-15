import { SALES_INVOICES, SalesInvoice, SALES_RETURNS, SalesReturn } from "@/lib/mockData";

export const salesService = {
  async getInvoices(): Promise<SalesInvoice[]> {
    return [...SALES_INVOICES];
  },

  async getInvoiceById(id: string): Promise<SalesInvoice | undefined> {
    return SALES_INVOICES.find((i) => i.id === id);
  },

  async getReturns(): Promise<SalesReturn[]> {
    return [...SALES_RETURNS];
  },

  async createInvoice(invoice: Partial<SalesInvoice>): Promise<SalesInvoice> {
    const newInv: SalesInvoice = {
      id: `INV${String(SALES_INVOICES.length + 1).padStart(3, "0")}`,
      invoiceNumber: `INV-${String(SALES_INVOICES.length + 1).padStart(6, "0")}`,
      date: invoice.date || new Date().toISOString().split("T")[0],
      customerId: invoice.customerId || "CUST001",
      customerName: invoice.customerName || "Customer",
      items: invoice.items || [],
      subtotal: invoice.subtotal || 0,
      totalDiscount: invoice.totalDiscount || 0,
      taxableAmount: invoice.taxableAmount || 0,
      totalGst: invoice.totalGst || 0,
      grandTotal: invoice.grandTotal || 0,
      paymentStatus: invoice.paymentStatus || "credit",
      paymentMethod: invoice.paymentMethod,
      amountPaid: invoice.amountPaid || 0,
      balance: (invoice.grandTotal || 0) - (invoice.amountPaid || 0),
      notes: invoice.notes,
    };
    SALES_INVOICES.unshift(newInv);
    return newInv;
  },
};
