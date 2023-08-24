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
} from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
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
import { ResourceDto } from './dto/resource.dto';
import { PaginationResourceDto } from './dto/pagination-resource.dto';
import { TransformDtoInterceptor } from '@interceptors/transform-dto.interceptor';
import { ResourceReqInterceptor } from './interceptors/resource-req.interceptor';
import { SentryInterceptor } from '@interceptors/sentry.interceptor';
import { JwtAuthGuard } from '@core/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '@core/casl/guards/policies.guard';
import { CheckPolicies } from '@core/casl/decorators/check-policies.decorator';
import { AppAbility } from '@core/casl/casl-ability.factory';
import { Action } from '@core/casl/enums/action.enum';

@ApiTags('Resources')
@ApiBearerAuth()
@Controller('resources')
@UseInterceptors(ClassSerializerInterceptor)
// @UseInterceptors(SentryInterceptor)
export class ResourceController {
  constructor(
    private readonly resourceService: ResourceService,
    private eventEmitter: EventEmitter2
  ) {}

  @Get('schema')
  @ApiOperation({ summary: 'Resource Schema' })
  @ApiResponse({
    status: 200,
    description: 'The model schema',
    type: FieldSchemaItemsDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(Action.Read, 'Resource') || ability.can(Action.Create, 'Resource') || ability.can(Action.Update, 'Resource')
  )
  async getModelSchema() {
    return this.resourceService.getModelSchema(ResourceDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create Resource' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ResourceDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, 'Resource'))
  @UseInterceptors(new ResourceReqInterceptor(ResourceDto))
  @UseInterceptors(new TransformDtoInterceptor(ResourceDto))
  async create(@Body() createResourceDto: CreateResourceDto, @Req() req) {
    const result = await this.resourceService.create(createResourceDto, req);
    this.eventEmitter.emit('resources.created', result);
    return result;
  }

  @Post('search')
  @HttpCode(200)
  @ApiOperation({ summary: 'List Resource' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: PaginationResourceDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'Resource'))
  @UseInterceptors(new ResourceReqInterceptor(ResourceDto))
  @UseInterceptors(new TransformDtoInterceptor(ResourceDto))
  findAll(@Body() findAllDto: FindAllDto, @Req() req) {
    return this.resourceService.findAll(findAllDto, false, req);
  }

  // @Get('include-trashed')
  // @ApiOperation({ summary: 'List Resource (With Trashed)' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The found record',
  //   type: PaginationResourceDto,
  // })
  // @UseInterceptors(new ResourceReqInterceptor(ResourceDto))
  // @UseInterceptors(new TransformDtoInterceptor(ResourceDto))
  // findAllWithTrashed(@Body() findAllDto: FindAllDto) {
  //   return this.resourceService.findAll(findAllDto, true);
  // }

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Detail Resource' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: ResourceDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'Resource'))
  @UseInterceptors(new ResourceReqInterceptor(ResourceDto))
  @UseInterceptors(new TransformDtoInterceptor(ResourceDto))
  findOne(@Param('id') id: string, @Body() onlySelectDto: OnlySelectDto, @Req() req) {
    return this.resourceService.findOne(+id, onlySelectDto, false, req);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Detail Resource' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ResourceDto
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, 'Resource'))
  @UseInterceptors(new ResourceReqInterceptor(ResourceDto))
  @UseInterceptors(new TransformDtoInterceptor(ResourceDto))
  async update(@Param('id') id: string, @Body() updateResourceDto: UpdateResourceDto, @Req() req) {
    const result = await this.resourceService.update(+id, updateResourceDto, req);
    this.eventEmitter.emit('resources.updated', result);
    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete A resource' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.'
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, 'Resource'))
  @UseInterceptors(new ResourceReqInterceptor(ResourceDto))
  async remove(@Param('id') id: string, @Req() req) {
    const result = await this.resourceService.remove(+id, req);
    this.eventEmitter.emit('resources.deleted', result);
    return result;
  }
}