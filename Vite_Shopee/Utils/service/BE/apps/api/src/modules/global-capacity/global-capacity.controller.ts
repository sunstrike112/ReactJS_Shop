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
import { GlobalCapacityService } from './global-capacity.service';
import { CreateGlobalCapacityDto } from './dto/create-global-capacity.dto';
import { UpdateGlobalCapacityDto } from './dto/update-global-capacity.dto';
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
import { GlobalCapacityDto } from './dto/global-capacity.dto';
import { PaginationGlobalCapacityDto } from './dto/pagination-global-capacity.dto';
import { TransformDtoInterceptor } from '@interceptors/transform-dto.interceptor';
import { GlobalCapacityReqInterceptor } from './interceptors/global-capacity-req.interceptor';
import { SentryInterceptor } from '@interceptors/sentry.interceptor';
import { JwtAuthGuard } from '@core/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '@core/casl/guards/policies.guard';
import { CheckPolicies } from '@core/casl/decorators/check-policies.decorator';
import { AppAbility } from '@core/casl/casl-ability.factory';
import { Action } from '@core/casl/enums/action.enum';

@ApiTags('GlobalCapacities')
@ApiBearerAuth()
@Controller('global-capacities')
@UseInterceptors(ClassSerializerInterceptor)
// @UseInterceptors(SentryInterceptor)
export class GlobalCapacityController {
  constructor(
    private readonly globalCapacityService: GlobalCapacityService,
    private eventEmitter: EventEmitter2
  ) {}

  @Get('schema')
  @ApiOperation({ summary: 'GlobalCapacity Schema' })
  @ApiResponse({
    status: 200,
    description: 'The model schema',
    type: FieldSchemaItemsDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(Action.Read, 'GlobalCapacity') || ability.can(Action.Create, 'GlobalCapacity') || ability.can(Action.Update, 'GlobalCapacity')
  )
  async getModelSchema() {
    return this.globalCapacityService.getModelSchema(GlobalCapacityDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create GlobalCapacity' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: GlobalCapacityDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, 'GlobalCapacity'))
  @UseInterceptors(new GlobalCapacityReqInterceptor(GlobalCapacityDto))
  @UseInterceptors(new TransformDtoInterceptor(GlobalCapacityDto))
  async create(@Body() createGlobalCapacityDto: CreateGlobalCapacityDto, @Req() req) {
    const result = await this.globalCapacityService.create(createGlobalCapacityDto, req);
    this.eventEmitter.emit('global-capacities.created', result);
    return result;
  }

  @Post('search')
  @HttpCode(200)
  @ApiOperation({ summary: 'List GlobalCapacity' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: PaginationGlobalCapacityDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'GlobalCapacity'))
  @UseInterceptors(new GlobalCapacityReqInterceptor(GlobalCapacityDto))
  @UseInterceptors(new TransformDtoInterceptor(GlobalCapacityDto))
  findAll(@Body() findAllDto: FindAllDto, @Req() req) {
    return this.globalCapacityService.findAll(findAllDto, false, req);
  }

  // @Get('include-trashed')
  // @ApiOperation({ summary: 'List GlobalCapacity (With Trashed)' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The found record',
  //   type: PaginationGlobalCapacityDto,
  // })
  // @UseInterceptors(new GlobalCapacityReqInterceptor(GlobalCapacityDto))
  // @UseInterceptors(new TransformDtoInterceptor(GlobalCapacityDto))
  // findAllWithTrashed(@Body() findAllDto: FindAllDto) {
  //   return this.globalCapacityService.findAll(findAllDto, true);
  // }

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Detail GlobalCapacity' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: GlobalCapacityDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'GlobalCapacity'))
  @UseInterceptors(new GlobalCapacityReqInterceptor(GlobalCapacityDto))
  @UseInterceptors(new TransformDtoInterceptor(GlobalCapacityDto))
  findOne(@Param('id') id: string, @Body() onlySelectDto: OnlySelectDto, @Req() req) {
    return this.globalCapacityService.findOne(+id, onlySelectDto, false, req);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Detail GlobalCapacity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: GlobalCapacityDto
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, 'GlobalCapacity'))
  @UseInterceptors(new GlobalCapacityReqInterceptor(GlobalCapacityDto))
  @UseInterceptors(new TransformDtoInterceptor(GlobalCapacityDto))
  async update(@Param('id') id: string, @Body() updateGlobalCapacityDto: UpdateGlobalCapacityDto, @Req() req) {
    const result = await this.globalCapacityService.update(+id, updateGlobalCapacityDto, req);
    this.eventEmitter.emit('global-capacities.updated', result);
    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete A global-capacity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.'
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, 'GlobalCapacity'))
  @UseInterceptors(new GlobalCapacityReqInterceptor(GlobalCapacityDto))
  async remove(@Param('id') id: string, @Req() req) {
    const result = await this.globalCapacityService.remove(+id, req);
    this.eventEmitter.emit('global-capacities.deleted', result);
    return result;
  }
}