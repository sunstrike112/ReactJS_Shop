import { CACHE_MANAGER, Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CrudService } from '@core/crud/crud.service';
import { PrismaService } from '@core/prisma/prisma.service';
import { Crud } from '@decorators/crud.decorator';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';

@Injectable()
@Crud('PromotionCode')
export class PromotionCodeService extends CrudService {
  constructor(
    public prisma: PrismaService,
    public configService: ConfigService,
    @Inject(CACHE_MANAGER) public cacheManager: Cache,
  ) {
    super(prisma, configService, cacheManager);
  }

  async checkPromotionCodeExists(promoCode, organizationId) {
    try {
      return await this.findOne({
          promoCode,
          organizationId,
        },
        {
          select: {
            id: true,
            startDate: true,
            endDate: true,
            isActive: true,
            organization: {
              select: {
                timezone: true,
              }
            }
          }
        },
      );
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        throw error;
      }
      return false;
    }
  }
}
