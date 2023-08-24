import { GeneratedUserEntity } from "./user.dto";
import { GeneratedRolePermissionEntity } from "./role-permission.dto";
import { GeneratedUserPermissionEntity } from "./user-permission.dto";

export class GeneratedRoleEntity {
  id: number;
  name: string;
  code: string;
  level: number;
  isActive?: boolean;
  isGlobal?: boolean;
  isDefault?: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  users: GeneratedUserEntity[];
  rolePermission?: GeneratedRolePermissionEntity;
  userPermissions: GeneratedUserPermissionEntity[];
}
