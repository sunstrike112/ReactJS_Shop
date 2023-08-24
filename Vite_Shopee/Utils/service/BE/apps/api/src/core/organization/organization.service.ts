import { CACHE_MANAGER, Injectable, Inject } from '@nestjs/common';
import { CrudService } from '@core/crud/crud.service';
import { PrismaService } from '@core/prisma/prisma.service';
import { Crud } from '@decorators/crud.decorator';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { GlobalSettingService } from '@modules/global-setting/global-setting.service';

@Injectable()
@Crud('Organization')
export class OrganizationService extends CrudService {
  constructor(
    public prisma: PrismaService,
    public configService: ConfigService,
    @Inject(CACHE_MANAGER) public cacheManager: Cache,
    public globalSettingService: GlobalSettingService,
  ) {
    super(prisma, configService, cacheManager);
  }
}
