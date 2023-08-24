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
  ParseIntPipe,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
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
import { OrganizationDto } from './dto/organization.dto';
import { PaginationOrganizationDto } from './dto/pagination-organization.dto';
import { TransformDtoInterceptor } from '@interceptors/transform-dto.interceptor';
import { OrganizationReqInterceptor } from './interceptors/organization-req.interceptor';
import { SentryInterceptor } from '@interceptors/sentry.interceptor';
import { JwtAuthGuard } from '@core/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '@core/casl/guards/policies.guard';
import { CheckPolicies } from '@core/casl/decorators/check-policies.decorator';
import { AppAbility } from '@core/casl/casl-ability.factory';
import { Action } from '@core/casl/enums/action.enum';

@ApiTags('Organizations')
@ApiBearerAuth()
@Controller('organizations')
@UseInterceptors(ClassSerializerInterceptor)
// @UseInterceptors(SentryInterceptor)
export class OrganizationController {
  constructor(
    private readonly organizationService: OrganizationService,
    private eventEmitter: EventEmitter2
  ) {}

  @Get('schema')
  @ApiOperation({ summary: 'Organization Schema' })
  @ApiResponse({
    status: 200,
    description: 'The model schema',
    type: FieldSchemaItemsDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(Action.Read, 'Organization') || ability.can(Action.Create, 'Organization') || ability.can(Action.Update, 'Organization')
  )
  async getModelSchema() {
    return this.organizationService.getModelSchema(OrganizationDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create Organization' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: OrganizationDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, 'Organization'))
  @UseInterceptors(new OrganizationReqInterceptor(OrganizationDto))
  @UseInterceptors(new TransformDtoInterceptor(OrganizationDto))
  async create(@Body() createOrganizationDto: CreateOrganizationDto, @Req() req) {
    const result = await this.organizationService.create(createOrganizationDto, req);
    this.eventEmitter.emit('organizations.created', result);
    return result;
  }

  @Post('search')
  @HttpCode(200)
  @ApiOperation({ summary: 'List Organization' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: PaginationOrganizationDto,
  })
  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'Organization'))
  @UseInterceptors(new OrganizationReqInterceptor(OrganizationDto))
  @UseInterceptors(new TransformDtoInterceptor(OrganizationDto))
  findAll(@Body() findAllDto: FindAllDto, @Req() req) {
    return this.organizationService.findAll(findAllDto, false, req);
  }

  // @Get('include-trashed')
  // @ApiOperation({ summary: 'List Organization (With Trashed)' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The found record',
  //   type: PaginationOrganizationDto,
  // })
  // @UseInterceptors(new OrganizationReqInterceptor(OrganizationDto))
  // @UseInterceptors(new TransformDtoInterceptor(OrganizationDto))
  // findAllWithTrashed(@Body() findAllDto: FindAllDto) {
  //   return this.organizationService.findAll(findAllDto, true);
  // }

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Detail Organization' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: OrganizationDto,
  })
  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'Organization'))
  @UseInterceptors(new OrganizationReqInterceptor(OrganizationDto))
  @UseInterceptors(new TransformDtoInterceptor(OrganizationDto))
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() onlySelectDto: OnlySelectDto,
    @Req() req,
  ) {
    return this.organizationService.findOne(id, onlySelectDto, false, req);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Detail Organization' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: OrganizationDto
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, 'Organization'))
  @UseInterceptors(new OrganizationReqInterceptor(OrganizationDto))
  @UseInterceptors(new TransformDtoInterceptor(OrganizationDto))
  async update(@Param('id') id: string, @Body() updateOrganizationDto: UpdateOrganizationDto, @Req() req) {
    const result = await this.organizationService.update(+id, updateOrganizationDto, req);
    this.eventEmitter.emit('organizations.updated', result);
    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete A organization' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.'
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, 'Organization'))
  @UseInterceptors(new OrganizationReqInterceptor(OrganizationDto))
  async remove(@Param('id') id: string, @Req() req) {
    const result = await this.organizationService.remove(+id, req);
    this.eventEmitter.emit('organizations.deleted', result);
    return result;
  }
}