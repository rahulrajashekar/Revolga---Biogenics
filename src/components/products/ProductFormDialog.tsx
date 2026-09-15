"use client";

import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Package, Save } from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogCloseButton,
  DialogBody,
  DialogFooter,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { zodResolver } from "@/lib/zodResolver";
import { productFormSchema, ProductFormValues, PRODUCT_FORM_DEFAULTS } from "@/lib/productValidation";
import {
  Product,
  PRODUCT_TYPES,
  PRODUCT_CATEGORIES,
  PRODUCT_UNITS,
  PRODUCT_DOSAGE_FORMS,
} from "@/lib/mockData";

export interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  onSubmit: (values: ProductFormValues) => Promise<void>;
}

function productToFormValues(product: Product): ProductFormValues {
  return {
    ...PRODUCT_FORM_DEFAULTS,
    ...product,
    description: product.description || "",
    genericName: product.genericName || "",
    strength: product.strength || "",
    dosageForm: product.dosageForm || "",
    packSize: product.packSize || "",
    model: product.model || "",
    warranty: product.warranty || "",
    specification: product.specification || "",
    size: product.size || "",
    material: product.material || "",
    usageInformation: product.usageInformation || "",
    batchTracking: product.batchTracking ?? true,
    expiryTracking: product.expiryTracking ?? true,
  };
}

