
// ─── MOCK DATA — MEDICAL DISTRIBUTOR ──────────────────────────────────────────
// All data is fictional. No real patient/business info.

export const MANUFACTURERS = [
  "Cipla Ltd.", "Sun Pharma", "Dr. Reddy's", "Lupin Ltd.", "Abbott India",
  "Zydus Lifesciences", "Alkem Laboratories", "Torrent Pharma", "Mankind Pharma", "Glenmark",
];

export const CATEGORIES = [
  "Antibiotics", "Analgesics", "Antidiabetics", "Cardiovascular", "Vitamins & Supplements",
  "Gastroenterology", "Dermatology", "Neurology", "Respiratory", "Ophthalmology",
];

export const DOSAGE_FORMS = ["Tablet", "Capsule", "Syrup", "Injection", "Cream", "Drops", "Inhaler", "Gel", "Ointment", "Powder"];

// ─── MEDICINES ────────────────────────────────────────────────────────────────
export interface Medicine {
  id: string;
  medicineName: string;
  genericName: string;
  brand: string;
  manufacturer: string;
  category: string;
  composition: string;
  dosageForm: string;
  strength: string;
  packSize: string;
  unit: string;
  sku: string;
  hsnCode: string;
  mrp: number;
  purchasePrice: number;
  sellingPrice: number;
  discount: number;
  gstRate: number;
  openingStock: number;
  currentStock: number;
  minStockLevel: number;
  reorderLevel: number;
  prescriptionRequired: boolean;
  status: "active" | "inactive" | "discontinued";
  notes?: string;
}

