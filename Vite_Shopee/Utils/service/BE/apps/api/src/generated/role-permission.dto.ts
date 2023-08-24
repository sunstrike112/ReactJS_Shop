import { Prisma } from "@prisma/client";
import { GeneratedRoleEntity } from "./role.dto";

export class GeneratedRolePermissionEntity {
  id: number;
  roleId?: number;
  role?: GeneratedRoleEntity;
  permissions?: Prisma.JsonValue;
}
