import {
  CACHE_MANAGER,
  Injectable,
  Inject,
  OnModuleInit,
  HttpException,
  HttpStatus,
  NotFoundException,
  ForbiddenException,
  Req
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { PrismaClient, Prisma } from '@prisma/client'
import { PrismaService } from '@core/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { fromString } from 'uuidv4';
import { snakeCase, camelCase } from "change-case";
import { DateTime } from "luxon";
import { modelSchema, listRelations } from '@helpers/prisma.helper'
import { CACHE_KEY_ABILITY_BUILDER_USER } from '@constants/cache.constant';
import { Action } from '@core/casl/enums/action.enum';
import { MSG_FORBIDDEN, MSG_FORBIDDEN_RELATED_RESOURCE, MSG_FORBIDDEN_ORGANIZATION_RESOURCE } from '@constants/messages.constant';
import { defaultOrganizationId, xOrganizationKey } from '@constants/variable.const';
import { plainToClass } from 'class-transformer';

interface IExcludeFromSchema {
  list?: string[];
  filter?: string[];
  form?: string[];
}

@Injectable()
export class CrudService implements OnModuleInit {

  modelName: string;
  cacheKey: string;
  formSchema: any;
  formRelations: any;
  excludeRelationForCheckPermission = [];
  excludeFromSchema: IExcludeFromSchema;
  isSoftDeleted: boolean = true; // true is soft delete, false is hard delete
  hasOrganizationId: boolean = false;

  ttl: number;

  constructor(
    public prisma: PrismaService,
    // public moduleRef: ModuleRef,
    public configService: ConfigService,
    @Inject(CACHE_MANAGER) public cacheManager: Cache,
  ) {
    if (this.modelName !== undefined) {
      this.formSchema = modelSchema(this.modelName);
      this.formRelations = listRelations(this.modelName);
      if (this.formSchema) {
        this.isSoftDeleted = this.formSchema.find((item) => item.name === 'deletedAt') ? true : false;
        this.hasOrganizationId = this.formSchema.find((item) => item.name === 'organizationId') ? true : false;
      }
      this.modelName = camelCase(this.modelName);
      this.cacheKey = `get_${this.modelName}_cache`;
    }
  }

  async onModuleInit() {
    // this.configService = await this.moduleRef.resolve(ConfigService);
    // this.cacheManager = await this.moduleRef.resolve(Cache);
    this.ttl = this.configService.get<number>('CACHE_TTL');
  }

  async getModelSchema(dto?: any) {
    let schema = this.formSchema ?? [];
    let obj = {
      fields: {},
      list: [],
      filter: [],
      form: [],
      relations: []
    };

    if (schema.length > 0) {
      schema.forEach((item) => {
        obj.fields[item.name] = item;
      });
      obj.fields = plainToClass(dto, obj.fields);
      Object.entries(obj.fields).forEach(([, item]: any) => {
        if (!this.excludeFromSchema || !this.excludeFromSchema.list.includes(item.name)) obj.list = [...obj.list, item.name];
        if (!this.excludeFromSchema || !this.excludeFromSchema.filter.includes(item.name)) obj.filter = [...obj.filter, item.name];
        if (!this.excludeFromSchema || !this.excludeFromSchema.form.includes(item.name)) obj.form = [...obj.form, item.name];
      })
    }
    obj.relations = this.formRelations;
    return { items: obj };
  }

  async findAll(params?: {
    page?: number;
    size?: number;
    where?: any;
    select?: any;
    include?: any;
    orderBy?: any;
  }, includeDeleted: boolean = false, req = null) {
    let { page, size, where, select, include, orderBy } = params;
    // Calculate skip, take based on page
    const take = size ?? 10;
    page = page ?? -1;
    let skip = page < 0 ? page : (page - 1) * take;
    skip = isNaN(skip) ? 1 : skip;

    let queryBuilder = {
      skip,
      take,
      where,
      select,
      include,
      orderBy
    };
    // Remove properties of queryBuilder
    if (!where) queryBuilder.where = {};
    if (!select) delete queryBuilder.select;
    if (!include) delete queryBuilder.include;
    if (!orderBy) delete queryBuilder.orderBy;

    if (this.isSoftDeleted && !includeDeleted) queryBuilder.where["deletedAt"] = null;    
    if (this.isSoftDeleted && includeDeleted && queryBuilder.where["deletedAt"] === undefined) {
      queryBuilder.where["deletedAt"] = { "not": null };
    }

    queryBuilder.where = this.handleFilterOrganization(queryBuilder.where, req);

    // If skip is -1, get all data
    if (skip === -1) {
      delete queryBuilder.skip;
      delete queryBuilder.take;
    }

    const cacheKeyUUID = snakeCase(fromString(JSON.stringify(queryBuilder)));
    const cacheExtendKey = `${this.cacheKey}-${cacheKeyUUID}`;
    const cacheValue = await this.cacheManager.get(cacheExtendKey);
    if (cacheValue) return cacheValue;

    const total = await this.prisma[this.modelName].count({
      where: queryBuilder.where
    });
    const totalPages = Math.ceil(total / take);
    const nextPage = page <= totalPages ? totalPages : (page + 1);
    const prevPage = page > 1 ? (page - 1) : 1;
    let items = await this.prisma[this.modelName].findMany(queryBuilder);
    
    await items.map(async (item) => {
      return await this.handleCheckNestedPermission(req, item);
    });

    const results = {
      items: items,
      total: total,
      totalPages: totalPages,
      nextPage: nextPage,
      prevPage: prevPage
    };
    if (!results) throw new NotFoundException(`The ${this.modelName} doesn't existed.`);
    await this.cacheManager.set(cacheExtendKey, results, { ttl: this.ttl });

    return results;
  }

  async findOne(id: number | string | any, _select: any = null, includeDeleted: boolean = false, @Req() req = null) {
    let select = _select !== null ? _select : null;
    let include = null;
    if (_select !== null && _select.hasOwnProperty('select')) {
      select = _select.select;
    }
    if (_select !== null && _select.hasOwnProperty('include')) {
      include = _select.include;
    }
    let where = { id: id };

    if (!['number', 'string'].includes(typeof id)) {
      where = id;
    }
    if (this.isSoftDeleted) where["deletedAt"] = null;
    if (this.isSoftDeleted && includeDeleted) where["deletedAt"] = { "not": null };

    let queryBuilder = {
      where: where
    };
    queryBuilder.where = this.handleFilterOrganization(queryBuilder.where, req);

    if (select !== null && select.constructor.name !== 'OnlySelectDto') queryBuilder['select'] = select;
    if (include !== null && select.constructor.name === 'OnlySelectDto') queryBuilder['include'] = include;

    const cacheKeyUUID = snakeCase(fromString(JSON.stringify(queryBuilder)));
    const cacheExtendKey = `${this.cacheKey}-${cacheKeyUUID}`;
    const cacheValue = await this.cacheManager.get(cacheExtendKey);

    if (cacheValue) return cacheValue;

    let result = await this.prisma[this.modelName].findFirst(queryBuilder);
    result = await this.handleCheckNestedPermission(req, result);
    
    if (!result) throw new NotFoundException(`The ${this.modelName} doesn't existed.`);
    await this.cacheManager.set(cacheExtendKey, result, { ttl: this.ttl });

    return result; 
  }

  handleFilterOrganization(where, req) {
    if (!this.hasOrganizationId || !req) return where;
    
    let xOrganizationId = defaultOrganizationId;
    if (req && req.headers.hasOwnProperty(xOrganizationKey)) xOrganizationId = +req.headers[xOrganizationKey];
    
    this.handleCheckMatchedOrganization(req, xOrganizationId);

    where["organizationId"] = xOrganizationId;

    return where;
  }

  handleCheckMatchedOrganization(req, xOrganizationId) {
    if (!req.user) {
      return;
    }
    const matchedOrganization = req.user.organizations.filter((item) => item.id == xOrganizationId);
    if (matchedOrganization && matchedOrganization.length <= 0) throw new ForbiddenException(MSG_FORBIDDEN_ORGANIZATION_RESOURCE);
  }

  handleOrganizationGuard(req) {
    if (req && this.hasOrganizationId) {
      const xOrganizationId = req.headers['x-organization-id'] ?? defaultOrganizationId;
      this.handleCheckMatchedOrganization(req, +xOrganizationId);
    }
  }

  async create(createDto: any, @Req() req = null) {
    try {
      // check access organization
      this.handleOrganizationGuard(req);

      createDto = await this.handleCheckNestedPermission(req, createDto, true);
      if (createDto == true) throw new ForbiddenException(MSG_FORBIDDEN_RELATED_RESOURCE);
      // if (Array.isArray(createDtoFormatted)) return await this.createMany(createDtoFormatted);

      if (req && this.hasOrganizationId) {
        const xOrganizationId = req.headers['x-organization-id'] ?? defaultOrganizationId;
        createDto['organizationId'] = createDto['organizationId'] ?? +xOrganizationId;
        createDto['organization'] = { connect: { id: createDto['organizationId'] } };

        // check organizationId of dto need matching organizations of login user.
        this.handleCheckMatchedOrganization(req, xOrganizationId);
        // remove createDto['organizationId'] beacause replaced with createDto['organization']
        delete createDto['organizationId']
      }

      const result = await this.createOne(createDto);
      await this.clearCache();

      return result;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      }
      throw e;
    }
  }

  private async createOne(createDto: any) {
    return await this.prisma[this.modelName].create({
      data: createDto
    });
  }

  // private async createMany(createDto: any[]) {
  //   return await this.prisma[this.modelName].createMany({
  //     data: createDto
  //   });
  // }

  async update(id: number | string | any, updateDto: any, @Req() req = null) {
    try {
      // check access organization
      this.handleOrganizationGuard(req);

      updateDto = await this.handleCheckNestedPermission(req, updateDto, true);
      if (updateDto == true) throw new ForbiddenException(MSG_FORBIDDEN_RELATED_RESOURCE);

      if (req && this.hasOrganizationId && updateDto.organizationId) {
        // check organizationId of dto need matching organizations of login user.
        updateDto['organization'] = { connect: { id: updateDto['organizationId'] } };
        this.handleCheckMatchedOrganization(req, updateDto.organizationId);
        // remove updateDto['organizationId'] beacause replaced with updateDto['organization']
        delete updateDto['organizationId']
      }

      let where = { id: id };
      if (!['number', 'string'].includes(typeof id)) {
        where = id;
      }

      const result = await this.prisma[this.modelName].update({
        where: where,
        data: updateDto
      });
      await this.clearCache();

      return result;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      }
      throw e;
    }
  }

  async remove(id: number, @Req() req = null, isForceDeleted: boolean = false) {
    try {
      // check access organization
      this.handleOrganizationGuard(req);
      if (req && this.hasOrganizationId) {
        // check organizationId of dto need matching organizations of login user.
        const item = await this.prisma[this.modelName].findUnique({ where: { id: id } });
        item['organization'] = { connect: { id: item['organizationId'] } };

        this.handleCheckMatchedOrganization(req, item.organizationId);
        
        // remove updateDto['organizationId'] beacause replaced with updateDto['organization']
        delete item['organizationId']
      }

      if (this.isSoftDeleted && isForceDeleted === false) {
        await this.prisma[this.modelName].update({
          where: {
            id: id
          },
          data: {
            deletedAt: new Date()
          }
        });
      } else {
        await this.prisma[this.modelName].delete({
          where: {
            id: id
          }
        });
      }
      
      await this.clearCache();
      return { statusCode: 200, message: `The ${this.modelName} #${id} deleted successfully` };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      }
      throw e;
    }
  }

  async clearCache() {
    const keys: string[] = await this.cacheManager.store.keys();
    keys.forEach((key) => {
      if (key.startsWith(this.cacheKey)) {
        this.cacheManager.del(key);
      }
    })
  }

  async handleCheckNestedPermission(req, item, isForceReturnException = false) {
    const user = req && req.user ? req.user : null;
    if (!user) return item; // Maybe this is public API request
    const cacheKey = `${CACHE_KEY_ABILITY_BUILDER_USER}${user.id}`;
    const ability: any = await this.cacheManager.get(cacheKey);

    if (!ability) return item; // Maybe this is public API request

    // Get list relationship of schema
    let hasForbidden = false;
    this.formSchema.map((field) => {
      if (field.relationName != undefined) {
        field.can = ability.can(Action.Read, field.type);
        if (field.can === false && !this.excludeRelationForCheckPermission.includes(field.type)) {
          if (item && item[field.name]) {
            item[field.name] = MSG_FORBIDDEN;
            hasForbidden = true;
          }
        }
      }
      return field;
    });

    if (isForceReturnException && hasForbidden) return hasForbidden;

    return item;
  }
}
