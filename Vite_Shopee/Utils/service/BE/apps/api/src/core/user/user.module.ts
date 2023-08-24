import { RoleService } from './../role/role.service';
import { CacheModule, Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CrudModule } from '../crud/crud.module';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { CacheConfigService } from '@config/cache-config.service';
import { CaslModule } from '../casl/casl.module';
import { UserListener } from './listeners/user.listener';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SystemConfigMicroService } from '@config/microservices.config';
import { ResourceService } from '@core/resource/resource.service';
import { OrganizationService } from '@core/organization/organization.service';
import { GlobalSettingService } from '@modules/global-setting/global-setting.service';
import { AuthModule } from '@core/auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, UserListener, RoleService, ResourceService, OrganizationService, GlobalSettingService],
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
    forwardRef(() => AuthModule)
  ],
  exports: [UserService]
})
export class UserModule {}