export const MEDICINES: Medicine[] = [
  { id: "MED001", medicineName: "Dolo 650", genericName: "Paracetamol", brand: "Dolo", manufacturer: "Mankind Pharma", category: "Analgesics", composition: "Paracetamol 650mg", dosageForm: "Tablet", strength: "650mg", packSize: "15 Tablets", unit: "Strip", sku: "DOLO650-15", hsnCode: "30049099", mrp: 30, purchasePrice: 18, sellingPrice: 24, discount: 5, gstRate: 12, openingStock: 500, currentStock: 342, minStockLevel: 100, reorderLevel: 150, prescriptionRequired: false, status: "active" },
  { id: "MED002", medicineName: "Augmentin 625 DUO", genericName: "Amoxicillin+Clavulanic Acid", brand: "Augmentin", manufacturer: "Cipla Ltd.", category: "Antibiotics", composition: "Amoxicillin 500mg + Clavulanate 125mg", dosageForm: "Tablet", strength: "625mg", packSize: "10 Tablets", unit: "Strip", sku: "AUG625-10", hsnCode: "30041099", mrp: 220, purchasePrice: 140, sellingPrice: 185, discount: 5, gstRate: 12, openingStock: 200, currentStock: 89, minStockLevel: 50, reorderLevel: 75, prescriptionRequired: true, status: "active" },
  { id: "MED003", medicineName: "Metformin 500mg", genericName: "Metformin HCl", brand: "Glycomet", manufacturer: "Sun Pharma", category: "Antidiabetics", composition: "Metformin HCl 500mg", dosageForm: "Tablet", strength: "500mg", packSize: "20 Tablets", unit: "Strip", sku: "MET500-20", hsnCode: "30049099", mrp: 45, purchasePrice: 28, sellingPrice: 36, discount: 3, gstRate: 12, openingStock: 600, currentStock: 410, minStockLevel: 100, reorderLevel: 150, prescriptionRequired: true, status: "active" },
  { id: "MED004", medicineName: "Atorvastatin 10mg", genericName: "Atorvastatin", brand: "Lipitor", manufacturer: "Abbott India", category: "Cardiovascular", composition: "Atorvastatin Calcium 10mg", dosageForm: "Tablet", strength: "10mg", packSize: "10 Tablets", unit: "Strip", sku: "ATOR10-10", hsnCode: "30049099", mrp: 85, purchasePrice: 52, sellingPrice: 68, discount: 5, gstRate: 12, openingStock: 300, currentStock: 185, minStockLevel: 60, reorderLevel: 80, prescriptionRequired: true, status: "active" },
  { id: "MED005", medicineName: "Pan-D Capsule", genericName: "Pantoprazole+Domperidone", brand: "Pan-D", manufacturer: "Alkem Laboratories", category: "Gastroenterology", composition: "Pantoprazole 40mg + Domperidone 10mg", dosageForm: "Capsule", strength: "40+10mg", packSize: "15 Capsules", unit: "Strip", sku: "PAND-15", hsnCode: "30049099", mrp: 125, purchasePrice: 78, sellingPrice: 100, discount: 5, gstRate: 12, openingStock: 400, currentStock: 22, minStockLevel: 80, reorderLevel: 100, prescriptionRequired: false, status: "active", notes: "Low Stock" },
  { id: "MED006", medicineName: "Azithromycin 500mg", genericName: "Azithromycin", brand: "Zithromax", manufacturer: "Glenmark", category: "Antibiotics", composition: "Azithromycin 500mg", dosageForm: "Tablet", strength: "500mg", packSize: "3 Tablets", unit: "Strip", sku: "AZITH500-3", hsnCode: "30041099", mrp: 95, purchasePrice: 58, sellingPrice: 76, discount: 5, gstRate: 12, openingStock: 250, currentStock: 167, minStockLevel: 50, reorderLevel: 75, prescriptionRequired: true, status: "active" },
  { id: "MED007", medicineName: "Vitamin D3 60000 IU", genericName: "Cholecalciferol", brand: "D-Rise", manufacturer: "Lupin Ltd.", category: "Vitamins & Supplements", composition: "Cholecalciferol 60000 IU", dosageForm: "Capsule", strength: "60000 IU", packSize: "4 Capsules", unit: "Strip", sku: "VITD3-4", hsnCode: "30049011", mrp: 60, purchasePrice: 36, sellingPrice: 48, discount: 5, gstRate: 5, openingStock: 350, currentStock: 280, minStockLevel: 70, reorderLevel: 100, prescriptionRequired: false, status: "active" },
  { id: "MED008", medicineName: "Cefixime 200mg", genericName: "Cefixime", brand: "Taxim-O", manufacturer: "Alkem Laboratories", category: "Antibiotics", composition: "Cefixime 200mg", dosageForm: "Tablet", strength: "200mg", packSize: "10 Tablets", unit: "Strip", sku: "CEFIX200-10", hsnCode: "30041099", mrp: 140, purchasePrice: 88, sellingPrice: 112, discount: 5, gstRate: 12, openingStock: 200, currentStock: 15, minStockLevel: 40, reorderLevel: 60, prescriptionRequired: true, status: "active", notes: "Critical Low Stock" },
  { id: "MED009", medicineName: "Amlodipine 5mg", genericName: "Amlodipine Besylate", brand: "Amlopres", manufacturer: "Cipla Ltd.", category: "Cardiovascular", composition: "Amlodipine Besylate 5mg", dosageForm: "Tablet", strength: "5mg", packSize: "10 Tablets", unit: "Strip", sku: "AMLO5-10", hsnCode: "30049099", mrp: 38, purchasePrice: 22, sellingPrice: 30, discount: 5, gstRate: 12, openingStock: 500, currentStock: 320, minStockLevel: 100, reorderLevel: 150, prescriptionRequired: true, status: "active" },
  { id: "MED010", medicineName: "Pantoprazole 40mg", genericName: "Pantoprazole", brand: "Pantocid", manufacturer: "Sun Pharma", category: "Gastroenterology", composition: "Pantoprazole Sodium 40mg", dosageForm: "Tablet", strength: "40mg", packSize: "15 Tablets", unit: "Strip", sku: "PANTO40-15", hsnCode: "30049099", mrp: 70, purchasePrice: 42, sellingPrice: 56, discount: 5, gstRate: 12, openingStock: 450, currentStock: 290, minStockLevel: 90, reorderLevel: 130, prescriptionRequired: false, status: "active" },
  { id: "MED011", medicineName: "Telmisartan 40mg", genericName: "Telmisartan", brand: "Telmikind", manufacturer: "Mankind Pharma", category: "Cardiovascular", composition: "Telmisartan 40mg", dosageForm: "Tablet", strength: "40mg", packSize: "10 Tablets", unit: "Strip", sku: "TELMI40-10", hsnCode: "30049099", mrp: 55, purchasePrice: 33, sellingPrice: 44, discount: 5, gstRate: 12, openingStock: 300, currentStock: 198, minStockLevel: 60, reorderLevel: 90, prescriptionRequired: true, status: "active" },
  { id: "MED012", medicineName: "Cetirizine 10mg", genericName: "Cetirizine HCl", brand: "Zyrtec", manufacturer: "Dr. Reddy's", category: "Respiratory", composition: "Cetirizine HCl 10mg", dosageForm: "Tablet", strength: "10mg", packSize: "10 Tablets", unit: "Strip", sku: "CETIR10-10", hsnCode: "30049099", mrp: 22, purchasePrice: 12, sellingPrice: 16, discount: 5, gstRate: 12, openingStock: 800, currentStock: 620, minStockLevel: 150, reorderLevel: 200, prescriptionRequired: false, status: "active" },
  { id: "MED013", medicineName: "Amoxicillin 500mg", genericName: "Amoxicillin Trihydrate", brand: "Mox", manufacturer: "Ranbaxy (Sun)", category: "Antibiotics", composition: "Amoxicillin 500mg", dosageForm: "Capsule", strength: "500mg", packSize: "10 Capsules", unit: "Strip", sku: "AMOX500-10", hsnCode: "30041099", mrp: 65, purchasePrice: 40, sellingPrice: 52, discount: 5, gstRate: 12, openingStock: 300, currentStock: 185, minStockLevel: 60, reorderLevel: 90, prescriptionRequired: true, status: "active" },
  { id: "MED014", medicineName: "Diclofenac 50mg", genericName: "Diclofenac Sodium", brand: "Voveran", manufacturer: "Novartis (Cipla)", category: "Analgesics", composition: "Diclofenac Sodium 50mg", dosageForm: "Tablet", strength: "50mg", packSize: "10 Tablets", unit: "Strip", sku: "DICLO50-10", hsnCode: "30049099", mrp: 28, purchasePrice: 16, sellingPrice: 21, discount: 5, gstRate: 12, openingStock: 600, currentStock: 412, minStockLevel: 100, reorderLevel: 150, prescriptionRequired: false, status: "active" },
  { id: "MED015", medicineName: "Omeprazole 20mg", genericName: "Omeprazole", brand: "Omez", manufacturer: "Dr. Reddy's", category: "Gastroenterology", composition: "Omeprazole 20mg", dosageForm: "Capsule", strength: "20mg", packSize: "10 Capsules", unit: "Strip", sku: "OMEP20-10", hsnCode: "30049099", mrp: 40, purchasePrice: 24, sellingPrice: 32, discount: 5, gstRate: 12, openingStock: 400, currentStock: 8, minStockLevel: 80, reorderLevel: 100, prescriptionRequired: false, status: "active", notes: "Critical Low Stock" },
  { id: "MED016", medicineName: "Metronidazole 400mg", genericName: "Metronidazole", brand: "Flagyl", manufacturer: "Abbott India", category: "Antibiotics", composition: "Metronidazole 400mg", dosageForm: "Tablet", strength: "400mg", packSize: "15 Tablets", unit: "Strip", sku: "METRO400-15", hsnCode: "30041099", mrp: 35, purchasePrice: 20, sellingPrice: 28, discount: 5, gstRate: 12, openingStock: 350, currentStock: 210, minStockLevel: 70, reorderLevel: 100, prescriptionRequired: true, status: "active" },
  { id: "MED017", medicineName: "Ranitidine 150mg", genericName: "Ranitidine HCl", brand: "Rantac", manufacturer: "J.B. Chemicals", category: "Gastroenterology", composition: "Ranitidine HCl 150mg", dosageForm: "Tablet", strength: "150mg", packSize: "10 Tablets", unit: "Strip", sku: "RANI150-10", hsnCode: "30049099", mrp: 18, purchasePrice: 10, sellingPrice: 14, discount: 5, gstRate: 12, openingStock: 500, currentStock: 330, minStockLevel: 100, reorderLevel: 150, prescriptionRequired: false, status: "active" },
  { id: "MED018", medicineName: "Losartan 50mg", genericName: "Losartan Potassium", brand: "Losacar", manufacturer: "Zydus Lifesciences", category: "Cardiovascular", composition: "Losartan Potassium 50mg", dosageForm: "Tablet", strength: "50mg", packSize: "10 Tablets", unit: "Strip", sku: "LOSAR50-10", hsnCode: "30049099", mrp: 48, purchasePrice: 29, sellingPrice: 38, discount: 5, gstRate: 12, openingStock: 280, currentStock: 165, minStockLevel: 60, reorderLevel: 85, prescriptionRequired: true, status: "active" },
  { id: "MED019", medicineName: "Insulin Glargine 100IU", genericName: "Insulin Glargine", brand: "Lantus", manufacturer: "Sanofi", category: "Antidiabetics", composition: "Insulin Glargine 100 IU/ml", dosageForm: "Injection", strength: "100 IU/ml", packSize: "10ml Vial", unit: "Vial", sku: "INSGL100-10", hsnCode: "30043910", mrp: 1200, purchasePrice: 780, sellingPrice: 980, discount: 3, gstRate: 5, openingStock: 100, currentStock: 45, minStockLevel: 20, reorderLevel: 30, prescriptionRequired: true, status: "active" },
  { id: "MED020", medicineName: "Salbutamol Inhaler", genericName: "Salbutamol Sulphate", brand: "Ventolin", manufacturer: "Cipla Ltd.", category: "Respiratory", composition: "Salbutamol 100mcg/dose", dosageForm: "Inhaler", strength: "100mcg", packSize: "200 doses", unit: "Inhaler", sku: "SALB100-INH", hsnCode: "30049021", mrp: 180, purchasePrice: 110, sellingPrice: 148, discount: 5, gstRate: 12, openingStock: 120, currentStock: 75, minStockLevel: 25, reorderLevel: 40, prescriptionRequired: true, status: "active" },
];

