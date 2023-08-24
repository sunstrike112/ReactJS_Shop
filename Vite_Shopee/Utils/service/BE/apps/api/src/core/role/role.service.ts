import { CACHE_MANAGER, Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { CrudService } from '../crud/crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { Crud } from '@decorators/crud.decorator';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { OnlySelectDto } from '@crud/dto/find-all.dto';
import { ResourceService } from '../resource/resource.service'
import { Action } from '@core/casl/enums/action.enum';
import { MSG_FORBIDDEN_DELETE_ROLE_GLOBAL } from '@constants/messages.constant'
import { globalRoleLevel } from '@constants/variable.const'
import { UpdateRoleDto } from './dto/update-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { isEmpty } from 'lodash';

@Injectable()
@Crud("Role")
export class RoleService extends CrudService {
  // excludeFromSchema = {
  //   list: ['permissions'],
  //   filter: ['permissions'],
  //   form: ['permissions']
  // };

  constructor(
    public prisma: PrismaService,
    public configService: ConfigService,
    @Inject(CACHE_MANAGER) public cacheManager: Cache,
    public resourceService: ResourceService,
  ) {
    super(prisma, configService, cacheManager);
  }

  async getRole(roleId: number, selectDto: OnlySelectDto) {
    const role = await this.findOne(roleId, selectDto);
    const rolePermission = isEmpty(role.rolePermission) ? {} : await this.combineActionAndResource(role);
    return {...role, rolePermission};
  }

  async createRole(createRoleDto: CreateRoleDto, req) {
    const rolePermission = {
      create: createRoleDto.rolePermission ?? {}
    };
    const createRole = {...createRoleDto, rolePermission};
    return await this.create(createRole, req);
  }

  async updateRole(roleId: number, updateRoleDto: UpdateRoleDto) {
    const upsertPermission = {
      upsert: {
        create: updateRoleDto.rolePermission ?? {},
        update: updateRoleDto.rolePermission ?? {}
      }
    };
    const updateRole = {...updateRoleDto, rolePermission: upsertPermission};
    await this.update(roleId, updateRole);
    const updateDto = new OnlySelectDto();
    updateDto.include = { rolePermission: true };
    return await this.getRole(roleId, updateDto);
  }

  async deleteRole(roleId: number) {
    const role = await this.findOne(roleId);
    if (role.level === globalRoleLevel) {
      throw new ForbiddenException(MSG_FORBIDDEN_DELETE_ROLE_GLOBAL);
    }
    return await this.remove(roleId, null, true);
  }

  combineAction(defaultAction, actions, trueValue) {
    let canAction = {...defaultAction};
    actions?.map(action => {
      if (action === Action.Manage) {
        canAction = {
          cancreate: trueValue,
          canread: trueValue,
          canupdate: trueValue,
          candelete: trueValue
        }
      } else {
        canAction[`can${action}`] = trueValue;
      }
    })
    return canAction;
  }

  async combineActionAndResource(role) {
    const { rolePermission } = role;
    const resources: any = await this.resourceService.findAll({ orderBy: { order: 'asc' } });
    const permissions = rolePermission?.permissions ? rolePermission.permissions.reduce((reducePermissions, permission) => {
        const resource = permission.resource;
        if (!reducePermissions[resource]) {
          reducePermissions[resource] = [];
        }
        reducePermissions[resource].push(permission.action);
        return reducePermissions;
      }, {})
    : {};

    const resourcePermission = resources.items.map((resource) => {
      const defaultAction = {
        cancreate: false,
        canread: false,
        canupdate: false,
        candelete: false,
      };

      let permissionsAll = permissions['all'] ? permissions['all'] : [];
      if (permissions[resource.code]) permissionsAll = [...permissionsAll, ...permissions[resource.code]];
      const actions = permissionsAll.length > 0 ? this.combineAction(defaultAction, permissionsAll, true) : defaultAction;
      const { cancreate, canread, canupdate, candelete } = !!resource.disabledActions?.length ? this.combineAction(actions, resource.disabledActions, null) : actions;
      return {
        ...resource,
        canCreate: cancreate,
        canRead: canread,
        canUpdate: canupdate,
        canDelete: candelete
      };
    })

    return {...role, permissions: resourcePermission};
  }
}
