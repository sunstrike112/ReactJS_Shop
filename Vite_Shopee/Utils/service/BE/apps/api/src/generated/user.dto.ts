import { GeneratedRoleEntity } from "./role.dto";
import { GeneratedNewsEntity } from "./news.dto";
import { GeneratedUserPermissionEntity } from "./user-permission.dto";
import { GeneratedUserDefaultPermissionEntity } from "./user-default-permission.dto";
import { GeneratedOrganizationEntity } from "./organization.dto";
import { GeneratedCapacityEntity } from "./capacity.dto";
import { GeneratedProvider } from "./provider.enum";
import { GeneratedGender } from "./gender.enum";

export class GeneratedUserEntity {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  addressLine1?: string;
  addressLine2?: string;
  state?: string;
  suburb?: string;
  postCode?: string;
  password?: string;
  provider?: GeneratedProvider;
  gender?: GeneratedGender;
  currentHashedRefreshToken?: string;
  currentHashedForgotPasswordToken?: string;
  emailVerifiedAt?: Date;
  isTwoFactorAuthenticationEnabled?: boolean;
  twoFactorAuthenticationSecret?: string;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  roles: GeneratedRoleEntity[];
  news: GeneratedNewsEntity[];
  userPermissions: GeneratedUserPermissionEntity[];
  userDefaultPermissions: GeneratedUserDefaultPermissionEntity[];
  organizations: GeneratedOrganizationEntity[];
  capacity?: GeneratedCapacityEntity;
}
