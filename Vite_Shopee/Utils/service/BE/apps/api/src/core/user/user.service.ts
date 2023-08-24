import { isEmpty, compact } from 'lodash';
import { OrganizationService } from './../organization/organization.service';
import { RoleService } from './../role/role.service';
import { OnlySelectDto } from '@crud/dto/find-all.dto';
import { CACHE_MANAGER, Injectable, Inject, UnauthorizedException, ExecutionContext, BadRequestException, NotFoundException, HttpException, HttpStatus, forwardRef } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserPermissionsDto, UpdateUserDto, UserPermissionsDto } from './dto/update-user.dto';
import { CrudService } from '../crud/crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { defaultOrganizationId } from '@constants/variable.const';
import { Crud } from '@decorators/crud.decorator';
import { ModuleRef } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MSG_EMAIL_EXISTED } from '@constants/messages.constant';
import { Action } from '@core/casl/enums/action.enum';
import { AuthService } from '@core/auth/auth.service';

@Injectable()
@Crud("User")
export class UserService extends CrudService {

  excludeRelationForCheckPermission = ['Organization', 'UserPermission'];
  excludeFromSchema = {
    list: ['userPermissions'],
    filter: ['userPermissions'],
    form: ['userPermissions']
  };

  constructor(
    public prisma: PrismaService,
    public configService: ConfigService,
    @Inject(CACHE_MANAGER) public cacheManager: Cache,
    private eventEmitter: EventEmitter2,
    public roleService: RoleService,
    public organizationService: OrganizationService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) {
    super(prisma, configService, cacheManager);
  }

  async findUserByEmail(email: string, select: any = {}) {
    const defaultSelect = {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      addressLine1: true,
      addressLine2: true,
      state: true,
      suburb: true,
      postCode: true,
      provider: true,
      gender: true,
      isTwoFactorAuthenticationEnabled: true,
      currentHashedRefreshToken: true,
      roles: {
        where: {
          isActive: true
        },
        select: {
          id: true,
          name: true,
          code: true,
          rolePermission: {
            select: {
              permissions: true,
            }
          },
        },
        orderBy: {
          level: 'asc'
        }
      },
      userPermissions: {
        select: {
          permissions: true,
          forbidden: true,
          organizationId: true,
          roleId: true,
        }
      },
      userDefaultPermissions: {
        select: {
          permissions: true,
          organizationId: true
        }
      },
      organizations: {
        select: {
          id: true,
          name: true,
        }
      }
    };

    const user = await this.findOne(
      {
        email
      },
      Object.keys(select).length ? select : defaultSelect
    );
    // const { password, ...userTransformed } = user;

    return user;
  }

  async setTwoFactorAuthenticationSecret(secret: string, email: string) {
    return this.update({ email: email }, { twoFactorAuthenticationSecret: secret });
  }

  async toggleTwoFactorAuthentication(email: string, isTwoFactorAuthenticationEnabled: boolean) {
    const updateDto = { isTwoFactorAuthenticationEnabled };
    if (!isTwoFactorAuthenticationEnabled) {
      updateDto['twoFactorAuthenticationSecret'] = null;
    }

    await this.update({ email }, updateDto);
  }

  async getPermissionsOfUser(userId: number, organizationId: number) {
    let { roles, userPermissions, userDefaultPermissions } = await this.findOne(userId, {
      roles: {
        where: {
          isActive: true,
        },
        select: {
          id: true,
          code: true,
          rolePermission: {
            select: {
              permissions: true,
            }
          }
        },
        orderBy: {
          level: 'desc'
        }
      },
      userPermissions: {
        where: {
          organizationId: organizationId
        },
        select: {
          permissions: true,
          forbidden: true,
          roleId: true,
        }
      },
      userDefaultPermissions: {
        where: {
          organizationId: organizationId
        },
        select: {
          permissions: true,
        }
      }
    });

    return { roles, userPermissions, userDefaultPermissions };
  }

  async getUser(userId: number, onlySelectDto: OnlySelectDto, req) {
    const user = await this.findOne(userId, onlySelectDto, false, req);
    let roles = user.roles;
    const selectRolePermissions =
      onlySelectDto.include?.roles ?? onlySelectDto.select?.roles;

    if (selectRolePermissions) {
      const combineRole = roles?.map(async (role) => {
        return isEmpty(role.rolePermission)
          ? role
          : await this.roleService.combineActionAndResource(role);
      });

      roles = await Promise.all(combineRole).then((values) => values);
    }
    return { ...user, roles };
  }

