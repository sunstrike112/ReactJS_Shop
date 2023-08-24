import { GeneratedServiceEntity } from "./service.dto";
import { GeneratedGlobalPackageEntity } from "./global-package.dto";
import { GeneratedBookingPackageEntity } from "./booking-package.dto";

export class GeneratedPackageEntity {
  id: number;
  name: string;
  outlinedImage?: string;
  solidImage?: string;
  description?: string;
  jobCode: string;
  estHours: number;
  estValue: number;
  order?: number;
  service: GeneratedServiceEntity;
  serviceId: number;
  globalPackage: GeneratedGlobalPackageEntity;
  globalPackageId: number;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  bookingPackages: GeneratedBookingPackageEntity[];
}
