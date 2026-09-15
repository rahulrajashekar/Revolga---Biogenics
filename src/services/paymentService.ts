import { PAYMENTS, Payment, CUSTOMERS, SUPPLIERS } from "@/lib/mockData";

export const paymentService = {
  async getPayments(): Promise<Payment[]> {
    return [...PAYMENTS];
  },

  async getReceivables() {
    return CUSTOMERS.filter((c) => c.outstandingBalance > 0);
  },

  async getPayables() {
    return SUPPLIERS.filter((s) => s.outstandingPayable > 0);
  },

  async recordPayment(payment: Partial<Payment>): Promise<Payment> {
    const newPay: Payment = {
      id: `PAY${String(PAYMENTS.length + 1).padStart(3, "0")}`,
      date: payment.date || new Date().toISOString().split("T")[0],
      type: payment.type || "receivable",
      partyId: payment.partyId || "CUST001",
      partyName: payment.partyName || "Party",
      invoiceRef: payment.invoiceRef || "",
      amount: payment.amount || 0,
      method: payment.method || "bank_transfer",
      status: payment.status || "completed",
      notes: payment.notes,
    };
    PAYMENTS.unshift(newPay);
    return newPay;
  },
};
