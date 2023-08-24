import { HttpModule, Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';

@Module({
  imports: [
    HttpModule
  ],
  controllers: [VehiclesController],
  providers: [VehiclesService]
})
export class VehiclesModule {}
