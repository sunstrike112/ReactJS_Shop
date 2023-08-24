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
  ExecutionContext,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserPermissionsDto, UpdateUserDto, UserPermissionsDto } from './dto/update-user.dto';
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
} from '@nestjs/swagger';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserDto } from './dto/user.dto';
import { PaginationUserDto } from './dto/pagination-user.dto';
import { TransformDtoInterceptor } from '@interceptors/transform-dto.interceptor';
import { UserReqInterceptor } from './interceptors/user-req.interceptor';
import { SentryInterceptor } from '@interceptors/sentry.interceptor';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '../casl/guards/policies.guard';
import { CheckPolicies } from '../casl/decorators/check-policies.decorator';
import { AppAbility } from '../casl/casl-ability.factory';
import { Action } from '../casl/enums/action.enum';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
// @UseInterceptors(SentryInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private eventEmitter: EventEmitter2
  ) {}

  @Get('schema')
  @ApiOperation({ summary: 'User Schema' })
  @ApiResponse({
    status: 200,
    description: 'The model schema',
    type: FieldSchemaItemsDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(Action.Read, 'User') || ability.can(Action.Create, 'User') || ability.can(Action.Update, 'User')
  )
  async getModelSchema() {
    return this.userService.getModelSchema(UserDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create User by Admin' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: UserDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, 'User'))
  @UseInterceptors(new UserReqInterceptor(UserDto))
  @UseInterceptors(new TransformDtoInterceptor(UserDto))
  async create(@Body() createUserDto: CreateUserDto, @Req() req) {
    const result = await this.userService.createUser(createUserDto, req);
    return result;
  }

  @Post('search')
  @HttpCode(200)
  @ApiOperation({ summary: 'List User' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: PaginationUserDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'User'))
  @UseInterceptors(new UserReqInterceptor(UserDto))
  @UseInterceptors(new TransformDtoInterceptor(UserDto))
  findAll(@Body() findAllDto: FindAllDto, @Req() req) {
    return this.userService.findAll(findAllDto, false, req);
  }

  // @Get('include-trashed')
  // @ApiOperation({ summary: 'List User (With Trashed)' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The found record',
  //   type: PaginationUserDto,
  // })
  // @UseInterceptors(new UserReqInterceptor(UserDto))
  // @UseInterceptors(new TransformDtoInterceptor(UserDto))
  // findAllWithTrashed(@Body() findAllDto: FindAllDto) {
  //   return this.userService.findAll(findAllDto, true);
  // }

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Detail User' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: UserDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'User'))
  @UseInterceptors(new UserReqInterceptor(UserDto))
  @UseInterceptors(new TransformDtoInterceptor(UserDto))
  async findOne(@Param('id', ParseIntPipe) id: number, @Body() onlySelectDto: OnlySelectDto, @Req() req) {
    return await this.userService.getUser(id, onlySelectDto, req);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Detail User' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: UserDto
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, 'User'))
  @UseInterceptors(new UserReqInterceptor(UserDto))
  @UseInterceptors(new TransformDtoInterceptor(UserDto))
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto, @Req() req) {
    const result = await this.userService.updateUser(id, updateUserDto, req);
    this.eventEmitter.emit('users.updated', result);
    return result;
  }

  @Patch(':id/permissions')
  @ApiOperation({ summary: 'Update User\'s Permission' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: UserDto
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, 'UserPermission'))
  @UseInterceptors(new UserReqInterceptor(UserDto))
  @UseInterceptors(new TransformDtoInterceptor(UserDto))
  async updatePermissions(
    @Param('id', ParseIntPipe) id: number,
    @Body() permissionItemsDto: UserPermissionsDto,
  ) {
    return this.userService.updateUserPermissions(id, permissionItemsDto);
  }

  @Delete(':id/permissions')
  @ApiOperation({ summary: "Delete User's Permission" })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
    type: UserDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Update, 'UserPermission'),
  )
  @UseInterceptors(new UserReqInterceptor(UserDto))
  @UseInterceptors(new TransformDtoInterceptor(UserDto))
  async deletePermissions(
    @Param('id', ParseIntPipe) id: number,
    @Body() deleteUserPermissionDto: DeleteUserPermissionsDto,
  ) {
    return this.userService.deleteUserPermissions(id, deleteUserPermissionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete A user' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, 'User'))
  @UseInterceptors(new UserReqInterceptor(UserDto))
  async remove(@Param('id') id: string, @Req() req) {
    const result = await this.userService.remove(+id, req);
    this.eventEmitter.emit('users.deleted', result);
    return result;
  }
}
