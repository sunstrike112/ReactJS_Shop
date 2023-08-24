import { Prisma } from "@prisma/client";
import { GeneratedUserEntity } from "./user.dto";
import { GeneratedOrganizationEntity } from "./organization.dto";

export class GeneratedUserDefaultPermissionEntity {
  id: number;
  user?: GeneratedUserEntity;
  userId?: number;
  organization?: GeneratedOrganizationEntity;
  organizationId?: number;
  permissions?: Prisma.JsonValue;
}
