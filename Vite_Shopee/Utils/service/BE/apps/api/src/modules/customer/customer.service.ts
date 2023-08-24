import { BookingService } from './../booking/booking.service';
import { CACHE_MANAGER, Injectable, Inject, NotFoundException, BadRequestException, HttpStatus } from '@nestjs/common';
import { CrudService } from '@core/crud/crud.service';
import { PrismaService } from '@core/prisma/prisma.service';
import { Crud } from '@decorators/crud.decorator';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthCustomerService } from '@core/auth/auth-customer.service';
import { UpdatePasswordDto } from './dto/update-customer.dto';
import { hashValue, verifyPassword } from '@helpers/hash.helper';
import {
  MSG_OLD_PASSWORD_WRONG,
  MSG_EMAIL_EXISTED,
} from '@constants/messages.constant';

@Injectable()
@Crud("Customer")
export class CustomerService extends CrudService {
  constructor(
    public prisma: PrismaService,
    public configService: ConfigService,
    @Inject(CACHE_MANAGER) public cacheManager: Cache,
    private eventEmitter: EventEmitter2,
    private authCustomerService: AuthCustomerService,
  ) {
    super(prisma, configService, cacheManager);
  }

  async getCustomerProfiles(customerDto) {
    const selectCustomerProfileDto = {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      gender: true,
      addressLine1: true,
      addressLine2: true,
      companyName: true,
      emailVerifiedAt: true,
      state: true,
      suburb: true,
      postCode: true,
      provider: true,
      nrma: true,
      vehicles: {
        select: {
          id: true,
          rego: true,
          make: true,
          model: true,
          variant: true,
          transmission: true,
          cylinder: true,
          year: true,
          isActive: true,
          bookings: {
            select: {
              id: true,
              status: true,
              appointment: true,
              organization: {
                select: {
                  name: true,
                  timezone: true,
                }
              },
              bookingServices: {
                select: {
                  note: true,
                  service: {
                    select: {
                      name: true,
                    }
                  },
                  bookingPackages: {
                    select: {
                      id: true,
                      package: {
                        select: {
                          name: true,
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
    };
    const customer = await this.findCustomerByEmail(customerDto.email, selectCustomerProfileDto);
    return customer;
  }

  async updateVehicleStatus(customer, updateVehicleStatusDto) {
    await this.update(customer.id, {
      vehicles: {
        update: {
          where: {
            id: updateVehicleStatusDto.id,
          },
          data: {
            isActive: updateVehicleStatusDto.status,
          }
        }
      }
    });
  }

  async updateCustomerProfile(customerEmail, updateCustomerDto) {
    await this.findOne({email: customerEmail});
    return await this.update({email: customerEmail}, updateCustomerDto);
  }

  async updatePassword(customerEmail, updatePasswordDto: UpdatePasswordDto) {
    const customer = await this.findOne({email: customerEmail});
    await this.verifyAndChangePassword(customer, updatePasswordDto);
  }

  async verifyAndChangePassword(customer, updatePasswordDto: UpdatePasswordDto) {
    if (customer.emailVerifiedAt !== null) {
      await verifyPassword(
        updatePasswordDto.password,
        customer.password,
        MSG_OLD_PASSWORD_WRONG
      );
    }

    return await this.changePassword(customer, updatePasswordDto.newPassword);
  }

  async changePassword(customer, newPassword) {
    const hashedNewPassword = await hashValue(newPassword);

    return await this.update(customer.id, {
      password: hashedNewPassword
    });
  }

  async createCustomer(createCustomerDto: CreateCustomerDto, req: any, isCreatedByAdmin = false) {
    let user = null;

    try {
      user = await this.findCustomerByEmail(createCustomerDto.email,
        {
          id: true,
          email: true,
          password: true
        }
      )
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        throw error;
      }
    }

    if (user) {
      if (user.password) {
        throw new BadRequestException(MSG_EMAIL_EXISTED);
      }

      return await this.update(user.id, createCustomerDto);
    }

    const result = await this.create(
      { ...createCustomerDto, emailVerifiedAt: new Date() },
      req,
    );

    if (isCreatedByAdmin) {
      this.authCustomerService.forgotPassword(createCustomerDto.email, isCreatedByAdmin);
    } else {
      this.eventEmitter.emit('customers.created', result);
    }

    return result;
  }

  async checkCustomerExists(email) {
    try {
      await this.findCustomerByEmail(email);
      return true;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        throw error;
      }
      return false;
    }
  }

  async findCustomerByEmail(email: string, select: any = {}) {
    const defaultSelect = {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      gender: true,
      phoneNumber: true,
      addressLine1: true,
      addressLine2: true,
      state: true,
      suburb: true,
      postCode: true,
      provider: true,
      currentHashedRefreshToken: true,
      currentHashedForgotPasswordToken: true,
      emailVerifiedAt: true
    };

    const user = await this.findOne(
      {
        email
      },
      Object.keys(select).length ? select : defaultSelect
    );

    return user;
  }
}