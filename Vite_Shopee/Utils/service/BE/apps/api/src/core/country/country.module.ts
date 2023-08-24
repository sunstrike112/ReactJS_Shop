import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { PrismaService } from '@core/prisma/prisma.service';

@Module({
  controllers: [CountryController],
  providers: [CountryService, PrismaService]
})
export class CountryModule {}
