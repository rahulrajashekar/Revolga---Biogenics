# Phase 2 — Configuration Engine & Multi-Business System Architecture

## Executive Overview

**Phase 2** establishes the core foundation of the multi-tenant SaaS application: the **Configuration Engine**. Rather than building hardcoded, separate applications for different business verticals, the entire application UI (navigation, terminology, forms, invoice document protocols, table headers, and module flags) is dynamically driven by a unified `BusinessConfig` state.

---

## 1. Core Architecture & Multi-Business Mapping

The system supports multiple distinct business types using the **exact same codebase and components**:

| Business Name | Business Type | Product Label | Customer Label | Sales Invoice | Purchase Invoice | Quote / Estimate | Dispatch / Note | Stock Inventory |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Colour World Paints** | `paint_shop` | **Paint** | **Customer** | **Sales Bill** | Purchase Bill | Quotation | Delivery Note | Paint Stock |
| **MedCare Distributors** | `medical_distributor` | **Medicine** | **Dealer** | **Tax Invoice** | Purchase Bill | Proforma Invoice | Delivery Challan | Batch Inventory |
| **Kerala Hardware Centre** | `hardware_shop` | **Item** | **Customer** | **Sales Invoice** | Purchase Bill | Quotation | Delivery Note | Stock Inventory |
| **ABC Digital Services** | `service_business` | **Service** | **Client** | **Service Invoice** | Contractor Bill | Estimate | Scope Document | *Disabled (N/A)* |

---

## 2. Configuration Engine Specifications

### Unified Schema Definitions (`src/types/config.ts`)
- **`BusinessTerminology`**: Dictionary mapping domain terms (`customer`, `supplier`, `product`, `invoice`, `purchase`, `quotation`, `inventory`, `deliveryNote`, `creditNote`, `paymentReceipt`, `taxLabel`).
- **`BusinessModules`**: Dynamic boolean flags enabling/disabling application sections (`sales`, `purchases`, `inventory`, `customers`, `suppliers`, `expenses`, `payments`, `employees`, `reports`, `documents`).
- **`ProductFieldConfig`**: Dynamic schema for catalog inputs and table headers (`key`, `label`, `type`, `required`, `options`, `unit`, `showInTable`).
- **`DocumentTypeConfig`**: Configuration for document numbering prefixes, layout templates, and workflow protocols (`prefix`, `template`, `requiresDelivery`, `supportsBatches`).

### Pre-Configured Demo Profiles (`src/config/demoBusinesses.ts`)
1. **Colour World Paints** (`paint_shop`):
   - Custom fields: Brand, Colour Shade/Code, Finish, Pack Size, Unit, GST %.
   - Document Types: Sales Bill (`CWP-BILL`), Quotation (`CWP-QT`), Delivery Note (`CWP-DN`), Purchase Invoice (`CWP-PUR`).
2. **MedCare Distributors** (`medical_distributor`):
   - Custom fields: Generic Name, Pharma Manufacturer, Batch Number, Expiry Date, HSN Code, MRP, GST %.
   - Document Types: Tax Invoice (`MED-INV`), Purchase Bill (`MED-PB`), Delivery Challan (`MED-DC`), Credit Note (`MED-CN`).
3. **Kerala Hardware Centre** (`hardware_shop`):
   - Custom fields: Category, Brand, Dimension / Size, Material Grade, SKU, Unit, GST %.
   - Document Types: Sales Invoice (`KHC-INV`), Quotation (`KHC-QT`), Vendor Bill (`KHC-VB`), Delivery Note (`KHC-DN`).
4. **ABC Digital Services** (`service_business`):
   - Custom fields: Service Category, Billing Model, Deliverable Scope, Estimated Hours, SAC Code, GST %.
   - Document Types: Service Invoice (`ADS-INV`), Estimate (`ADS-EST`), Payment Receipt (`ADS-REC`).
   - Module constraint: `inventory: false` (Physical stock tracking automatically disabled).

---

## 3. Generic Components (Strict Anti-Duplication Rule)

To prevent code duplication, **zero vertical-specific dashboard or page files were created** (no `PaintShopDashboard.tsx`, no `MedicalDashboard.tsx`). Instead, all components consume `BusinessConfig`:

1. **`DynamicSummaryDashboard.tsx`**: Consumes `currentBusiness` and `t()` helper to render cards, active metrics, business headers, and quick profile switchers.
2. **`DynamicProductForm.tsx`**: Dynamically generates form inputs (text, select, date, number) based on `currentBusiness.productFields`.
3. **`DynamicDocumentPreview.tsx`**: Dynamically formats invoice documents with company details, active prefixes, GST breakdown, and dynamic table rows.
4. **`DynamicTerminologyTable.tsx`**: Comparative matrix showcasing real-time domain mapping across all business profiles.
5. **`ConfigCustomizer.tsx`**: Real-time terminology override editor and module toggle control panel.
6. **`ConfigInspector.tsx`**: Live JSON payload viewer and schema inspector.

---

## 4. Verification & Testing

- **Build Validation**: Executed `npm run build` — TypeScript static analysis and Next.js page generation completed cleanly with zero errors.
- **Browser Subagent Verification**: Verified real-time business switching across Paint Shop, Medical Wholesaler, Hardware Store, and IT Services on `http://localhost:3005`.
