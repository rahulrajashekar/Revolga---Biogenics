import {
  PRODUCTS,
  Product,
  ProductType,
  PRODUCT_CATEGORIES,
  PRODUCT_UNITS,
  PRODUCT_MANUFACTURERS,
} from "@/lib/mockData";

// ─── PRODUCT SERVICE ───────────────────────────────────────────────────────
// Thin async wrapper around the in-memory PRODUCTS mock array, mirroring the
// shape a real API client would have (getAll/getById/search/create/update).
// Swapping this file's internals for real `fetch` calls is enough to move
// the Products module onto a live backend later — no UI code should change.

const SIMULATED_LATENCY_MS = 350;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS));
}

function generateId(): string {
  const maxNum = PRODUCTS.reduce((max, p) => {
    const num = parseInt(p.id.replace(/\D/g, ""), 10);
    return Number.isFinite(num) ? Math.max(max, num) : max;
  }, 0);
  return `PRD${String(maxNum + 1).padStart(3, "0")}`;
}

function generateSku(name: string): string {
  const base = name.trim().toUpperCase().replace(/[^A-Z0-9]+/g, "").slice(0, 8) || "PROD";
  return `${base}-${Date.now().toString().slice(-5)}`;
}

export interface ProductFilters {
  query?: string;
  productType?: ProductType | "All";
  category?: string | "All";
  status?: Product["status"] | "All";
}

export const productService = {
  async getAll(): Promise<Product[]> {
    return delay([...PRODUCTS]);
  },

  async getById(id: string): Promise<Product | undefined> {
    return delay(PRODUCTS.find((p) => p.id === id));
  },

  async search(filters: ProductFilters = {}): Promise<Product[]> {
    const { query = "", productType, category, status } = filters;
    const q = query.trim().toLowerCase();
    const results = PRODUCTS.filter((p) => {
      const matchQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        (p.genericName || "").toLowerCase().includes(q);
      const matchType = !productType || productType === "All" || p.productType === productType;
      const matchCategory = !category || category === "All" || p.category === category;
      const matchStatus = !status || status === "All" || p.status === status;
      return matchQuery && matchType && matchCategory && matchStatus;
    });
    return delay(results);
  },

  async getCategories(): Promise<string[]> {
    return delay([...PRODUCT_CATEGORIES]);
  },

  async getUnits(): Promise<string[]> {
    return delay([...PRODUCT_UNITS]);
  },

  async getManufacturers(): Promise<string[]> {
    return delay([...PRODUCT_MANUFACTURERS]);
  },

  async create(input: Omit<Product, "id" | "createdAt" | "updatedAt" | "sku"> & { sku?: string }): Promise<Product> {
    const now = new Date().toISOString().split("T")[0];
    const newProduct: Product = {
      ...input,
      id: generateId(),
      sku: input.sku?.trim() || generateSku(input.name),
      createdAt: now,
      updatedAt: now,
    };
    PRODUCTS.unshift(newProduct);
    return delay(newProduct);
  },

  async update(id: string, input: Partial<Omit<Product, "id" | "createdAt">>): Promise<Product> {
    const idx = PRODUCTS.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error(`Product ${id} not found`);
    const updated: Product = {
      ...PRODUCTS[idx],
      ...input,
      updatedAt: new Date().toISOString().split("T")[0],
    };
    PRODUCTS[idx] = updated;
    return delay(updated);
  },

  /** Products are never hard-deleted from the UI — only deactivated. */
  async deactivate(id: string): Promise<Product> {
    return this.update(id, { status: "inactive" });
  },

  async activate(id: string): Promise<Product> {
    return this.update(id, { status: "active" });
  },
};
