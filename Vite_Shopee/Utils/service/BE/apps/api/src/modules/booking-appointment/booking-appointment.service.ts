import { BadRequestException, Injectable } from '@nestjs/common';
import * as moment from 'moment-timezone';
import { cloneDeep } from 'lodash';
import { RequestBookingAppointmentDto } from './dto/booking-appointment.dto';
import { OrganizationService } from '@core/organization/organization.service';
import { GlobalCapacityService } from '@modules/global-capacity/global-capacity.service';
import { PackageService } from '@modules/package/package.service';
import { sumBy } from 'lodash';
import { DATE_TIME_FORMAT } from '@constants/datetime-format.constant';
import { MSG_NOT_FOUND_ORGANIZATION } from '@constants/messages.constant';

@Injectable()
export class BookingAppointmentService {
  constructor(
    private organizationService: OrganizationService,
    private globalCapacityService: GlobalCapacityService,
    private packageService: PackageService
  ) {}

  async getTimeSlots(reqBookingAppointment: RequestBookingAppointmentDto, req) {
    const { date, packageIds } = reqBookingAppointment;
    const organization: any = await this.getOrganizationDetail(req);
    const todayOfWeek = moment(date, DATE_TIME_FORMAT.defaultDate).isoWeekday();
    const isBookingAvailable = await this.totalWorkingHours(
      { date, packageIds },
      organization.timezone,
      organization.bookings,
      organization.capacities,
      todayOfWeek,
    );

    const organizationWorkDay = organization.operatingHour.schedule.find((time) => {
      return time.dayOfWeek === todayOfWeek
    });
    
    const timeSlots = this.generateTimeSlots(organizationWorkDay, isBookingAvailable, date);

    const response = Object.assign({}, { items: timeSlots });
    return response
  }

  generateTimeSlots(workDay, isBookingAvailable: boolean, date) {
    const timeSlots = [];
    const startTime = moment(workDay.startTime, DATE_TIME_FORMAT.defaultTimeWithoutSeconds);
    const endTime = moment(workDay.endTime, DATE_TIME_FORMAT.defaultTimeWithoutSeconds);
    const timeSlotNumber = (endTime.diff(startTime, 'hours')) / 0.5;
    const isBookingToday =  moment(date, DATE_TIME_FORMAT.defaultDate).isSame(moment(), 'day');

    for (let i = 0; i < timeSlotNumber; i++) {
      const startTimeLoop = cloneDeep(startTime);
      const time = startTimeLoop.add(0.5*i, 'hours').format(DATE_TIME_FORMAT.defaultTimeWithoutSeconds);

      const obj = {
        time,
        isAvailable: isBookingAvailable && !workDay.isClose && !isBookingToday
      };

      timeSlots.push(obj);
    }

    return timeSlots
  }

  async totalWorkingHours({ date, packageIds }, timezone, bookings, users, dayOfWeek) {
    // TODO: need to remove this after implement capacity
    return true;

    let workingHours = 0;
    let bookingHours = 0;

    const bookingsByDate = bookings.filter((booking) => {
      return moment.tz(booking.appointment, timezone).isSame(moment(date, DATE_TIME_FORMAT.defaultDate), 'day')
    });

    bookingHours += await this.summaryBookingHours(bookingsByDate);
    bookingHours += await this.calculateCurrentBookingPackage(packageIds);
    workingHours = await this.summaryWorkingHours(users, dayOfWeek, date);
    
    return workingHours > bookingHours
  }

  async summaryBookingHours(bookings) {
    let bookingServiceHours = 0;

    if (bookings.length > 0) {
      bookings.forEach((booking) => {
        booking.bookingServices.forEach((service) => {
          bookingServiceHours += sumBy(service.bookingPackages, (bookingPackage) => {
            return bookingPackage.package.estHours
          })
        })
      });
    }

    return bookingServiceHours
  }

  async calculateCurrentBookingPackage(packageIds) {
    let packageHours = 0;
    const listPackages = packageIds.map((id) => {
      const obj = {
        id
      };

      return obj
    });

    const bookingPackages: any = await this.packageService.findAll({ where: { OR: listPackages } });

    packageHours = sumBy(bookingPackages.items, 'estHours');
    return packageHours
  }

  async summaryWorkingHours(users, dayOfWeek, date) {
    let technicianWorkingHours = 0;
    for await (const technician of users) {
      const capacity = await this.globalCapacityService.findOne(technician.globalCapacityId);
      
      technicianWorkingHours += this.calculateWorkTime(capacity, 'availableTime', dayOfWeek);
      technicianWorkingHours -= this.calculateWorkTime(capacity, 'breakTime', dayOfWeek);
      technicianWorkingHours -= this.calculateTechnicianException(technician.exception, date);
    }

    return technicianWorkingHours;
  }

  calculateWorkTime(arr, field, dayOfWeek) {
    let technicianWorkTime = 0;
    const data = arr[field].find((time) => {
      return time.dayOfWeek === dayOfWeek
    });

    if (data) {
      const startTime = moment(data.startTime, DATE_TIME_FORMAT.defaultTimeWithoutSeconds);
      const endTime = moment(data.endTime, DATE_TIME_FORMAT.defaultTimeWithoutSeconds);
      const workTime = endTime.diff(startTime, 'minutes');
  
      technicianWorkTime = workTime / 60;
    }

    return technicianWorkTime
  }

  calculateTechnicianException(exceptions, date) {
    let exceptionHours = 0;

    for (const exception of exceptions) {
      const startDate = new Date(exception.startDate).toLocaleDateString();
      const endDate = new Date(exception.endDate).toLocaleDateString();

      const isSameOrAfterStartDate = moment(date, DATE_TIME_FORMAT.defaultDate).isSameOrAfter(moment(startDate, DATE_TIME_FORMAT.date));
      const isSameOrBeforeEndDate = moment(date, DATE_TIME_FORMAT.defaultDate).isSameOrBefore(moment(endDate, DATE_TIME_FORMAT.date));
      
      if (isSameOrAfterStartDate && isSameOrBeforeEndDate) {
        const startTime = moment(new Date(exception.startDate).toLocaleTimeString('en-GB'), DATE_TIME_FORMAT.defaultTime);
        const endTime = moment(new Date(exception.endDate).toLocaleTimeString('en-GB'), DATE_TIME_FORMAT.defaultTime);
        const exceptionTime = endTime.diff(startTime, 'minutes');

        exceptionHours += (exceptionTime / 60);
      }
    }

    return exceptionHours
  }

  getOrganizationDetail(req) {
    const orgId = req.headers['x-organization-id'];

    if (!orgId) {
      throw new BadRequestException(MSG_NOT_FOUND_ORGANIZATION); 
    }
    
    return this.organizationService.findOne(+orgId, {
      timezone: true,
      operatingHour: true,
      capacities: true,
      bookings: {
        include: {
          bookingServices: {
            include: {
              bookingPackages: {
                include: {
                  package: true
                }
              }
            }
          }
        }
      }
    }, false, req);
  }
}
