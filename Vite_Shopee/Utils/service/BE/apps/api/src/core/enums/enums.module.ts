import { Module } from '@nestjs/common';
import { EnumsService } from './enums.service';
import { EnumsController } from './enums.controller';

@Module({
  controllers: [EnumsController],
  providers: [EnumsService]
})
export class EnumsModule {}
