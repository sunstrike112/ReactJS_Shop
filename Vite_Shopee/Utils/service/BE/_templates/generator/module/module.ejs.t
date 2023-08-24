---
to: apps/api/src/<%= type %>/<%= name %>/<%=name%>.module.ts
---

import { CacheModule, Module } from '@nestjs/common';
import { <%= h.changeCase.pascal(Name) %>Service } from './<%= name %>.service';
import { <%= h.changeCase.pascal(Name) %>Controller } from './<%= name %>.controller';
import { CrudModule } from '@core/crud/crud.module';
import { PrismaService } from '@core/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { CacheConfigService } from '@config/cache-config.service';
import { CaslModule } from '@core/casl/casl.module';
import { <%= h.changeCase.pascal(Name) %>Listener } from './listeners/<%= name %>.listener';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SystemConfigMicroService } from '@config/microservices.config';

@Module({
  controllers: [<%= h.changeCase.pascal(Name) %>Controller],
  providers: [<%= h.changeCase.pascal(Name) %>Service, PrismaService, <%= h.changeCase.pascal(Name) %>Listener],
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
  ],
  exports: [<%= h.changeCase.pascal(Name) %>Service]
})
export class <%= h.changeCase.pascal(Name) %>Module {}