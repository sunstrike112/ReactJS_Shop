import { Prisma } from "@prisma/client";
import { GeneratedUserEntity } from "./user.dto";
import { GeneratedOrganizationEntity } from "./organization.dto";
import { GeneratedRoleEntity } from "./role.dto";

export class GeneratedUserPermissionEntity {
  id: number;
  user?: GeneratedUserEntity;
  userId?: number;
  organization?: GeneratedOrganizationEntity;
  organizationId?: number;
  role?: GeneratedRoleEntity;
  roleId?: number;
  permissions?: Prisma.JsonValue;
  forbidden?: Prisma.JsonValue;
}
