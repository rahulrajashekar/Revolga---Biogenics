import { BATCHES, Batch } from "@/lib/mockData";

export const batchService = {
  async getAll(): Promise<Batch[]> {
    return [...BATCHES];
  },

  async getByMedicineId(medicineId: string): Promise<Batch[]> {
    return BATCHES.filter((b) => b.medicineId === medicineId);
  },

  async getValidBatchesForSale(medicineId: string): Promise<Batch[]> {
    return BATCHES.filter((b) => b.medicineId === medicineId && b.status !== "expired" && b.quantity > 0);
  },

  async getExpiringBatches(days: number): Promise<Batch[]> {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + days);

    return BATCHES.filter((b) => {
      const exp = new Date(b.expiryDate);
      return exp <= targetDate && b.status !== "expired";
    });
  },

  async getExpiredBatches(): Promise<Batch[]> {
    return BATCHES.filter((b) => b.status === "expired");
  },
};
