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
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
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
import { VehicleDto } from './dto/vehicle.dto';
import { PaginationVehicleDto } from './dto/pagination-vehicle.dto';
import { TransformDtoInterceptor } from '@interceptors/transform-dto.interceptor';
import { VehicleReqInterceptor } from './interceptors/vehicle-req.interceptor';
import { SentryInterceptor } from '@interceptors/sentry.interceptor';
import { JwtAuthGuard } from '@core/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '@core/casl/guards/policies.guard';
import { CheckPolicies } from '@core/casl/decorators/check-policies.decorator';
import { AppAbility } from '@core/casl/casl-ability.factory';
import { Action } from '@core/casl/enums/action.enum';

@ApiTags('Vehicles')
@ApiBearerAuth()
@Controller('vehicles')
@UseInterceptors(ClassSerializerInterceptor)
// @UseInterceptors(SentryInterceptor)
export class VehicleController {
  constructor(
    private readonly vehicleService: VehicleService,
    private eventEmitter: EventEmitter2
  ) {}

  @Get('schema')
  @ApiOperation({ summary: 'Vehicle Schema' })
  @ApiResponse({
    status: 200,
    description: 'The model schema',
    type: FieldSchemaItemsDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(Action.Read, 'Vehicle') || ability.can(Action.Create, 'Vehicle') || ability.can(Action.Update, 'Vehicle')
  )
  async getModelSchema() {
    return this.vehicleService.getModelSchema(VehicleDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create Vehicle' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: VehicleDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, 'Vehicle'))
  @UseInterceptors(new VehicleReqInterceptor(VehicleDto))
  @UseInterceptors(new TransformDtoInterceptor(VehicleDto))
  async create(@Body() createVehicleDto: CreateVehicleDto, @Req() req) {
    const result = await this.vehicleService.create(createVehicleDto, req);
    this.eventEmitter.emit('vehicles.created', result);
    return result;
  }

  @Post('search')
  @HttpCode(200)
  @ApiOperation({ summary: 'List Vehicle' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: PaginationVehicleDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'Vehicle'))
  @UseInterceptors(new VehicleReqInterceptor(VehicleDto))
  @UseInterceptors(new TransformDtoInterceptor(VehicleDto))
  findAll(@Body() findAllDto: FindAllDto, @Req() req) {
    return this.vehicleService.findAll(findAllDto, false, req);
  }

  // @Get('include-trashed')
  // @ApiOperation({ summary: 'List Vehicle (With Trashed)' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The found record',
  //   type: PaginationVehicleDto,
  // })
  // @UseInterceptors(new VehicleReqInterceptor(VehicleDto))
  // @UseInterceptors(new TransformDtoInterceptor(VehicleDto))
  // findAllWithTrashed(@Body() findAllDto: FindAllDto) {
  //   return this.vehicleService.findAll(findAllDto, true);
  // }

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Detail Vehicle' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: VehicleDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'Vehicle'))
  @UseInterceptors(new VehicleReqInterceptor(VehicleDto))
  @UseInterceptors(new TransformDtoInterceptor(VehicleDto))
  findOne(@Param('id') id: string, @Body() onlySelectDto: OnlySelectDto, @Req() req) {
    return this.vehicleService.findOne(+id, onlySelectDto, false, req);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Detail Vehicle' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: VehicleDto
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, 'Vehicle'))
  @UseInterceptors(new VehicleReqInterceptor(VehicleDto))
  @UseInterceptors(new TransformDtoInterceptor(VehicleDto))
  async update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto, @Req() req) {
    const result = await this.vehicleService.update(+id, updateVehicleDto, req);
    this.eventEmitter.emit('vehicles.updated', result);
    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete A vehicle' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.'
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, 'Vehicle'))
  @UseInterceptors(new VehicleReqInterceptor(VehicleDto))
  async remove(@Param('id') id: string, @Req() req) {
    const result = await this.vehicleService.remove(+id, req);
    this.eventEmitter.emit('vehicles.deleted', result);
    return result;
  }
}