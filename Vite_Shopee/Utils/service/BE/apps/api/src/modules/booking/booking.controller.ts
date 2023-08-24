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
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
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
import { BookingDto } from './dto/booking.dto';
import { PaginationBookingDto } from './dto/pagination-booking.dto';
import { TransformDtoInterceptor } from '@interceptors/transform-dto.interceptor';
import { BookingReqInterceptor } from './interceptors/booking-req.interceptor';
import { SentryInterceptor } from '@interceptors/sentry.interceptor';
import { JwtAuthGuard } from '@core/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '@core/casl/guards/policies.guard';
import { CheckPolicies } from '@core/casl/decorators/check-policies.decorator';
import { AppAbility } from '@core/casl/casl-ability.factory';
import { Action } from '@core/casl/enums/action.enum';

@ApiTags('Bookings')
@ApiBearerAuth()
@Controller('bookings')
@UseInterceptors(ClassSerializerInterceptor)
// @UseInterceptors(SentryInterceptor)
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private eventEmitter: EventEmitter2
  ) {}

  @Get('schema')
  @ApiOperation({ summary: 'Booking Schema' })
  @ApiResponse({
    status: 200,
    description: 'The model schema',
    type: FieldSchemaItemsDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(Action.Read, 'Booking') || ability.can(Action.Create, 'Booking') || ability.can(Action.Update, 'Booking')
  )
  async getModelSchema() {
    return this.bookingService.getModelSchema(BookingDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create Booking' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: BookingDto,
  })
  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, 'Booking'))
  @UseInterceptors(new BookingReqInterceptor(BookingDto))
  @UseInterceptors(new TransformDtoInterceptor(BookingDto))
  async create(@Body() createBookingDto: CreateBookingDto, @Req() req) {
    const result = await this.bookingService.createBooking(createBookingDto, req);
    return result;
  }

  @Post('search')
  @HttpCode(200)
  @ApiOperation({ summary: 'List Booking' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: PaginationBookingDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'Booking'))
  @UseInterceptors(new BookingReqInterceptor(BookingDto))
  @UseInterceptors(new TransformDtoInterceptor(BookingDto))
  findAll(@Body() findAllDto: FindAllDto, @Req() req) {
    return this.bookingService.findAll(findAllDto, false, req);
  }

  // @Get('include-trashed')
  // @ApiOperation({ summary: 'List Booking (With Trashed)' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The found record',
  //   type: PaginationBookingDto,
  // })
  // @UseInterceptors(new BookingReqInterceptor(BookingDto))
  // @UseInterceptors(new TransformDtoInterceptor(BookingDto))
  // findAllWithTrashed(@Body() findAllDto: FindAllDto) {
  //   return this.bookingService.findAll(findAllDto, true);
  // }

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Detail Booking' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: BookingDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'Booking'))
  @UseInterceptors(new BookingReqInterceptor(BookingDto))
  @UseInterceptors(new TransformDtoInterceptor(BookingDto))
  findOne(@Param('id') id: string, @Body() onlySelectDto: OnlySelectDto, @Req() req) {
    return this.bookingService.findOne(+id, onlySelectDto, false, req);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Detail Booking' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: BookingDto
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, 'Booking'))
  @UseInterceptors(new BookingReqInterceptor(BookingDto))
  @UseInterceptors(new TransformDtoInterceptor(BookingDto))
  async update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto, @Req() req) {
    const result = await this.bookingService.update(+id, updateBookingDto, req);
    this.eventEmitter.emit('bookings.updated', result);
    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete A booking' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.'
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, 'Booking'))
  @UseInterceptors(new BookingReqInterceptor(BookingDto))
  async remove(@Param('id') id: string, @Req() req) {
    const result = await this.bookingService.remove(+id, req);
    this.eventEmitter.emit('bookings.deleted', result);
    return result;
  }
}