// ─── BATCHES ──────────────────────────────────────────────────────────────────
export interface Batch {
  id: string;
  medicineId: string;
  medicineName: string;
  manufacturer: string;
  batchNumber: string;
  mfgDate: string;
  expiryDate: string;
  mrp: number;
  purchaseRate: number;
  sellingRate: number;
  quantity: number;
  freeQuantity: number;
  gстRate: number;
  status: "active" | "near_expiry" | "expired" | "depleted";
}

const today = new Date("2026-09-15");
function daysFromToday(days: number) {
  const d = new Date(today);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export const BATCHES: Batch[] = [
  { id: "BAT001", medicineId: "MED001", medicineName: "Dolo 650", manufacturer: "Mankind Pharma", batchNumber: "DL2026A01", mfgDate: "2026-01-01", expiryDate: daysFromToday(180), mrp: 30, purchaseRate: 18, sellingRate: 24, quantity: 200, freeQuantity: 10, gстRate: 12, status: "active" },
  { id: "BAT002", medicineId: "MED001", medicineName: "Dolo 650", manufacturer: "Mankind Pharma", batchNumber: "DL2025C12", mfgDate: "2025-12-01", expiryDate: daysFromToday(25), mrp: 30, purchaseRate: 17, sellingRate: 23, quantity: 142, freeQuantity: 0, gстRate: 12, status: "near_expiry" },
  { id: "BAT003", medicineId: "MED002", medicineName: "Augmentin 625 DUO", manufacturer: "Cipla Ltd.", batchNumber: "AUG2026B02", mfgDate: "2026-02-01", expiryDate: daysFromToday(400), mrp: 220, purchaseRate: 140, sellingRate: 185, quantity: 89, freeQuantity: 5, gстRate: 12, status: "active" },
  { id: "BAT004", medicineId: "MED003", medicineName: "Metformin 500mg", manufacturer: "Sun Pharma", batchNumber: "MET2026A03", mfgDate: "2026-03-01", expiryDate: daysFromToday(600), mrp: 45, purchaseRate: 28, sellingRate: 36, quantity: 410, freeQuantity: 20, gстRate: 12, status: "active" },
  { id: "BAT005", medicineId: "MED005", medicineName: "Pan-D Capsule", manufacturer: "Alkem Laboratories", batchNumber: "PAND2025B11", mfgDate: "2025-11-01", expiryDate: daysFromToday(55), mrp: 125, purchaseRate: 78, sellingRate: 100, quantity: 22, freeQuantity: 0, gстRate: 12, status: "near_expiry" },
  { id: "BAT006", medicineId: "MED008", medicineName: "Cefixime 200mg", manufacturer: "Alkem Laboratories", batchNumber: "CEF2026A04", mfgDate: "2026-04-01", expiryDate: daysFromToday(550), mrp: 140, purchaseRate: 88, sellingRate: 112, quantity: 15, freeQuantity: 0, gстRate: 12, status: "active" },
  { id: "BAT007", medicineId: "MED004", medicineName: "Atorvastatin 10mg", manufacturer: "Abbott India", batchNumber: "ATOR2026C03", mfgDate: "2026-03-15", expiryDate: daysFromToday(700), mrp: 85, purchaseRate: 52, sellingRate: 68, quantity: 185, freeQuantity: 10, gстRate: 12, status: "active" },
  { id: "BAT008", medicineId: "MED006", medicineName: "Azithromycin 500mg", manufacturer: "Glenmark", batchNumber: "AZ2025D10", mfgDate: "2025-10-01", expiryDate: daysFromToday(-15), mrp: 95, purchaseRate: 58, sellingRate: 76, quantity: 30, freeQuantity: 0, gстRate: 12, status: "expired" },
  { id: "BAT009", medicineId: "MED007", medicineName: "Vitamin D3 60000 IU", manufacturer: "Lupin Ltd.", batchNumber: "VITD2026B02", mfgDate: "2026-02-15", expiryDate: daysFromToday(800), mrp: 60, purchaseRate: 36, sellingRate: 48, quantity: 280, freeQuantity: 15, gстRate: 5, status: "active" },
  { id: "BAT010", medicineId: "MED009", medicineName: "Amlodipine 5mg", manufacturer: "Cipla Ltd.", batchNumber: "AMLO2026A01", mfgDate: "2026-01-15", expiryDate: daysFromToday(500), mrp: 38, purchaseRate: 22, sellingRate: 30, quantity: 320, freeQuantity: 15, gстRate: 12, status: "active" },
  { id: "BAT011", medicineId: "MED010", medicineName: "Pantoprazole 40mg", manufacturer: "Sun Pharma", batchNumber: "PANTO2025B10", mfgDate: "2025-10-01", expiryDate: daysFromToday(-5), mrp: 70, purchaseRate: 42, sellingRate: 56, quantity: 45, freeQuantity: 0, gстRate: 12, status: "expired" },
  { id: "BAT012", medicineId: "MED011", medicineName: "Telmisartan 40mg", manufacturer: "Mankind Pharma", batchNumber: "TELMI2026C04", mfgDate: "2026-04-01", expiryDate: daysFromToday(650), mrp: 55, purchaseRate: 33, sellingRate: 44, quantity: 198, freeQuantity: 10, gстRate: 12, status: "active" },
  { id: "BAT013", medicineId: "MED012", medicineName: "Cetirizine 10mg", manufacturer: "Dr. Reddy's", batchNumber: "CETIR2026A02", mfgDate: "2026-02-01", expiryDate: daysFromToday(750), mrp: 22, purchaseRate: 12, sellingRate: 16, quantity: 620, freeQuantity: 30, gстRate: 12, status: "active" },
  { id: "BAT014", medicineId: "MED015", medicineName: "Omeprazole 20mg", manufacturer: "Dr. Reddy's", batchNumber: "OMEP2025A12", mfgDate: "2025-12-01", expiryDate: daysFromToday(80), mrp: 40, purchaseRate: 24, sellingRate: 32, quantity: 8, freeQuantity: 0, gстRate: 12, status: "near_expiry" },
  { id: "BAT015", medicineId: "MED019", medicineName: "Insulin Glargine 100IU", manufacturer: "Sanofi", batchNumber: "INSGL2026B03", mfgDate: "2026-03-01", expiryDate: daysFromToday(450), mrp: 1200, purchaseRate: 780, sellingRate: 980, quantity: 45, freeQuantity: 2, gстRate: 5, status: "active" },
];

// ─── CUSTOMERS ────────────────────────────────────────────────────────────────
export interface Customer {
  id: string;
  businessName: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  gstin?: string;
  drugLicenseNumber?: string;
  customerType: "pharmacy" | "hospital" | "clinic" | "dealer" | "distributor" | "other";
  creditLimit: number;
  paymentTerms: number;
  outstandingBalance: number;
  status: "active" | "inactive";
}

export const CUSTOMERS: Customer[] = [
  { id: "CUST001", businessName: "Kerala Pharmacy & Stores", contactPerson: "Mr. Suresh Pillai", phone: "+91 94470 12345", email: "suresh@keralapharmacy.in", address: "MG Road", city: "Kochi", gstin: "32AABCK1234D1Z5", drugLicenseNumber: "KL-DL-2024-1234", customerType: "pharmacy", creditLimit: 150000, paymentTerms: 30, outstandingBalance: 45200, status: "active" },
  { id: "CUST002", businessName: "City Medical Hall", contactPerson: "Dr. Anitha Nair", phone: "+91 98470 23456", email: "citymedicalhall@gmail.com", address: "Hospital Road", city: "Thrissur", gstin: "32AABKC5678E1Z8", drugLicenseNumber: "KL-DL-2024-5678", customerType: "pharmacy", creditLimit: 100000, paymentTerms: 21, outstandingBalance: 18600, status: "active" },
  { id: "CUST003", businessName: "Lakeshore Hospital", contactPerson: "Mr. Rajesh Kumar", phone: "+91 94460 34567", email: "pharmacy@lakeshorehospital.com", address: "NH 66, Maradu", city: "Kochi", gstin: "32AABLH9012F1Z2", drugLicenseNumber: "KL-DL-2024-9012", customerType: "hospital", creditLimit: 500000, paymentTerms: 45, outstandingBalance: 182000, status: "active" },
  { id: "CUST004", businessName: "Palazhi Medical Store", contactPerson: "Mr. Mohandas M", phone: "+91 97440 45678", email: "palazhi.med@gmail.com", address: "Palazhi Junction", city: "Kozhikode", gstin: "32AABPM3456G1Z4", drugLicenseNumber: "KL-DL-2024-3456", customerType: "pharmacy", creditLimit: 75000, paymentTerms: 30, outstandingBalance: 12800, status: "active" },
  { id: "CUST005", businessName: "Dr. Priya's Clinic", contactPerson: "Dr. Priya Menon", phone: "+91 96330 56789", email: "priya.clinic@gmail.com", address: "Shastri Road", city: "Kozhikode", drugLicenseNumber: "KL-DL-2024-7890", customerType: "clinic", creditLimit: 30000, paymentTerms: 15, outstandingBalance: 4500, status: "active" },
  { id: "CUST006", businessName: "Malabar Pharma Distributors", contactPerson: "Mr. Arun Varghese", phone: "+91 94001 67890", email: "malabar.pharma@gmail.com", address: "Industrial Estate", city: "Malappuram", gstin: "32AABMP7890H1Z1", drugLicenseNumber: "KL-DL-2024-2345", customerType: "distributor", creditLimit: 300000, paymentTerms: 30, outstandingBalance: 67500, status: "active" },
  { id: "CUST007", businessName: "Saras Medical Stores", contactPerson: "Mrs. Savithri Rajan", phone: "+91 95390 78901", email: "saras.medical@gmail.com", address: "Main Bazaar", city: "Kannur", gstin: "32AABKS1234I1Z7", drugLicenseNumber: "KL-DL-2024-6789", customerType: "pharmacy", creditLimit: 80000, paymentTerms: 30, outstandingBalance: 22100, status: "active" },
  { id: "CUST008", businessName: "ASTER MIMS Hospital", contactPerson: "Mr. Joseph Mathew", phone: "+91 91880 89012", email: "pharmacy@astermims.com", address: "Govindapuram", city: "Kozhikode", gstin: "32AABAM4567J1Z3", drugLicenseNumber: "KL-DL-2024-4567", customerType: "hospital", creditLimit: 1000000, paymentTerms: 45, outstandingBalance: 389000, status: "active" },
  { id: "CUST009", businessName: "Calicut Medical Centre", contactPerson: "Dr. Ramesh Nambiar", phone: "+91 94462 90123", email: "cmc.pharmacy@gmail.com", address: "Thondayad Bypass", city: "Kozhikode", gstin: "32AABCM8901K1Z6", drugLicenseNumber: "KL-DL-2024-8901", customerType: "clinic", creditLimit: 50000, paymentTerms: 21, outstandingBalance: 8900, status: "active" },
  { id: "CUST010", businessName: "Vivek Medical Stores", contactPerson: "Mr. Vivek Krishnan", phone: "+91 98950 01234", email: "vivek.medical@gmail.com", address: "Palarivattom", city: "Kochi", gstin: "32AABVK2345L1Z9", drugLicenseNumber: "KL-DL-2024-0123", customerType: "pharmacy", creditLimit: 90000, paymentTerms: 30, outstandingBalance: 31200, status: "active" },
  { id: "CUST011", businessName: "Kannur Medipark", contactPerson: "Mr. Thomas George", phone: "+91 94470 12350", email: "medipark.kannur@gmail.com", address: "Thavakkara", city: "Kannur", gstin: "32AABKM5678M1Z2", drugLicenseNumber: "KL-DL-2024-5670", customerType: "pharmacy", creditLimit: 60000, paymentTerms: 21, outstandingBalance: 15600, status: "active" },
  { id: "CUST012", businessName: "Kasaragod Community Health Centre", contactPerson: "Dr. Fathima S", phone: "+91 94461 23456", email: "kch.kasaragod@gov.in", address: "District Hospital Road", city: "Kasaragod", drugLicenseNumber: "KL-DL-2024-2356", customerType: "hospital", creditLimit: 200000, paymentTerms: 60, outstandingBalance: 76800, status: "active" },
];

// ─── SUPPLIERS ────────────────────────────────────────────────────────────────
export interface Supplier {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  gstin: string;
  drugLicenseNumber?: string;
  supplierType: "manufacturer" | "distributor";
  paymentTerms: number;
  outstandingPayable: number;
  status: "active" | "inactive";
}

export const SUPPLIERS: Supplier[] = [
  { id: "SUP001", companyName: "Cipla Ltd. — Kerala Division", contactPerson: "Mr. Sanjay Mehta", phone: "+91 98200 11111", email: "kerala@cipla.com", address: "Aluva Industrial Area", city: "Kochi", gstin: "27AAACC4175H1ZP", drugLicenseNumber: "MH-DL-MFG-0001", supplierType: "manufacturer", paymentTerms: 30, outstandingPayable: 125000, status: "active" },
  { id: "SUP002", companyName: "Sun Pharma — South Region", contactPerson: "Mr. Rajan Verma", phone: "+91 98200 22222", email: "south@sunpharma.com", address: "Vyttila Hub", city: "Kochi", gstin: "27AABCS0197M1ZY", drugLicenseNumber: "MH-DL-MFG-0002", supplierType: "manufacturer", paymentTerms: 30, outstandingPayable: 98000, status: "active" },
  { id: "SUP003", companyName: "Mankind Pharma Ltd.", contactPerson: "Ms. Neha Sharma", phone: "+91 98200 33333", email: "kerala@mankindpharma.com", address: "SN Junction", city: "Thrissur", gstin: "07AABCM3818Q1Z5", drugLicenseNumber: "DL-DL-MFG-0003", supplierType: "manufacturer", paymentTerms: 21, outstandingPayable: 56000, status: "active" },
  { id: "SUP004", companyName: "Alkem Laboratories", contactPerson: "Mr. Aditya Singh", phone: "+91 98200 44444", email: "south@alkem.com", address: "MRA Road", city: "Mumbai", gstin: "27AABCA4268N1Z4", supplierType: "manufacturer", paymentTerms: 30, outstandingPayable: 72000, status: "active" },
  { id: "SUP005", companyName: "Lupin Ltd.", contactPerson: "Ms. Priya Joshi", phone: "+91 98200 55555", email: "south@lupin.com", address: "Bangalore Branch", city: "Bangalore", gstin: "29AAACL4338K1ZP", supplierType: "manufacturer", paymentTerms: 30, outstandingPayable: 44000, status: "active" },
  { id: "SUP006", companyName: "Kerala Pharma Wholesale Pvt. Ltd.", contactPerson: "Mr. Biju Varghese", phone: "+91 94470 66666", email: "kpwholesale@gmail.com", address: "Palayam Market", city: "Thiruvananthapuram", gstin: "32AABCK9876B1Z1", drugLicenseNumber: "KL-DL-WHL-0006", supplierType: "distributor", paymentTerms: 15, outstandingPayable: 31000, status: "active" },
  { id: "SUP007", companyName: "Dr. Reddy's Laboratories", contactPerson: "Mr. Anil Kumar", phone: "+91 98200 77777", email: "south@drreddys.com", address: "Hyderabad HO", city: "Hyderabad", gstin: "36AAACR1813G1ZT", supplierType: "manufacturer", paymentTerms: 30, outstandingPayable: 88000, status: "active" },
];

// ─── SALES INVOICES ───────────────────────────────────────────────────────────
export interface SaleItem {
  medicineId: string;
  medicineName: string;
  batchNumber: string;
  expiryDate: string;
  quantity: number;
  freeQuantity: number;
  mrp: number;
  rate: number;
  discount: number;
  gstRate: number;
  taxableValue: number;
  gstAmount: number;
  total: number;
}

export interface SalesInvoice {
  id: string;
  invoiceNumber: string;
  date: string;
  customerId: string;
  customerName: string;
  items: SaleItem[];
  subtotal: number;
  totalDiscount: number;
  taxableAmount: number;
  totalGst: number;
  grandTotal: number;
  paymentStatus: "paid" | "partial" | "credit" | "pending";
  paymentMethod?: string;
  amountPaid: number;
  balance: number;
  notes?: string;
}

export const SALES_INVOICES: SalesInvoice[] = [
  {
    id: "INV001", invoiceNumber: "INV-000001", date: "2026-09-15",
    customerId: "CUST001", customerName: "Kerala Pharmacy & Stores",
    items: [
      { medicineId: "MED001", medicineName: "Dolo 650", batchNumber: "DL2026A01", expiryDate: daysFromToday(180), quantity: 50, freeQuantity: 2, mrp: 30, rate: 24, discount: 5, gstRate: 12, taxableValue: 1200, gstAmount: 144, total: 1344 },
      { medicineId: "MED012", medicineName: "Cetirizine 10mg", batchNumber: "CETIR2026A02", expiryDate: daysFromToday(750), quantity: 30, freeQuantity: 0, mrp: 22, rate: 16, discount: 5, gstRate: 12, taxableValue: 480, gstAmount: 57.6, total: 537.6 },
    ],
    subtotal: 1680, totalDiscount: 84, taxableAmount: 1596, totalGst: 191.52, grandTotal: 1881.6, paymentStatus: "paid", paymentMethod: "upi", amountPaid: 1881.6, balance: 0,
  },
  {
    id: "INV002", invoiceNumber: "INV-000002", date: "2026-09-14",
    customerId: "CUST003", customerName: "Lakeshore Hospital",
    items: [
      { medicineId: "MED003", medicineName: "Metformin 500mg", batchNumber: "MET2026A03", expiryDate: daysFromToday(600), quantity: 100, freeQuantity: 5, mrp: 45, rate: 36, discount: 5, gstRate: 12, taxableValue: 3600, gstAmount: 432, total: 4032 },
      { medicineId: "MED004", medicineName: "Atorvastatin 10mg", batchNumber: "ATOR2026C03", expiryDate: daysFromToday(700), quantity: 80, freeQuantity: 4, mrp: 85, rate: 68, discount: 5, gstRate: 12, taxableValue: 5440, gstAmount: 652.8, total: 6092.8 },
      { medicineId: "MED019", medicineName: "Insulin Glargine 100IU", batchNumber: "INSGL2026B03", expiryDate: daysFromToday(450), quantity: 10, freeQuantity: 0, mrp: 1200, rate: 980, discount: 3, gstRate: 5, taxableValue: 9800, gstAmount: 490, total: 10290 },
    ],
    subtotal: 19840, totalDiscount: 528.5, taxableAmount: 18840, totalGst: 1574.8, grandTotal: 20414.8, paymentStatus: "credit", amountPaid: 0, balance: 20414.8,
  },
  {
    id: "INV003", invoiceNumber: "INV-000003", date: "2026-09-13",
    customerId: "CUST002", customerName: "City Medical Hall",
    items: [
      { medicineId: "MED006", medicineName: "Azithromycin 500mg", batchNumber: "AUG2026B02", expiryDate: daysFromToday(400), quantity: 40, freeQuantity: 2, mrp: 95, rate: 76, discount: 5, gstRate: 12, taxableValue: 3040, gstAmount: 364.8, total: 3404.8 },
      { medicineId: "MED014", medicineName: "Diclofenac 50mg", batchNumber: "AMLO2026A01", expiryDate: daysFromToday(500), quantity: 60, freeQuantity: 0, mrp: 28, rate: 21, discount: 5, gstRate: 12, taxableValue: 1260, gstAmount: 151.2, total: 1411.2 },
    ],
    subtotal: 4300, totalDiscount: 215, taxableAmount: 4085, totalGst: 516, grandTotal: 4816, paymentStatus: "partial", paymentMethod: "bank_transfer", amountPaid: 2500, balance: 2316,
  },
  {
    id: "INV004", invoiceNumber: "INV-000004", date: "2026-09-12",
    customerId: "CUST008", customerName: "ASTER MIMS Hospital",
    items: [
      { medicineId: "MED009", medicineName: "Amlodipine 5mg", batchNumber: "AMLO2026A01", expiryDate: daysFromToday(500), quantity: 200, freeQuantity: 10, mrp: 38, rate: 30, discount: 5, gstRate: 12, taxableValue: 6000, gstAmount: 720, total: 6720 },
      { medicineId: "MED011", medicineName: "Telmisartan 40mg", batchNumber: "TELMI2026C04", expiryDate: daysFromToday(650), quantity: 150, freeQuantity: 8, mrp: 55, rate: 44, discount: 5, gstRate: 12, taxableValue: 6600, gstAmount: 792, total: 7392 },
    ],
    subtotal: 12600, totalDiscount: 630, taxableAmount: 11970, totalGst: 1512, grandTotal: 14112, paymentStatus: "credit", amountPaid: 0, balance: 14112,
  },
  {
    id: "INV005", invoiceNumber: "INV-000005", date: "2026-09-10",
    customerId: "CUST006", customerName: "Malabar Pharma Distributors",
    items: [
      { medicineId: "MED002", medicineName: "Augmentin 625 DUO", batchNumber: "AUG2026B02", expiryDate: daysFromToday(400), quantity: 50, freeQuantity: 2, mrp: 220, rate: 185, discount: 5, gstRate: 12, taxableValue: 9250, gstAmount: 1110, total: 10360 },
      { medicineId: "MED007", medicineName: "Vitamin D3 60000 IU", batchNumber: "VITD2026B02", expiryDate: daysFromToday(800), quantity: 100, freeQuantity: 5, mrp: 60, rate: 48, discount: 5, gstRate: 5, taxableValue: 4800, gstAmount: 240, total: 5040 },
    ],
    subtotal: 14050, totalDiscount: 702, taxableAmount: 13348, totalGst: 1350, grandTotal: 15400, paymentStatus: "paid", paymentMethod: "bank_transfer", amountPaid: 15400, balance: 0,
  },
];

// ─── PURCHASE BILLS ───────────────────────────────────────────────────────────
export interface PurchaseItem {
  medicineId: string;
  medicineName: string;
  batchNumber: string;
  mfgDate: string;
  expiryDate: string;
  quantity: number;
  freeQuantity: number;
  purchaseRate: number;
  mrp: number;
  discount: number;
  gstRate: number;
  taxableValue: number;
  gstAmount: number;
  total: number;
}

export interface PurchaseBill {
  id: string;
  billNumber: string;
  supplierBillNumber?: string;
  date: string;
  supplierId: string;
  supplierName: string;
  items: PurchaseItem[];
  subtotal: number;
  totalDiscount: number;
  taxableAmount: number;
  totalGst: number;
  grandTotal: number;
  paymentStatus: "paid" | "partial" | "pending";
  amountPaid: number;
  balance: number;
  notes?: string;
}

export const PURCHASE_BILLS: PurchaseBill[] = [
  {
    id: "PUR001", billNumber: "PUR-000001", supplierBillNumber: "CIPLA/2026/09/4521", date: "2026-09-10",
    supplierId: "SUP001", supplierName: "Cipla Ltd. — Kerala Division",
    items: [
      { medicineId: "MED002", medicineName: "Augmentin 625 DUO", batchNumber: "AUG2026B02", mfgDate: "2026-02-01", expiryDate: daysFromToday(400), quantity: 100, freeQuantity: 5, purchaseRate: 140, mrp: 220, discount: 5, gstRate: 12, taxableValue: 14000, gstAmount: 1680, total: 15680 },
      { medicineId: "MED009", medicineName: "Amlodipine 5mg", batchNumber: "AMLO2026A01", mfgDate: "2026-01-15", expiryDate: daysFromToday(500), quantity: 500, freeQuantity: 25, purchaseRate: 22, mrp: 38, discount: 5, gstRate: 12, taxableValue: 11000, gstAmount: 1320, total: 12320 },
    ],
    subtotal: 25000, totalDiscount: 1250, taxableAmount: 23750, totalGst: 3000, grandTotal: 28000, paymentStatus: "pending", amountPaid: 0, balance: 28000,
  },
  {
    id: "PUR002", billNumber: "PUR-000002", supplierBillNumber: "SUN/KL/2026/7823", date: "2026-09-08",
    supplierId: "SUP002", supplierName: "Sun Pharma — South Region",
    items: [
      { medicineId: "MED003", medicineName: "Metformin 500mg", batchNumber: "MET2026A03", mfgDate: "2026-03-01", expiryDate: daysFromToday(600), quantity: 600, freeQuantity: 30, purchaseRate: 28, mrp: 45, discount: 5, gstRate: 12, taxableValue: 16800, gstAmount: 2016, total: 18816 },
      { medicineId: "MED010", medicineName: "Pantoprazole 40mg", batchNumber: "PANTO2025B10", mfgDate: "2025-10-01", expiryDate: daysFromToday(-5), quantity: 300, freeQuantity: 15, purchaseRate: 42, mrp: 70, discount: 5, gstRate: 12, taxableValue: 12600, gstAmount: 1512, total: 14112 },
    ],
    subtotal: 29400, totalDiscount: 1470, taxableAmount: 27930, totalGst: 3528, grandTotal: 32928, paymentStatus: "paid", amountPaid: 32928, balance: 0,
  },
];

// ─── PAYMENTS ────────────────────────────────────────────────────────────────
export interface Payment {
  id: string;
  date: string;
  type: "receivable" | "payable";
  partyId: string;
  partyName: string;
  invoiceRef: string;
  amount: number;
  method: "cash" | "bank_transfer" | "upi" | "cheque";
  status: "completed" | "pending" | "failed";
  notes?: string;
}

export const PAYMENTS: Payment[] = [
  { id: "PAY001", date: "2026-09-15", type: "receivable", partyId: "CUST001", partyName: "Kerala Pharmacy & Stores", invoiceRef: "INV-000001", amount: 1881.6, method: "upi", status: "completed" },
  { id: "PAY002", date: "2026-09-13", type: "receivable", partyId: "CUST002", partyName: "City Medical Hall", invoiceRef: "INV-000003", amount: 2500, method: "bank_transfer", status: "completed" },
  { id: "PAY003", date: "2026-09-10", type: "receivable", partyId: "CUST006", partyName: "Malabar Pharma Distributors", invoiceRef: "INV-000005", amount: 15400, method: "bank_transfer", status: "completed" },
  { id: "PAY004", date: "2026-09-12", type: "payable", partyId: "SUP002", partyName: "Sun Pharma — South Region", invoiceRef: "PUR-000002", amount: 32928, method: "bank_transfer", status: "completed" },
  { id: "PAY005", date: "2026-09-14", type: "payable", partyId: "SUP003", partyName: "Mankind Pharma Ltd.", invoiceRef: "PUR-000003", amount: 25000, method: "cheque", status: "pending" },
];

// ─── STOCK MOVEMENTS ─────────────────────────────────────────────────────────
export interface StockMovement {
  id: string;
  date: string;
  type: "purchase" | "sale" | "sales_return" | "purchase_return" | "adjustment" | "opening_stock" | "damaged" | "expired";
  medicineId: string;
  medicineName: string;
  batchNumber: string;
  quantity: number;
  reference: string;
  notes?: string;
}

export const STOCK_MOVEMENTS: StockMovement[] = [
  { id: "MOV001", date: "2026-09-15", type: "sale", medicineId: "MED001", medicineName: "Dolo 650", batchNumber: "DL2026A01", quantity: -50, reference: "INV-000001" },
  { id: "MOV002", date: "2026-09-15", type: "sale", medicineId: "MED012", medicineName: "Cetirizine 10mg", batchNumber: "CETIR2026A02", quantity: -30, reference: "INV-000001" },
  { id: "MOV003", date: "2026-09-10", type: "purchase", medicineId: "MED002", medicineName: "Augmentin 625 DUO", batchNumber: "AUG2026B02", quantity: 100, reference: "PUR-000001" },
  { id: "MOV004", date: "2026-09-08", type: "purchase", medicineId: "MED003", medicineName: "Metformin 500mg", batchNumber: "MET2026A03", quantity: 600, reference: "PUR-000002" },
  { id: "MOV005", date: "2026-09-11", type: "expired", medicineId: "MED010", medicineName: "Pantoprazole 40mg", batchNumber: "PANTO2025B10", quantity: -45, reference: "ADJ-EXPIRY-001", notes: "Batch expired, moved to expiry stock" },
  { id: "MOV006", date: "2026-09-05", type: "adjustment", medicineId: "MED005", medicineName: "Pan-D Capsule", batchNumber: "PAND2025B11", quantity: -15, reference: "ADJ-001", notes: "Physical count adjustment" },
];

// ─── DASHBOARD SUMMARY DATA ───────────────────────────────────────────────────
export const DASHBOARD_STATS = {
  todaysSales: 24356,
  todaysPurchases: 0,
  totalOutstanding: 866026.8,
  totalReceivables: 781226.8,
  totalPayables: 84800,
  totalStockValue: 4820000,
  lowStockMedicines: MEDICINES.filter(m => m.currentStock <= m.minStockLevel).length,
  nearExpiryMedicines: BATCHES.filter(b => b.status === "near_expiry").length,
  expiredMedicines: BATCHES.filter(b => b.status === "expired").length,
};

export const TOP_SELLING_MEDICINES = [
  { name: "Dolo 650", units: 1240, revenue: 29760 },
  { name: "Metformin 500mg", units: 980, revenue: 35280 },
  { name: "Cetirizine 10mg", units: 860, revenue: 13760 },
  { name: "Pantoprazole 40mg", units: 720, revenue: 40320 },
  { name: "Augmentin 625 DUO", units: 540, revenue: 99900 },
];

export const TOP_CUSTOMERS = [
  { name: "ASTER MIMS Hospital", type: "Hospital", outstanding: 389000, totalBusiness: 850000 },
  { name: "Lakeshore Hospital", type: "Hospital", outstanding: 182000, totalBusiness: 420000 },
  { name: "Malabar Pharma Distributors", type: "Distributor", outstanding: 67500, totalBusiness: 380000 },
  { name: "Kerala Pharmacy & Stores", type: "Pharmacy", outstanding: 45200, totalBusiness: 210000 },
  { name: "Vivek Medical Stores", type: "Pharmacy", outstanding: 31200, totalBusiness: 165000 },
];

// ─── SALES RETURNS ───────────────────────────────────────────────────────────
export interface SalesReturn {
  id: string;
  returnNumber: string;
  date: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  medicineId: string;
  medicineName: string;
  batchNumber: string;
  quantity: number;
  reason: "Damaged" | "Expired" | "Wrong Item" | "Excess Quantity" | "Customer Return";
  refundAmount: number;
  status: "approved" | "pending";
}

export const SALES_RETURNS: SalesReturn[] = [
  { id: "SR001", returnNumber: "SR-000001", date: "2026-09-14", invoiceNumber: "INV-000001", customerId: "CUST001", customerName: "Kerala Pharmacy & Stores", medicineId: "MED001", medicineName: "Dolo 650", batchNumber: "DL2026A01", quantity: 5, reason: "Excess Quantity", refundAmount: 120, status: "approved" },
  { id: "SR002", returnNumber: "SR-000002", date: "2026-09-12", invoiceNumber: "INV-000003", customerId: "CUST002", customerName: "City Medical Hall", medicineId: "MED006", medicineName: "Azithromycin 500mg", batchNumber: "AUG2026B02", quantity: 2, reason: "Damaged", refundAmount: 152, status: "approved" },
];

// ─── PURCHASE RETURNS ────────────────────────────────────────────────────────
export interface PurchaseReturn {
  id: string;
  returnNumber: string;
  date: string;
  billNumber: string;
  supplierId: string;
  supplierName: string;
  medicineId: string;
  medicineName: string;
  batchNumber: string;
  quantity: number;
  reason: "Near Expiry" | "Expired" | "Damaged Box" | "Quality Issue" | "Excess Delivery";
  refundAmount: number;
  status: "debited" | "pending";
}

export const PURCHASE_RETURNS: PurchaseReturn[] = [
  { id: "PR001", returnNumber: "PR-000001", date: "2026-09-11", billNumber: "PUR-000001", supplierId: "SUP001", supplierName: "Cipla Ltd. — Kerala Division", medicineId: "MED002", medicineName: "Augmentin 625 DUO", batchNumber: "AUG2026B02", quantity: 10, reason: "Damaged Box", refundAmount: 1400, status: "debited" },
  { id: "PR002", returnNumber: "PR-000002", date: "2026-09-09", billNumber: "PUR-000002", supplierId: "SUP002", supplierName: "Sun Pharma — South Region", medicineId: "MED010", medicineName: "Pantoprazole 40mg", batchNumber: "PANTO2025B10", quantity: 45, reason: "Expired", refundAmount: 1890, status: "debited" },
];

