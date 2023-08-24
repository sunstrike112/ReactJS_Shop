import { GeneratedGlobalPackageEntity } from "./global-package.dto";
import { GeneratedServiceEntity } from "./service.dto";
import { GeneratedSelectType } from "./select-type.enum";

export class GeneratedGlobalServiceEntity {
  id: number;
  name: string;
  image?: string;
  description?: string;
  selectType: GeneratedSelectType;
  order?: number;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  globalPackages: GeneratedGlobalPackageEntity[];
  services: GeneratedServiceEntity[];
}
