import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CrudModule } from '@core/crud/crud.module';
import { PrismaService } from '@core/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { CacheConfigService } from '@config/cache-config.service';
import { CaslModule } from '@core/casl/casl.module';
import { CustomerListener } from './listeners/customer.listener';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SystemConfigMicroService } from '@config/microservices.config';
import { AuthCustomerModule } from '@core/auth/auth-customer.module';

@Module({
  controllers: [CustomerController],
  providers: [
    CustomerService,
    PrismaService,
    CustomerListener,
  ],
  imports: [
    forwardRef(() => CaslModule),
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
    forwardRef(() => AuthCustomerModule)
  ],
  exports: [CustomerService]
})
export class CustomerModule {}