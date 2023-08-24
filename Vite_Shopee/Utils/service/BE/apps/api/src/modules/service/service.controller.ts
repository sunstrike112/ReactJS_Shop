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
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { FindAllDto, OnlySelectDto } from '@crud/dto/find-all.dto';
import { FieldSchemaItemsDto } from '@crud/dto/schema.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceDto } from './dto/service.dto';
import { PaginationServiceDto } from './dto/pagination-service.dto';
import { TransformDtoInterceptor } from '@interceptors/transform-dto.interceptor';
import { ServiceReqInterceptor } from './interceptors/service-req.interceptor';
import { JwtAuthGuard } from '@core/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '@core/casl/guards/policies.guard';
import { CheckPolicies } from '@core/casl/decorators/check-policies.decorator';
import { AppAbility } from '@core/casl/casl-ability.factory';
import { Action } from '@core/casl/enums/action.enum';

@ApiTags('Services')
@ApiBearerAuth()
@Controller('services')
@UseInterceptors(ClassSerializerInterceptor)
export class ServiceController {
  constructor(
    private readonly serviceService: ServiceService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Get('schema')
  @ApiOperation({ summary: 'Service Schema' })
  @ApiResponse({
    status: 200,
    description: 'The model schema',
    type: FieldSchemaItemsDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(Action.Read, 'Service') ||
      ability.can(Action.Create, 'Service') ||
      ability.can(Action.Update, 'Service'),
  )
  async getModelSchema() {
    return this.serviceService.getModelSchema(ServiceDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create Service' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ServiceDto,
  })
  @UseInterceptors(new ServiceReqInterceptor(ServiceDto))
  @UseInterceptors(new TransformDtoInterceptor(ServiceDto))
  async create(@Body() createServiceDto: CreateServiceDto, @Req() req) {
    const result = await this.serviceService.create(createServiceDto, req);
    this.eventEmitter.emit('services.created', result);
    return result;
  }

  @Post('search')
  @HttpCode(200)
  @ApiOperation({ summary: 'List Service' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: PaginationServiceDto,
  })
  @UseInterceptors(new ServiceReqInterceptor(ServiceDto))
  @UseInterceptors(new TransformDtoInterceptor(ServiceDto))
  findAll(@Body() findAllDto: FindAllDto, @Req() req) {
    return this.serviceService.findAll(findAllDto, false, req);
  }

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Detail Service' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: ServiceDto,
  })
  @UseInterceptors(new ServiceReqInterceptor(ServiceDto))
  @UseInterceptors(new TransformDtoInterceptor(ServiceDto))
  findOne(
    @Param('id') id: string,
    @Body() onlySelectDto: OnlySelectDto,
    @Req() req,
  ) {
    return this.serviceService.findOne(+id, onlySelectDto, false, req);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Detail Service' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ServiceDto,
  })
  @UseInterceptors(new ServiceReqInterceptor(ServiceDto))
  @UseInterceptors(new TransformDtoInterceptor(ServiceDto))
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @Req() req,
  ) {
    const result = await this.serviceService.update(+id, updateServiceDto, req);
    this.eventEmitter.emit('services.updated', result);
    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete A service' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  @UseInterceptors(new ServiceReqInterceptor(ServiceDto))
  async remove(@Param('id') id: string, @Req() req) {
    const result = await this.serviceService.remove(+id, req);
    this.eventEmitter.emit('services.deleted', result);
    return result;
  }
}
