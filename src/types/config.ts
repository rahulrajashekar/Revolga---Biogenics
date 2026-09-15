export type BusinessType =
  | "paint_shop"
  | "medical_distributor"
  | "medical_company"
  | "hardware_shop"
  | "service_business"
  | "general_retail"
  | "automobile_spare"
  | "restaurant"
  | "wholesale";

export interface ProductTypeOption {
  id: string;
  label: string;
  requireBatchExpiry?: boolean;
  description?: string;
}

export interface BusinessTerminology {
  customer: string;
  customerPlural: string;
  supplier: string;
  supplierPlural: string;
  product: string;
  productPlural: string;
  brand?: string;
  brandPlural?: string;
  category?: string;
  categoryPlural?: string;
  stock?: string;
  lowStock?: string;
  salesBill?: string;
  salesBillPlural?: string;
  purchaseBill?: string;
  purchaseBillPlural?: string;
  invoice: string;
  invoicePlural: string;
  purchase: string;
  purchasePlural?: string;
  quotation: string;
  quotationPlural?: string;
  estimate: string;
  deliveryNote: string;
  deliveryNotePlural?: string;
  paymentReceipt?: string;
  expense: string;
  inventory?: string;
  creditNote?: string;
  creditNotePlural?: string;
  debitNote?: string;
  debitNotePlural?: string;
  taxLabel?: string;
}

export interface ModuleConfig {
  dashboard: boolean;
  customers: boolean;
  suppliers: boolean;
  products: boolean;
  inventory: boolean;
  sales: boolean;
  purchases: boolean;
  documents: boolean;
  payments: boolean;
  expenses: boolean;
  reports: boolean;
  employees: boolean;
}

export type FieldType =
  | "text"
  | "number"
  | "currency"
  | "select"
  | "multiselect"
  | "date"
  | "boolean"
  | "textarea";

export interface ProductFieldConfig {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  visible?: boolean;
  options?: string[];
  placeholder?: string;
  unit?: string;
  defaultValue?: unknown;
  showInTable?: boolean;
  showInForm?: boolean;
}

export interface DocumentTypeConfig {
  id: string;
  name?: string;
  label?: string;
  shortLabel?: string;
  prefix: string;
  enabled: boolean;
  template?: "classic" | "modern" | "minimal" | "professional";
  numberingEnabled?: boolean;
  requiresDelivery?: boolean;
  supportsBatches?: boolean;
  description?: string;
}

export interface DashboardWidgetConfig {
  id: string;
  title: string;
  type: "metric" | "chart" | "list" | "table";
  enabled: boolean;
  width?: "full" | "half" | "third";
}

export interface PaymentConfig {
  acceptedMethods: ("cash" | "upi" | "card" | "bank_transfer" | "cheque")[];
  defaultMethod: string;
  allowCredit: boolean;
  maxCreditDays?: number;
}

export interface TaxConfig {
  taxSystem: "gst" | "vat" | "sales_tax" | "none";
  defaultGstRate: number;
  gstinRequired: boolean;
  hsnSacRequired: boolean;
  taxLabel: string;
}

export interface NumberingConfig {
  invoicePrefix: string;
  purchasePrefix: string;
  quotationPrefix: string;
  sequenceStart: number;
  resetFrequency: "never" | "yearly" | "monthly";
}

export interface BrandingConfig {
  brandColor: string;
  accentColor?: string;
  logoUrl?: string;
  tagline?: string;
  theme: "light" | "dark" | "system";
}

export interface ExpirySettings {
  nearExpiryDays: number[];
  alertEnabled: boolean;
}

export interface InventorySettings {
  trackBatches: boolean;
  allowNegativeStock: boolean;
  autoDeductOnSale: boolean;
}

export interface WebsiteConfig {
  enabled: boolean;
  pages: string[];
}

export interface BusinessConfig {
  id: string;
  businessType: BusinessType;
  businessName: string;
  tagline?: string;
  logo?: string;
  currency: string;
  language: string;
  gstin?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  branding: BrandingConfig;
  terminology: BusinessTerminology;
  modules: ModuleConfig;
  productFields: ProductFieldConfig[];
  documentTypes: DocumentTypeConfig[];
  dashboardWidgets: DashboardWidgetConfig[];
  paymentConfig: PaymentConfig;
  taxConfig: TaxConfig;
  numberingConfig: NumberingConfig;
  // Phase 3 & 3.6 extensions
  enabled?: boolean;
  productTypes?: ProductTypeOption[];
  expirySettings?: ExpirySettings;
  inventorySettings?: InventorySettings;
  website?: WebsiteConfig;
}

export interface DemoBusinessOption {
  id: string;
  name: string;
  type: BusinessType;
  badge: string;
  description: string;
  config: BusinessConfig;
  enabled?: boolean;
}

export type SubscriptionPlanTier = "starter" | "pro" | "enterprise";

export interface TenantSubscription {
  plan: SubscriptionPlanTier;
  status: "active" | "trialing" | "past_due" | "suspended";
  monthlyPrice: number;
  renewalDate: string;
  maxUsers: number;
  customDomainEnabled: boolean;
}

export interface VendorTenant {
  id: string;
  slug: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  status: "active" | "pending" | "suspended";
  joinedDate: string;
  subscription: TenantSubscription;
  config: BusinessConfig;
}
