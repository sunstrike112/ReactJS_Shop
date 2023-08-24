import { GeneratedGlobalServiceEntity } from "./global-service.dto";
import { GeneratedPackageEntity } from "./package.dto";

export class GeneratedGlobalPackageEntity {
  id: number;
  name: string;
  outlinedImage?: string;
  solidImage?: string;
  description?: string;
  jobCode: string;
  estHours: number;
  estValue: number;
  order?: number;
  globalService: GeneratedGlobalServiceEntity;
  globalServiceId: number;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  packages: GeneratedPackageEntity[];
}
