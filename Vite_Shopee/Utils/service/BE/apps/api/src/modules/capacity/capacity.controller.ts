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
import { CapacityService } from './capacity.service';
import { CreateCapacityDto } from './dto/create-capacity.dto';
import { UpdateCapacityDto } from './dto/update-capacity.dto';
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
import { CapacityDto } from './dto/capacity.dto';
import { PaginationCapacityDto } from './dto/pagination-capacity.dto';
import { TransformDtoInterceptor } from '@interceptors/transform-dto.interceptor';
import { CapacityReqInterceptor } from './interceptors/capacity-req.interceptor';
import { SentryInterceptor } from '@interceptors/sentry.interceptor';
import { JwtAuthGuard } from '@core/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '@core/casl/guards/policies.guard';
import { CheckPolicies } from '@core/casl/decorators/check-policies.decorator';
import { AppAbility } from '@core/casl/casl-ability.factory';
import { Action } from '@core/casl/enums/action.enum';

@ApiTags('Capacities')
@ApiBearerAuth()
@Controller('capacities')
@UseInterceptors(ClassSerializerInterceptor)
// @UseInterceptors(SentryInterceptor)
export class CapacityController {
  constructor(
    private readonly capacityService: CapacityService,
    private eventEmitter: EventEmitter2
  ) {}

  @Get('schema')
  @ApiOperation({ summary: 'Capacity Schema' })
  @ApiResponse({
    status: 200,
    description: 'The model schema',
    type: FieldSchemaItemsDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(Action.Read, 'Capacity') || ability.can(Action.Create, 'Capacity') || ability.can(Action.Update, 'Capacity')
  )
  async getModelSchema() {
    return this.capacityService.getModelSchema(CapacityDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create Capacity' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CapacityDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, 'Capacity'))
  @UseInterceptors(new CapacityReqInterceptor(CapacityDto))
  @UseInterceptors(new TransformDtoInterceptor(CapacityDto))
  async create(@Body() createCapacityDto: CreateCapacityDto, @Req() req) {
    const result = await this.capacityService.create(createCapacityDto, req);
    this.eventEmitter.emit('capacities.created', result);
    return result;
  }

  @Post('search')
  @HttpCode(200)
  @ApiOperation({ summary: 'List Capacity' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: PaginationCapacityDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'Capacity'))
  @UseInterceptors(new CapacityReqInterceptor(CapacityDto))
  @UseInterceptors(new TransformDtoInterceptor(CapacityDto))
  findAll(@Body() findAllDto: FindAllDto, @Req() req) {
    return this.capacityService.findAll(findAllDto, false, req);
  }

  // @Get('include-trashed')
  // @ApiOperation({ summary: 'List Capacity (With Trashed)' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The found record',
  //   type: PaginationCapacityDto,
  // })
  // @UseInterceptors(new CapacityReqInterceptor(CapacityDto))
  // @UseInterceptors(new TransformDtoInterceptor(CapacityDto))
  // findAllWithTrashed(@Body() findAllDto: FindAllDto) {
  //   return this.capacityService.findAll(findAllDto, true);
  // }

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Detail Capacity' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CapacityDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'Capacity'))
  @UseInterceptors(new CapacityReqInterceptor(CapacityDto))
  @UseInterceptors(new TransformDtoInterceptor(CapacityDto))
  findOne(@Param('id') id: string, @Body() onlySelectDto: OnlySelectDto, @Req() req) {
    return this.capacityService.findOne(+id, onlySelectDto, false, req);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Detail Capacity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CapacityDto
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, 'Capacity'))
  @UseInterceptors(new CapacityReqInterceptor(CapacityDto))
  @UseInterceptors(new TransformDtoInterceptor(CapacityDto))
  async update(@Param('id') id: string, @Body() updateCapacityDto: UpdateCapacityDto, @Req() req) {
    const result = await this.capacityService.update(+id, updateCapacityDto, req);
    this.eventEmitter.emit('capacities.updated', result);
    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete A capacity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.'
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, 'Capacity'))
  @UseInterceptors(new CapacityReqInterceptor(CapacityDto))
  async remove(@Param('id') id: string, @Req() req) {
    const result = await this.capacityService.remove(+id, req);
    this.eventEmitter.emit('capacities.deleted', result);
    return result;
  }
}