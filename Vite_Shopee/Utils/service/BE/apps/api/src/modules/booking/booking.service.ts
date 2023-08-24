import { CACHE_MANAGER, Injectable, Inject, BadRequestException } from '@nestjs/common';
import { CrudService } from '@core/crud/crud.service';
import { PrismaService } from '@core/prisma/prisma.service';
import { Crud } from '@decorators/crud.decorator';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CustomerService } from '@modules/customer/customer.service';
import { VehicleService } from '@modules/vehicle/vehicle.service';
import { EventEmitter2 } from 'eventemitter2';
import { MSG_NOT_FOUND_ORGANIZATION } from '@constants/messages.constant';
import { AuthCustomerService } from '@core/auth/auth-customer.service';
import { OrganizationService } from '@core/organization/organization.service';
import { DATE_TIME_FORMAT } from '@constants/datetime-format.constant';
import * as moment from 'moment-timezone';

@Injectable()
@Crud("Booking")
export class BookingService extends CrudService {
  constructor(
    public prisma: PrismaService,
    public configService: ConfigService,
    @Inject(CACHE_MANAGER) public cacheManager: Cache,
    private customerService: CustomerService,
    private vehicleService: VehicleService,
    private eventEmitter: EventEmitter2,
    private authCustomerService: AuthCustomerService,
    private organizationService: OrganizationService
  ) {
    super(prisma, configService, cacheManager);
  }

  async createBooking(createBooking: CreateBookingDto, req) {
    const orgId = req.headers['x-organization-id'];
    if (!orgId) {
      throw new BadRequestException(MSG_NOT_FOUND_ORGANIZATION); 
    }

    const orgTimezone = await this.organizationService.findOne(+orgId, { timezone: true });
    const customer = await this.getBookingCustomer(createBooking.customer, req);
    const vehicle = await this.getBookingVehicle(createBooking.vehicle, customer.connect.id, req);

    const services = {
      create: createBooking.bookingServices.map((service) => {
        const obj = {
          create: service.bookingPackages
        };
  
        return Object.assign({}, service, { bookingPackages: obj });
      })
    }

    const storeTimezoneUtcOffset = moment.tz(orgTimezone.timezone).utcOffset();
    const parsedAppointment = moment(createBooking.appointment, DATE_TIME_FORMAT.defaultDateTime).utcOffset(storeTimezoneUtcOffset, true).format();
    const appointment = new Date(parsedAppointment).toISOString();
    const createBookingDto = Object.assign({}, createBooking, 
      {
        customer,
        vehicle,
        bookingServices: services,
        organizationId: +orgId,
        appointment,
        promotionCode: createBooking.promotionCodeId ? { connect: { id: createBooking.promotionCodeId }} : undefined
      }
    );
    delete createBookingDto.promotionCodeId;
    
    const result = await this.create(createBookingDto, req);
    const bookingCreated = await this.getBookingDetail(result.id);
    
    let customerLogined = null;
    if (bookingCreated) {
      this.eventEmitter.emit('bookings.created', bookingCreated);
      customerLogined = await this.loginAfterBooking(createBooking.customer.email, req);
    }

    const confirmedBooking = Object.assign({}, bookingCreated, { customer: customerLogined });
    delete confirmedBooking.vehicle
    delete confirmedBooking.bookingServices

    return confirmedBooking
  }

  async getBookingCustomer(customerDto, req) {
    const customer = await this.customerService.createCustomer(customerDto, req);

    return {
      connect: {
        id: customer.id
      }
    }
  }

  async getBookingVehicle(vehicleDto, customerId, req) {
    const vehicle = await this.vehicleService.createVehicle(vehicleDto, customerId, req);

    return {
      connect: {
        id: vehicle.id
      }
    }
  }

  async getBookingDetail(bookingId) {
    const selectDto = {
      id: true,
      organization: {
        select: {
          name: true,
          addressLine1: true,
          state: true,
          suburb: true,
          postCode: true,
          timezone: true
        }
      },
      customer: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
          phoneNumber: true
        }
      },
      vehicle: {
        select: {
          rego: true,
          make: true,
          model: true,
          year: true
        }
      },
      appointment: true,
      bookingServices: {
        include: {
          service: true,
          bookingPackages: {
            include: {
              package: true
            }
          }
        }
      }
    };

    return await this.findOne(bookingId, selectDto);
  }

  async loginAfterBooking(customerEmail, req) {
    const { userLogined, refreshTokenCookie, refreshToken } = await this.authCustomerService.handleResponseAccessRefreshToken(customerEmail);

    req.res.setHeader('Set-Cookie', [refreshTokenCookie]);
    userLogined['refreshToken'] = refreshToken;

    return userLogined;
  }
}
