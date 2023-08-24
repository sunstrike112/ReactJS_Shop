import { GeneratedGlobalServiceEntity } from "./global-service.dto";
import { GeneratedOrganizationEntity } from "./organization.dto";
import { GeneratedPackageEntity } from "./package.dto";
import { GeneratedBookingServiceEntity } from "./booking-service.dto";
import { GeneratedSelectType } from "./select-type.enum";

export class GeneratedServiceEntity {
  id: number;
  name: string;
  image?: string;
  description?: string;
  selectType: GeneratedSelectType;
  order?: number;
  globalService: GeneratedGlobalServiceEntity;
  globalServiceId: number;
  organization: GeneratedOrganizationEntity;
  organizationId: number;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  packages: GeneratedPackageEntity[];
  bookingServices: GeneratedBookingServiceEntity[];
}
