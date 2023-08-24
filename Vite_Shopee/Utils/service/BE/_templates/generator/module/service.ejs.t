---
to: apps/api/src/<%= type %>/<%= name %>/<%=name%>.service.ts
---

import { CACHE_MANAGER, Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { CrudService } from '@core/crud/crud.service';
import { PrismaService } from '@core/prisma/prisma.service';
import { Crud } from '@decorators/crud.decorator';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';

@Injectable()
@Crud("<%= h.changeCase.pascal(Name) %>")
export class <%= h.changeCase.pascal(Name) %>Service extends CrudService {
  constructor(
    public prisma: PrismaService,
    public configService: ConfigService,
    @Inject(CACHE_MANAGER) public cacheManager: Cache,
  ) {
    super(prisma, configService, cacheManager);
  }
}
