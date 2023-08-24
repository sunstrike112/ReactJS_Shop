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
  HttpStatus,
  Query,
} from '@nestjs/common';
import { User } from '@core/auth/decorators/user.decorator';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import {
  CheckEmailExistsDto,
  UpdateCustomerDto,
  UpdatePasswordDto,
  UpdateVehicleStatusDto,
} from './dto/update-customer.dto';
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
  ApiBody,
} from '@nestjs/swagger';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CustomerDto, CustomerLoginRequestDto } from './dto/customer.dto';
import { PaginationCustomerDto } from './dto/pagination-customer.dto';
import { TransformDtoInterceptor } from '@interceptors/transform-dto.interceptor';
import { CustomerReqInterceptor } from './interceptors/customer-req.interceptor';
import { SentryInterceptor } from '@interceptors/sentry.interceptor';
import { JwtAuthGuard } from '@core/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '@core/casl/guards/policies.guard';
import { CheckPolicies } from '@core/casl/decorators/check-policies.decorator';
import { AppAbility } from '@core/casl/casl-ability.factory';
import { Action } from '@core/casl/enums/action.enum';
import { AdminCreateCustomerDto } from './dto/admin-create-customer.dto';
import { CustomerForgotPasswordDto, CustomerResetPasswordDto } from './dto/reset-password.dto';
import { JwtRefreshGuard } from '@core/auth/guards/jwt-refresh.guard';
import {
  MSG_UPDATE_PASSWORD_SUCCESSFULLY,
  MSG_UPDATE_VEHICLE_STATUS_SUCCESSFULLY,
} from '@constants/messages.constant';

@ApiTags('Customers')
@ApiBearerAuth()
@Controller('customers')
@UseInterceptors(ClassSerializerInterceptor)
// @UseInterceptors(SentryInterceptor)
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private eventEmitter: EventEmitter2
  ) {}

  @Get('schema')
  @ApiOperation({ summary: 'Customer Schema' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The model schema',
    type: FieldSchemaItemsDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(Action.Read, 'Customers') || ability.can(Action.Create, 'Customers') || ability.can(Action.Update, 'Customers')
  )
  async getModelSchema() {
    return this.customerService.getModelSchema(CustomerDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create Customer' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CustomerDto,
  })
  @UseInterceptors(new CustomerReqInterceptor(CustomerDto))
  @UseInterceptors(new TransformDtoInterceptor(CustomerDto))
  async create(@Body() createCustomerDto: CreateCustomerDto, @Req() req) {
    const result = await this.customerService.createCustomer(createCustomerDto, req);
    return result;
  }

  @Post('admin')
  @ApiOperation({ summary: 'Create Customer by Admin' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CustomerDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, 'Customer'))
  @UseInterceptors(new CustomerReqInterceptor(CustomerDto))
  @UseInterceptors(new TransformDtoInterceptor(CustomerDto))
  async adminCreate(@Body() adminCreateCustomerDto: AdminCreateCustomerDto, @Req() req) {
    const result = await this.customerService.createCustomer(adminCreateCustomerDto, req, true);
    return result;
  }

  @Post('search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List Customer' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List customer found',
    type: PaginationCustomerDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'Customer'))
  @UseInterceptors(new CustomerReqInterceptor(CustomerDto))
  @UseInterceptors(new TransformDtoInterceptor(CustomerDto))
  findAll(@Body() findAllDto: FindAllDto, @Req() req) {
    return this.customerService.findAll(findAllDto, false, req);
  }

  @Post('admin/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Detail Customer by Admin' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found record',
    type: CustomerDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'Customer'))
  @UseInterceptors(new CustomerReqInterceptor(CustomerDto))
  @UseInterceptors(new TransformDtoInterceptor(CustomerDto))
  adminFindOne(@Param('id') id: string, @Body() onlySelectDto: OnlySelectDto, @Req() req) {
    return this.customerService.findOne(+id, onlySelectDto, false, req);
  }

  @Patch('admin/:id')
  @ApiOperation({ summary: 'Update Detail Customer by Admin' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully updated.',
    type: CustomerDto
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, 'Customer'))
  @UseInterceptors(new CustomerReqInterceptor(CustomerDto))
  @UseInterceptors(new TransformDtoInterceptor(CustomerDto))
  async adminUpdate(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto, @Req() req) {
    const result = await this.customerService.update(+id, updateCustomerDto, req);
    this.eventEmitter.emit('customers.updated', result);
    return result;
  }

  // customer profile
  @Get('/profiles')
  @ApiOperation({ summary: 'Get Current Customer Profile' })
  @ApiResponse({
    status: 200,
    description: 'Get Current Customer Profile successfully',
    type: CustomerDto,
  })
  @UseGuards(JwtAuthGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'Customer'))
  @UseInterceptors(new CustomerReqInterceptor(CustomerDto))
  @UseInterceptors(new TransformDtoInterceptor(CustomerDto))
  async getProfiles(@User() customer: any) {
    const result = await this.customerService.getCustomerProfiles(customer);
    return result;
  }

  @Patch('/profiles')
  @ApiOperation({ summary: 'Update Current Customer Profile' })
  @ApiResponse({
    status: 200,
    description: 'The profile has been successfully deleted.',
    type: CustomerDto,
  })
  @UseGuards(JwtAuthGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, 'Customer'))
  @UseInterceptors(new CustomerReqInterceptor(UpdateCustomerDto))
  @UseInterceptors(new TransformDtoInterceptor(CustomerDto))
  async updateCustomerProfiles(@Body() updateCustomerDto: UpdateCustomerDto, @User() customer: any) {
    const result = await this.customerService.updateCustomerProfile(customer.email, updateCustomerDto);
    return result;
  }

  @Patch('/change-password')
  @ApiOperation({ summary: 'Change password of current customer' })
  @ApiResponse({
    status: 200,
    description: 'The password has been successfully changed.',
    type: CustomerDto,
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new CustomerReqInterceptor(UpdatePasswordDto))
  @UseInterceptors(new TransformDtoInterceptor(CustomerDto))
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto, @User() customer: any) {
    await this.customerService.updatePassword(customer.email, updatePasswordDto);
    return {
      statusCode: HttpStatus.OK,
      message: MSG_UPDATE_PASSWORD_SUCCESSFULLY,
    };
  }

  @Patch('/update-vehicle-status')
  @ApiOperation({ summary: 'Change vehicle status' })
  @ApiResponse({
    status: 200,
    description: 'The vehicle status has been successfully changed.'
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new CustomerReqInterceptor(UpdateVehicleStatusDto))
  @UseInterceptors(new TransformDtoInterceptor(CustomerDto))
  async updateVehicleStatus(
    @Body() updateVehicleStatusDto: UpdateVehicleStatusDto,
    @User() customer: any,
  ) {
    await this.customerService.updateVehicleStatus(customer, updateVehicleStatusDto);
    return { 
      statusCode: HttpStatus.OK,
      message: MSG_UPDATE_VEHICLE_STATUS_SUCCESSFULLY,
    };
  }

  @Get('/check-email-exists')
  @ApiOperation({ summary: 'Check email exists' })
  @ApiResponse({
    status: 200,
    description: 'Check email exists.',
  })
  async checkEmailExists(@Query() params: CheckEmailExistsDto) {
    const isExisted = await this.customerService.checkCustomerExists(params.email);
    return {
      isExisted,
      statusCode: HttpStatus.OK,
    };
  }
}