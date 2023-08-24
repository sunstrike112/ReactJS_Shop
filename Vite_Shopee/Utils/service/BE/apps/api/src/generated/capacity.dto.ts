import { Prisma } from "@prisma/client";
import { GeneratedGlobalCapacityEntity } from "./global-capacity.dto";
import { GeneratedUserEntity } from "./user.dto";
import { GeneratedOrganizationEntity } from "./organization.dto";

export class GeneratedCapacityEntity {
  id: number;
  exception?: Prisma.JsonValue;
  globalCapacity: GeneratedGlobalCapacityEntity;
  globalCapacityId: number;
  technician: GeneratedUserEntity;
  technicianId: number;
  organization: GeneratedOrganizationEntity;
  organizationId: number;
  createdAt: Date;
  updatedAt: Date;
}