  async updateUserPermissions(
    userId: number,
    permissionsDto: UserPermissionsDto,
  ) {
    await this.findOne(userId);
    const organizationId = permissionsDto.organizationId;
    await this.organizationService.findOne(organizationId);

    const roleId = permissionsDto.roleId;
    const permissions = permissionsDto?.permissions ?? [];
    const forbidden = permissionsDto?.forbidden ?? [];

    const userPermissionsDto = {
      organizationId,
      roleId,
      permissions,
      forbidden,
    };

    const { userPermissions } = await this.findOne(userId, {
      select: {
        userPermissions: {
          where: {
            AND: {
              userId,
              organizationId,
            },
          },
        },
      },
    });

    if (roleId) {
      // Add role
      await this.roleService.findOne(roleId);
      const permission = userPermissions.find(
        (permission) =>
          permission.roleId === roleId || permission.roleId === null,
      );

      if (isEmpty(permission)) {
        // Create new UserPermission
        await this.update(userId, {
          organizations: { connect: { id: organizationId } },
          roles: { connect: { id: roleId } },
          userPermissions: { create: userPermissionsDto },
        });
      } else {
        // Update permission, forbidden to UserPermission
        const permissionDto = {
          organizations: { connect: { id: organizationId } },
          userPermissions: {
            update: {
              where: { id: permission.id },
              data: userPermissionsDto,
            },
          },
        };
        if (permission.roleId !== null) {
          permissionDto['roles'] = { connect: { id: roleId } };
        }
        await this.update(userId, permissionDto);
      }
    } else {
      const defaultPermissions = this._getPermissionFromOrg(organizationId);
      // Add organization
      const permission = userPermissions.find(
        (permission) => permission.roleId === null,
      );
      if (isEmpty(permission)) {
        // Create new UserPermission, UserDetaultPermission
        await this.update(userId, {
          organizations: { connect: { id: organizationId } },
          userPermissions: {
            create: userPermissionsDto,
          },
          userDefaultPermissions: {
            upsert: {
              create: { organizationId, permissions: defaultPermissions },
              update: { organizationId, permissions: defaultPermissions },
              where: {
                userId_organizationId: {
                  userId,
                  organizationId
                }
              }
            },
          },
        });
      } else {
        // Update permission, forbidden to UserPermission
        await this.update(userId, {
          organizations: { connect: { id: organizationId } },
          userPermissions: {
            update: {
              where: {
                id: permission.id,
              },
              data: userPermissionsDto,
            },
          },
        });
      }
    }

    return await this._getUserWithPermission(userId);
  }

  async deleteUserPermissions(
    userId: number,
    deleteUserPermissionDto: DeleteUserPermissionsDto,
  ) {
    await this.findOne(userId);
    const organizationId = deleteUserPermissionDto.organizationId;
    await this.organizationService.findOne(organizationId);
    const roleId = deleteUserPermissionDto.roleId;

    if (roleId) {
      // Delete role
      await this.roleService.findOne(roleId);
      const { userPermissions } = await this.findOne(userId, {
        select: {
          userPermissions: {
            where: {
              AND: {
                userId,
                organizationId,
                roleId,
              },
            },
          },
        },
      });

      const userPermissionsDto = {
        update: {
          where: {
            userId_organizationId_roleId: {
              userId,
              organizationId,
              roleId,
            },
          },
          data: { permissions: [], forbidden: [], roleId: null },
        },
      };

      if (userPermissions?.length > 0) {
        await this.update(userId, {
          roles: { disconnect: { id: roleId } },
          userPermissions: userPermissionsDto,
        });
      }
    } else {
      // Delete organization
      const { userPermissions } = await this.findOne(userId, {
        select: {
          userPermissions: {
            where: {
              AND: {
                userId,
                organizationId,
              },
            },
          },
        },
      });

      const roleIdsDto = userPermissions?.map((userPermission) => {
        if (userPermission.roleId) {
          return { id: userPermission.roleId };
        }
      });

      await this.update(userId, {
        roles: { disconnect: compact(roleIdsDto) },
        organizations: { disconnect: { id: organizationId } },
        userPermissions: { deleteMany: { organizationId } },
        userDefaultPermissions: { deleteMany: { organizationId } },
      });
    };

    return await this._getUserWithPermission(userId);
  };

  private async _getUserWithPermission(userId) {
    const selectDto = new OnlySelectDto();
    selectDto.include = {
      roles: { include: { rolePermission: true }},
      news: true,
      organizations: true,
      userPermissions: true,
    };
    return await this.getUser(userId, selectDto, null);
  }

  // async getUserPermissions(id: number) {
  //   return await this.findOne(id, { roles: { select: { rolePermission: true } } });
  // }

  async updateUser(id: number, updateUserDto: UpdateUserDto, req: any) {
    const result = await this.update(id, updateUserDto, req);

    // Update default permission
    const organizations = updateUserDto.organizations;
    if (organizations && organizations.connect && organizations.connect.length) {
      const organizationIds = organizations.connect.map(organization => organization.id);
      await this._updateDefaultPermission(organizationIds, result.id);
    }

    return result;
  }

  async createUser(createUserDto: CreateUserDto, req: any) {
    let user = null;

    try {
      user = await this.findUserByEmail(createUserDto.email, {
        id: true,
        email: true,
        password: true,
      });
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        throw error;
      }
    }

    if (user) {
      if (user.password) {
        throw new BadRequestException(MSG_EMAIL_EXISTED);
      }

      return await this.update(user.id, createUserDto);
    }

    const result = await this.create(createUserDto, req);
    
    // Update default permission
    const organizations = req.body.organizations;
    if (organizations && organizations.connect && organizations.connect.length) {
      const organizationIds = organizations.connect.map(organization => organization.id);
      await this._updateDefaultPermission(organizationIds, result.id);
    }

    this.authService.forgotPassword(result.email);

    return result;
  }

  private async _updateDefaultPermission(organizationIds, userId) {
    const defaultPermissions = organizationIds.map(organizationId => {
      const permissions = this._getPermissionFromOrg(organizationId);
      return {
        organizationId,
        permissions
      }
    });

    await this.update(userId, {
      userDefaultPermissions: {
        deleteMany: {},
        createMany: {
          data: defaultPermissions,
        },
      },
    })
  }

  private _getPermissionFromOrg(organizationId) {
    let action = Action.Update;
    if (organizationId == defaultOrganizationId) {
      action = Action.Manage;
    }

    return [{
      action: action,
      resource: 'Organization',
    }];
  }

  async createSocialUser(user) {
    const createUserDto = {
      ...user,
      organizations: {
        connect: [{id: defaultOrganizationId}]
      }
    }

    return await this.create(createUserDto);
  }
}