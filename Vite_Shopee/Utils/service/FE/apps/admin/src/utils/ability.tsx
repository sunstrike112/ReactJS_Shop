import { AbilityBuilder, Ability, defineAbility } from '@casl/ability'
import { DEFAULT_ORGANIZATION_ID } from '@ss-fe-fw/constants';

export const updateAbility = (ability, user) => {
  const { can, cannot, rules } = new AbilityBuilder(Ability);
  let { roles, userPermissions, userDefaultPermissions, organizations } = user;
  let xOrganizationId = parseInt(localStorage.getItem('xOrganizationId')) || DEFAULT_ORGANIZATION_ID;

  userPermissions = userPermissions.filter((permission) => permission.organizationId === xOrganizationId);
  userDefaultPermissions = userDefaultPermissions.filter((permission) => permission.organizationId === xOrganizationId);
  const roleIds = userPermissions.map((userPermission) => userPermission.roleId);

  if (roles) {
    // roles.sort((first, second) => (first.level > second.level) ? 1 : -1)
    roles.forEach((role) => {
      if (roleIds.includes(role.id) && role.rolePermission && role.rolePermission.permissions) {
        role.rolePermission.permissions.forEach((permission) => {
          can(permission.action, permission.resource);
        });
      }
    });
  }

  userDefaultPermissions.forEach((userDefaultPermission) => {
    if (userDefaultPermission && userDefaultPermission.permissions) {
      userDefaultPermission.permissions.forEach((permission) => {
        can(permission.action, permission.resource);
      });
    }
  });

  userPermissions.forEach((userPermission) => {
    if (userPermission) {
      if (userPermission.permissions) {
        userPermission.permissions.forEach((permission) => {
          can(permission.action, permission.resource);
        });
      }

      if (userPermission.forbidden) {
        userPermission.forbidden.forEach((permission) => {
          cannot(permission.action, permission.resource);
        });
      }
    }
  });

  ability.update(rules);
}

export default defineAbility((can, cannot) => {});
