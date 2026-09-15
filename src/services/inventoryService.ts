import { STOCK_MOVEMENTS, StockMovement, MEDICINES } from "@/lib/mockData";

export const inventoryService = {
  async getMovements(): Promise<StockMovement[]> {
    return [...STOCK_MOVEMENTS];
  },

  async getLowStockMedicines() {
    return MEDICINES.filter((m) => m.currentStock <= m.minStockLevel);
  },

  async recordMovement(movement: Partial<StockMovement>): Promise<StockMovement> {
    const newMov: StockMovement = {
      id: `MOV${String(STOCK_MOVEMENTS.length + 1).padStart(3, "0")}`,
      date: movement.date || new Date().toISOString().split("T")[0],
      type: movement.type || "adjustment",
      medicineId: movement.medicineId || "MED001",
      medicineName: movement.medicineName || "Medicine",
      batchNumber: movement.batchNumber || "BAT001",
      quantity: movement.quantity || 0,
      reference: movement.reference || "ADJ-000",
      notes: movement.notes,
    };
    STOCK_MOVEMENTS.unshift(newMov);
    return newMov;
  },
};
