import { CacheModule, Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { CrudModule } from '@core/crud/crud.module';
import { PrismaService } from '@core/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { CacheConfigService } from '@config/cache-config.service';
import { CaslModule } from '@core/casl/casl.module';
import { BookingListener } from './listeners/booking.listener';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SystemConfigMicroService } from '@config/microservices.config';
import { CustomerModule } from '@modules/customer/customer.module';
import { VehicleModule } from '@modules/vehicle/vehicle.module';
import { AuthCustomerModule } from '@core/auth/auth-customer.module';
import { OrganizationModule } from '@core/organization/organization.module';

@Module({
  controllers: [BookingController],
  providers: [BookingService, PrismaService, BookingListener],
  imports: [
    CaslModule,
    CrudModule,
    ConfigModule,
    CacheModule.registerAsync({
      useClass: CacheConfigService,
    }),
    ClientsModule.registerAsync([
      {
        name: 'SYSTEM_SERVICE',
        useClass: SystemConfigMicroService,
      }
    ]),
    CustomerModule,
    VehicleModule,
    AuthCustomerModule,
    OrganizationModule
  ],
  exports: [BookingService]
})
export class BookingModule {}