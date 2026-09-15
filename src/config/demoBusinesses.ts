import { DemoBusinessOption } from "@/types/config";
import {
  paintShopConfig,
  medicalDistributorConfig,
  hardwareShopConfig,
  serviceBusinessConfig,
  generalRetailConfig,
  revolgaBiogenicsConfig,
} from "./businesses";

export {
  paintShopConfig,
  medicalDistributorConfig,
  hardwareShopConfig,
  serviceBusinessConfig,
  generalRetailConfig,
  revolgaBiogenicsConfig,
};

export const demoBusinesses: DemoBusinessOption[] = [
  {
    id: "revolga-biogenics-001",
    name: "Revolga Biogenics",
    type: "medical_company",
    badge: "Medical Company",
    description: "Healthcare & Medical Products Company.",
    config: revolgaBiogenicsConfig,
  },
];
