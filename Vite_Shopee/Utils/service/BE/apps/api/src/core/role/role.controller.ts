import {
  Controller,
  Req,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  CacheKey,
  CacheTTL,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseIntPipe
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolePermissionDto } from './dto/role.dto';
import { UpdateRoleDto  } from './dto/update-role.dto';
import { FindAllDto, OnlySelectDto } from '@crud/dto/find-all.dto';
import { FieldSchemaDto, FieldSchemaItemsDto } from '@crud/dto/schema.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiExcludeEndpoint,
  ApiSecurity,
  ApiHeader,
} from '@nestjs/swagger';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RoleDto } from './dto/role.dto';
import { PaginationRoleDto } from './dto/pagination-role.dto';
import { TransformDtoInterceptor } from '@interceptors/transform-dto.interceptor';
import { RoleReqInterceptor } from './interceptors/role-req.interceptor';
import { SentryInterceptor } from '@interceptors/sentry.interceptor';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '../casl/guards/policies.guard';
import { CheckPolicies } from '../casl/decorators/check-policies.decorator';
import { AppAbility } from '../casl/casl-ability.factory';
import { Action } from '../casl/enums/action.enum';

@ApiTags('Roles')
@ApiBearerAuth()
@Controller('roles')
@UseInterceptors(ClassSerializerInterceptor)
// @UseInterceptors(SentryInterceptor)
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private eventEmitter: EventEmitter2
  ) {}

  @Get('schema')
  @ApiOperation({ summary: 'Role Schema' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The model schema',
    type: FieldSchemaItemsDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(Action.Read, 'Role') || ability.can(Action.Create, 'Role') || ability.can(Action.Update, 'Role')
  )
  async getModelSchema() {
    return this.roleService.getModelSchema(RoleDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create Role' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: RoleDto,
  })
  @ApiHeader({
    name: 'X-Organization-Id',
    description: 'Organization header',
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, 'Role'))
  @UseInterceptors(new RoleReqInterceptor(RoleDto))
  @UseInterceptors(new TransformDtoInterceptor(RoleDto))
  async create(@Body() createRoleDto: CreateRoleDto, @Req() req) {
    const result = await this.roleService.createRole(createRoleDto, req);
    this.eventEmitter.emit('roles.created', result);
    return result;
  }

  @Post('search')
  @HttpCode(200)
  @ApiOperation({ summary: 'List Role' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found record',
    type: PaginationRoleDto,
  })
  @ApiHeader({
    name: 'X-Organization-Id',
    description: 'Organization header',
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'Role'))
  @UseInterceptors(new RoleReqInterceptor(RoleDto))
  @UseInterceptors(new TransformDtoInterceptor(RoleDto))
  findAll(@Body() findAllDto: FindAllDto, @Req() req) {
    return this.roleService.findAll(findAllDto, false, req);
  }

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Detail Role' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found record',
    type: RoleDto,
  })
  @ApiHeader({
    name: 'X-Organization-Id',
    description: 'Organization header',
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'Role'))
  @UseInterceptors(new RoleReqInterceptor(RoleDto))
  @UseInterceptors(new TransformDtoInterceptor(RoleDto))
  async findOne(@Param('id', ParseIntPipe) id: number, @Body() onlySelectDto: OnlySelectDto, @Req() req) {
    return await this.roleService.getRole(id, onlySelectDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Detail Role' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully updated.',
    type: RoleDto
  })
  @ApiHeader({
    name: 'X-Organization-Id',
    description: 'Organization header',
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, 'Role'))
  @UseInterceptors(new RoleReqInterceptor(RoleDto))
  @UseInterceptors(new TransformDtoInterceptor(RoleDto))
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRoleDto, @Req() req) {
    const result = await this.roleService.updateRole(id, updateRoleDto);
    this.eventEmitter.emit('roles.updated', result);
    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete A role' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully deleted.'
  })
  @ApiHeader({
    name: 'X-Organization-Id',
    description: 'Organization header',
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, 'Role'))
  @UseInterceptors(new RoleReqInterceptor(RoleDto))
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req) {
    const result = await this.roleService.deleteRole(id);
    this.eventEmitter.emit('roles.deleted', result);
    return result;
  }
}