export function ProductFormDialog({ open, onOpenChange, product, onSubmit }: ProductFormDialogProps) {
  const isEdit = Boolean(product);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: PRODUCT_FORM_DEFAULTS,
  });

  const productType = useWatch({ control, name: "productType" });

  useEffect(() => {
    if (open) {
      reset(product ? productToFormValues(product) : PRODUCT_FORM_DEFAULTS);
    }
  }, [open, product, reset]);

  const submit = handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-700 shrink-0">
            <Package className="w-4 h-4" />
          </div>
          <div>
            <DialogTitle>{isEdit ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription>
              {isEdit ? `Updating ${product?.name}` : "Add a product to the Revolga Biogenics catalog"}
            </DialogDescription>
          </div>
        </div>
        <DialogCloseButton onClose={() => onOpenChange(false)} />
      </DialogHeader>

      <form onSubmit={submit} className="contents">
        <DialogBody className="space-y-6">
          {/* Common fields */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Basic Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Product Name *" placeholder="e.g. Digital Blood Pressure Monitor" error={errors.name?.message} {...register("name")} />
              <Input label="Product Code / SKU" placeholder="Auto-generated if left blank" error={errors.sku?.message} {...register("sku")} />

              <Select
                label="Product Type *"
                options={PRODUCT_TYPES.map((t) => ({ value: t.value, label: t.label }))}
                error={errors.productType?.message}
                {...register("productType")}
              />
              <Input label="Manufacturer / Brand *" placeholder="e.g. Omron Healthcare" error={errors.manufacturer?.message} {...register("manufacturer")} list="manufacturer-suggestions" />

              <Select
                label="Category *"
                placeholder="Select category..."
                options={PRODUCT_CATEGORIES.map((c) => ({ value: c, label: c }))}
                error={errors.category?.message}
                {...register("category")}
              />
              <Select
                label="Unit *"
                placeholder="Select unit..."
                options={PRODUCT_UNITS.map((u) => ({ value: u, label: u }))}
                error={errors.unit?.message}
                {...register("unit")}
              />

              <Select
                label="Status *"
                options={[
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                ]}
                error={errors.status?.message}
                {...register("status")}
              />
            </div>
            <Textarea label="Description" placeholder="Short description shown on view pages and printouts..." error={errors.description?.message} {...register("description")} />
          </section>

          {/* Pricing / stock */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pricing &amp; Stock</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Input label="Purchase Price (₹) *" type="number" step="0.01" min="0" error={errors.purchasePrice?.message} {...register("purchasePrice")} />
              <Input label="Selling Price (₹) *" type="number" step="0.01" min="0" error={errors.sellingPrice?.message} {...register("sellingPrice")} />
              <Input label="Tax / GST (%) *" type="number" step="0.01" min="0" max="100" error={errors.gstRate?.message} {...register("gstRate")} />
              <Input label="Current Stock" type="number" min="0" error={errors.currentStock?.message} {...register("currentStock")} />
              <Input label="Reorder Level *" type="number" min="0" error={errors.reorderLevel?.message} {...register("reorderLevel")} />
            </div>
          </section>

          {/* Conditional: Medicine */}
          {productType === "medicine" && (
            <section className="space-y-4 rounded-xl border border-emerald-200 bg-emerald-50/40 p-4">
              <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Medicine Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Generic Name *" placeholder="e.g. Paracetamol" error={errors.genericName?.message} {...register("genericName")} />
                <Input label="Strength *" placeholder="e.g. 650mg" error={errors.strength?.message} {...register("strength")} />
                <Select
                  label="Dosage Form *"
                  placeholder="Select dosage form..."
                  options={PRODUCT_DOSAGE_FORMS.map((d) => ({ value: d, label: d }))}
                  error={errors.dosageForm?.message}
                  {...register("dosageForm")}
                />
                <Input label="Pack Size *" placeholder="e.g. 15 Tablets" error={errors.packSize?.message} {...register("packSize")} />
              </div>
              <div className="flex flex-wrap gap-6 pt-1">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <input type="checkbox" className="rounded" {...register("batchTracking")} /> Batch Tracking
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <input type="checkbox" className="rounded" {...register("expiryTracking")} /> Expiry Tracking
                </label>
              </div>
            </section>
          )}

          {/* Conditional: Medical Device */}
          {productType === "medical_device" && (
            <section className="space-y-4 rounded-xl border border-blue-200 bg-blue-50/40 p-4">
              <h3 className="text-xs font-bold text-blue-700 uppercase tracking-wider">Medical Device Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Model *" placeholder="e.g. DGX-200" error={errors.model?.message} {...register("model")} />
                <Input label="Size *" placeholder="e.g. Standard cuff 22-42cm" error={errors.size?.message} {...register("size")} />
                <Input label="Material *" placeholder="e.g. ABS plastic" error={errors.material?.message} {...register("material")} />
                <Input label="Warranty" placeholder="e.g. 2 Years" error={errors.warranty?.message} {...register("warranty")} />
              </div>
              <Textarea label="Specification *" placeholder="Key technical specifications..." error={errors.specification?.message} {...register("specification")} />
            </section>
          )}

          {/* Conditional: Surgical Product */}
          {productType === "surgical_product" && (
            <section className="space-y-4 rounded-xl border border-amber-200 bg-amber-50/40 p-4">
              <h3 className="text-xs font-bold text-amber-700 uppercase tracking-wider">Surgical Product Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Size *" placeholder="e.g. Medium" error={errors.size?.message} {...register("size")} />
                <Input label="Material *" placeholder="e.g. Nitrile" error={errors.material?.message} {...register("material")} />
                <Select
                  label="Sterility *"
                  placeholder="Select sterility..."
                  options={[
                    { value: "sterile", label: "Sterile" },
                    { value: "non_sterile", label: "Non-Sterile" },
                  ]}
                  error={errors.sterile?.message}
                  {...register("sterile")}
                />
              </div>
              <Textarea label="Specification *" placeholder="Key technical specifications..." error={errors.specification?.message} {...register("specification")} />
            </section>
          )}

          {/* Conditional: Healthcare Product */}
          {productType === "healthcare_product" && (
            <section className="space-y-4 rounded-xl border border-purple-200 bg-purple-50/40 p-4">
              <h3 className="text-xs font-bold text-purple-700 uppercase tracking-wider">Healthcare Product Details</h3>
              <Textarea label="Specification *" placeholder="Key specifications..." error={errors.specification?.message} {...register("specification")} />
              <Textarea label="Usage Information *" placeholder="How and when the product should be used..." error={errors.usageInformation?.message} {...register("usageInformation")} />
            </section>
          )}

          {/* Conditional: Other */}
          {productType === "other" && (
            <section className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Other Details</h3>
              <p className="text-xs text-slate-500">
                Use the Description field above for any custom details specific to this product.
              </p>
            </section>
          )}

          <datalist id="manufacturer-suggestions">
            <option value="Cipla Ltd." />
            <option value="Sun Pharma" />
            <option value="Dr. Reddy's" />
            <option value="Abbott India" />
            <option value="Omron Healthcare" />
            <option value="Johnson & Johnson" />
          </datalist>
        </DialogBody>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting} className="gap-1.5">
            {!isSubmitting && <Save className="w-3.5 h-3.5" />}
            {isEdit ? "Save Changes" : "Add Product"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
