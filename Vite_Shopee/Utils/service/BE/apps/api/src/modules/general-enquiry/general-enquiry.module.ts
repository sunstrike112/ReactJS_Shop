import { CacheModule, Module } from '@nestjs/common';
import { GeneralEnquiryService } from './general-enquiry.service';
import { GeneralEnquiryController } from './general-enquiry.controller';
import { CrudModule } from '@core/crud/crud.module';
import { PrismaService } from '@core/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { CacheConfigService } from '@config/cache-config.service';
import { CaslModule } from '@core/casl/casl.module';
import { GeneralEnquiryListener } from './listeners/general-enquiry.listener';
import { ClientsModule } from '@nestjs/microservices';
import { SystemConfigMicroService } from '@config/microservices.config';
import { OrganizationModule } from '@core/organization/organization.module';

@Module({
  controllers: [GeneralEnquiryController],
  providers: [GeneralEnquiryService, PrismaService, GeneralEnquiryListener],
  imports: [
    CaslModule,
    CrudModule,
    ConfigModule,
    OrganizationModule,
    CacheModule.registerAsync({
      useClass: CacheConfigService,
    }),
    ClientsModule.registerAsync([
      {
        name: 'SYSTEM_SERVICE',
        useClass: SystemConfigMicroService,
      },
    ]),
  ],
  exports: [GeneralEnquiryService],
})
export class GeneralEnquiryModule {}
