import { OrganizationService } from '@core/organization/organization.service';
import { GeneralEnquiryDto } from './dto/general-enquiry.dto';
import { CACHE_MANAGER, Injectable, Inject } from '@nestjs/common';
import { CrudService } from '@core/crud/crud.service';
import { PrismaService } from '@core/prisma/prisma.service';
import { Crud } from '@decorators/crud.decorator';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';

@Injectable()
@Crud('GeneralEnquiry')
export class GeneralEnquiryService extends CrudService {
  constructor(
    private organizationService: OrganizationService,
    public prisma: PrismaService,
    public configService: ConfigService,
    @Inject(CACHE_MANAGER) public cacheManager: Cache,
  ) {
    super(prisma, configService, cacheManager);
  }

  async submitGeneralEnquiry(generalEnquiry: GeneralEnquiryDto) {
    const organization = await this.organizationService.findOne(
      {
        id: generalEnquiry.organizationId,
      },
      {
        select: {
          name: true,
        },
      },
    );
    return organization;
  }
}
