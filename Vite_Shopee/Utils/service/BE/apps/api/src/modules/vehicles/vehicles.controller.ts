import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { 
  SearchVehicleManualDto,
  SearchVehicleModelsDto,
  SearchVehicleRegoDto,
  SearchVehicleVariantsDto,
  SearchVehicleYearsDto,
  VehicleDetailDto,
  VehicleDto,
  VehicleManualDto 
} from './dto/vehicles.dto';
import { VehiclesService } from './vehicles.service';

@ApiTags('Vehicle')
@Controller('vehicle')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get list vehicle by rego, state' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get list vehicle',
    type: VehicleDto
  })
  getVehicleByRego(@Body() searchVehicleRegoDto: SearchVehicleRegoDto) {
    return this.vehiclesService.searchVehiclesByRego(searchVehicleRegoDto);
  }

  @Post('/colors')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get list colors by rego, state' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get list colors',
  })
  getColorsByRego(@Body() searchColorsRegoDto: SearchVehicleRegoDto) {
    return this.vehiclesService.searchColorsByRego(searchColorsRegoDto);
  }

  @Post('manual')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get list vehicle by make, model, variant, year' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get list vehicle',
    type: VehicleManualDto
  })
  getVehicleManual(@Body() searchVehicleManualDto: SearchVehicleManualDto) {
    return this.vehiclesService.searchVehiclesManual(searchVehicleManualDto);
  }

  @Get('makes')
  @ApiOperation({ summary: 'List Vehicle Makes' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get list vehicle makes',
  })
  getMakes() {
    return this.vehiclesService.getVehicleMakes();
  }

  @Get('models')
  @ApiOperation({ summary: 'List Vehicle Models' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get list vehicle models',
  })
  getModels(@Query() query: SearchVehicleModelsDto) {
    return this.vehiclesService.getVehicleModels(query);
  }

  @Get('variants')
  @ApiOperation({ summary: 'List Vehicle Variants' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get list vehicle variants',
  })
  getVariants(@Query() query: SearchVehicleVariantsDto) {
    return this.vehiclesService.getVehicleVariants(query);
  }

  @Get('years')
  @ApiOperation({ summary: 'List Vehicle Years' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get list vehicle years',
  })
  getYears(@Query() query: SearchVehicleYearsDto) {
    return this.vehiclesService.getVehicleYears(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Vehicle Detail by Glass ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get Vehicle Detail',
    type: VehicleDetailDto
  })
  getVehicle(@Param('id') id: string) {
    return this.vehiclesService.getVehicle(id);
  }
}
