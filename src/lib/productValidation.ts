import { z } from "zod";

// ─── PRODUCT FORM VALIDATION ───────────────────────────────────────────────
// Single source of truth for Add/Edit Product form validation. Base fields
// apply to every product; `superRefine` layers on the conditional
// requirements per product type described in the Products spec.

const optionalText = (max = 200) => z.string().trim().max(max).optional().or(z.literal(""));

export const productFormSchema = z
  .object({
    name: z.string().trim().min(2, "Product name must be at least 2 characters").max(150),
    sku: optionalText(40),
    productType: z.enum(["medicine", "medical_device", "surgical_product", "healthcare_product", "other"], {
      message: "Select a product type",
    }),
    manufacturer: z.string().trim().min(2, "Manufacturer / Brand is required").max(150),
    category: z.string().trim().min(1, "Category is required"),
    unit: z.string().trim().min(1, "Unit is required"),
    description: optionalText(500),
    purchasePrice: z.coerce.number({ error: "Enter a valid amount" }).min(0, "Must be 0 or more"),
    sellingPrice: z.coerce.number({ error: "Enter a valid amount" }).min(0, "Must be 0 or more"),
    gstRate: z.coerce.number({ error: "Enter a valid percentage" }).min(0, "Must be 0 or more").max(100, "Cannot exceed 100%"),
    reorderLevel: z.coerce.number({ error: "Enter a valid quantity" }).min(0, "Must be 0 or more"),
    currentStock: z.coerce.number({ error: "Enter a valid quantity" }).min(0, "Must be 0 or more"),
    status: z.enum(["active", "inactive"]),

    // Medicine
    genericName: optionalText(150),
    strength: optionalText(50),
    dosageForm: optionalText(50),
    packSize: optionalText(50),
    batchTracking: z.boolean().optional(),
    expiryTracking: z.boolean().optional(),

    // Medical Device
    model: optionalText(80),
    warranty: optionalText(50),

    // Shared: Medical Device / Surgical Product / Healthcare Product
    specification: optionalText(300),
    size: optionalText(80),
    material: optionalText(80),

    // Surgical Product
    sterile: z.enum(["sterile", "non_sterile"]).optional(),

    // Healthcare Product
    usageInformation: optionalText(500),
  })
  .superRefine((data, ctx) => {
    if (data.sellingPrice < data.purchasePrice) {
      ctx.addIssue({
        code: "custom",
        path: ["sellingPrice"],
        message: "Selling price should not be lower than purchase price",
      });
    }

    const requireField = (field: keyof typeof data, message: string) => {
      if (!data[field] || String(data[field]).trim() === "") {
        ctx.addIssue({ code: "custom", path: [field], message });
      }
    };

    switch (data.productType) {
      case "medicine":
        requireField("genericName", "Generic name is required for medicines");
        requireField("strength", "Strength is required for medicines");
        requireField("dosageForm", "Dosage form is required for medicines");
        requireField("packSize", "Pack size is required for medicines");
        break;
      case "medical_device":
        requireField("model", "Model is required for medical devices");
        requireField("specification", "Specification is required for medical devices");
        requireField("size", "Size is required for medical devices");
        requireField("material", "Material is required for medical devices");
        break;
      case "surgical_product":
        requireField("specification", "Specification is required for surgical products");
        requireField("size", "Size is required for surgical products");
        requireField("material", "Material is required for surgical products");
        if (!data.sterile) {
          ctx.addIssue({ code: "custom", path: ["sterile"], message: "Select sterile or non-sterile" });
        }
        break;
      case "healthcare_product":
        requireField("specification", "Specification is required for healthcare products");
        requireField("usageInformation", "Usage information is required for healthcare products");
        break;
      case "other":
      default:
        break;
    }
  });

export type ProductFormValues = z.infer<typeof productFormSchema>;

export const PRODUCT_FORM_DEFAULTS: ProductFormValues = {
  name: "",
  sku: "",
  productType: "medicine",
  manufacturer: "",
  category: "",
  unit: "",
  description: "",
  purchasePrice: 0,
  sellingPrice: 0,
  gstRate: 12,
  reorderLevel: 10,
  currentStock: 0,
  status: "active",
  genericName: "",
  strength: "",
  dosageForm: "",
  packSize: "",
  batchTracking: true,
  expiryTracking: true,
  model: "",
  warranty: "",
  specification: "",
  size: "",
  material: "",
  sterile: undefined,
  usageInformation: "",
};
