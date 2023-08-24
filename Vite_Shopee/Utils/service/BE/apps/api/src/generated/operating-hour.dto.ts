import { Prisma } from "@prisma/client";
import { GeneratedOrganizationEntity } from "./organization.dto";

export class GeneratedOperatingHourEntity {
  id: number;
  schedule?: Prisma.JsonValue;
  exception?: Prisma.JsonValue;
  organization: GeneratedOrganizationEntity;
  organizationId: number;
  createdAt: Date;
  updatedAt: Date;
}
