import { CACHE_MANAGER, Injectable, Inject, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { CrudService } from '@core/crud/crud.service';
import { PrismaService } from '@core/prisma/prisma.service';
import { Crud } from '@decorators/crud.decorator';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
@Crud("Vehicle")
export class VehicleService extends CrudService {
  constructor(
    public prisma: PrismaService,
    public configService: ConfigService,
    @Inject(CACHE_MANAGER) public cacheManager: Cache,
  ) {
    super(prisma, configService, cacheManager);
  }

  async findVehicleBySlId(slId: string, select: any = {}) {
    const defaultSelect = {
      id: true,
      slId: true,
      rego: true,
      state: true,
      make: true,
      model: true,
      variant: true,
      year: true,
      color: true,
      transmission: true,
      cylinder: true,
      customer: true,
      customerId: true,
      isActive: true,
    };

    const vehicle = await this.findOne(
      {
        slId
      },
      Object.keys(select).length ? select : defaultSelect
    );

    return vehicle;
  }

  async createVehicle(createVehicleDto: CreateVehicleDto, customerId, req) {
    let vehicle =  null;

    try {
      vehicle = await this.findVehicleBySlId(createVehicleDto.slId);
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        throw error;
      }
    }

    createVehicleDto = Object.assign({}, createVehicleDto, { customer: { connect: { id: customerId }}});

    if (vehicle) {
      return await this.update(vehicle.id, createVehicleDto)
    }

    return await this.create(createVehicleDto, req);
  }
}
