import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiExcludeEndpoint,
  ApiSecurity,
} from '@nestjs/swagger';
import { TransformDtoInterceptor } from '@interceptors/transform-dto.interceptor';
import { CountryService } from './country.service';
import { CountryDto, CountryItemsDto, StateDto, StateItemsDto, CityItemsDto, CityDto } from './dto/country.dto';
import { SuburbDto, SuburbItemsDto } from './dto/suburb.dto';

@ApiTags('Countries')
@Controller('countries')
@UseInterceptors(ClassSerializerInterceptor)
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  @ApiOperation({ summary: 'List Countries' })
  @ApiResponse({
    status: 200,
    description: 'The List Countries',
    type: CountryItemsDto,
  })
  @UseInterceptors(new TransformDtoInterceptor(CountryDto))
  getAllCountries() {
    return this.countryService.getAllCountries();
  }

  @Get(':countryCode')
  @ApiOperation({ summary: 'Get Detail Country' })
  @ApiResponse({
    status: 200,
    description: 'Get Detail Country',
    type: CountryDto,
  })
  @UseInterceptors(new TransformDtoInterceptor(CountryDto))
  getCountryByCode(@Param() params) {
    return this.countryService.getCountryByCode(params.countryCode);
  }

  @Get(':countryCode/states')
  @ApiOperation({ summary: 'Get all state of a country' })
  @ApiResponse({
    status: 200,
    description: 'Get all state of a country',
    type: StateItemsDto,
  })
  @UseInterceptors(new TransformDtoInterceptor(StateDto))
  getStatesOfCountry(@Param() params) {
    return this.countryService.getStatesOfCountry(params.countryCode);
  }

  
  @Get(':countryCode/states/:stateCode')
  @ApiOperation({ summary: 'Get detail state of a country' })
  @ApiResponse({
    status: 200,
    description: 'Get detail state of a country',
    type: StateDto,
  })
  @UseInterceptors(new TransformDtoInterceptor(StateDto))
  getStateByCodeAndCountry(@Param() params) {
    return this.countryService.getStateByCodeAndCountry(params.stateCode, params.countryCode);
  }

  @Get(':countryCode/cities')
  @ApiOperation({ summary: 'Get cities of a country' })
  @ApiResponse({
    status: 200,
    description: 'Get cities of a country',
    type: CityItemsDto,
  })
  @UseInterceptors(new TransformDtoInterceptor(CityDto))
  getCitiesOfCountry(@Param() params) {
    return this.countryService.getCitiesOfCountry(params.countryCode)
  }

  @Get(':countryCode/states/:stateCode/cities')
  @ApiOperation({ summary: 'Get cities of state of a country' })
  @ApiResponse({
    status: 200,
    description: 'Get cities of state of a country',
    type: CityItemsDto,
  })
  @UseInterceptors(new TransformDtoInterceptor(CityDto))
  getCitiesOfState(@Param() params) {
    return this.countryService.getCitiesOfState(params.stateCode, params.countryCode)
  }

  @Get(':countryCode/postCode/:postCode')
  @ApiOperation({ summary: 'Get state, suburb based on post code' })
  @ApiResponse({
    status: 200,
    description: 'Get state, suburb based on post code',
    type: SuburbItemsDto,
  })
  @UseInterceptors(new TransformDtoInterceptor(SuburbDto))
  async getStateSuburb(@Param() params) {
    return await this.countryService.getStateSuburbOfPostCode(params.countryCode, params.postCode)
  }
}
