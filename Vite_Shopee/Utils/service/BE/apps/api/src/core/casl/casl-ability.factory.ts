import { Injectable, Inject } from '@nestjs/common';
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects
} from '@casl/ability';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { Prisma } from '@prisma/client';
import { Action } from './enums/action.enum';

// type Subjects = InferSubjects<
//   typeof UpdateNewsDto | UpdateNewsDto |
//   typeof NewsDto | NewsDto |
//   typeof UserDto | UserDto
// > | 'all' | 'News';
// type Subjects = 'News' | 'User' | 'Role' | 'all';


export type AppAbility = Ability<[Action, any]>;
// export const AppAbility = Ability as AbilityClass<AppAbility>;
// const { can, build } = new AbilityBuilder(AppAbility);

@Injectable()
export class CaslAbilityFactory {

  constructor(
    private userService: UserService
  ) {}

  async createForUser(user: any, xOrganizationId: number) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, any]>
    >(Ability as AbilityClass<AppAbility>);

    // if (user.isAdmin) {
    //   can(Action.Manage, 'all'); // read-write access to everything
    // } else {
    //   can(Action.Read, 'all'); // read-only access to everything
    // }

    const { roles, userPermissions, userDefaultPermissions } = await this.userService.getPermissionsOfUser(user.id, xOrganizationId);
    
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

    return build();
  }
}
