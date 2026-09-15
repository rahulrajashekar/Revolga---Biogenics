import { PURCHASE_BILLS, PurchaseBill, PURCHASE_RETURNS, PurchaseReturn } from "@/lib/mockData";

export const purchaseService = {
  async getBills(): Promise<PurchaseBill[]> {
    return [...PURCHASE_BILLS];
  },

  async getBillById(id: string): Promise<PurchaseBill | undefined> {
    return PURCHASE_BILLS.find((p) => p.id === id);
  },

  async getReturns(): Promise<PurchaseReturn[]> {
    return [...PURCHASE_RETURNS];
  },

  async createBill(bill: Partial<PurchaseBill>): Promise<PurchaseBill> {
    const newBill: PurchaseBill = {
      id: `PUR${String(PURCHASE_BILLS.length + 1).padStart(3, "0")}`,
      billNumber: `PUR-${String(PURCHASE_BILLS.length + 1).padStart(6, "0")}`,
      supplierBillNumber: bill.supplierBillNumber,
      date: bill.date || new Date().toISOString().split("T")[0],
      supplierId: bill.supplierId || "SUP001",
      supplierName: bill.supplierName || "Supplier",
      items: bill.items || [],
      subtotal: bill.subtotal || 0,
      totalDiscount: bill.totalDiscount || 0,
      taxableAmount: bill.taxableAmount || 0,
      totalGst: bill.totalGst || 0,
      grandTotal: bill.grandTotal || 0,
      paymentStatus: bill.paymentStatus || "pending",
      amountPaid: bill.amountPaid || 0,
      balance: (bill.grandTotal || 0) - (bill.amountPaid || 0),
      notes: bill.notes,
    };
    PURCHASE_BILLS.unshift(newBill);
    return newBill;
  },
};
