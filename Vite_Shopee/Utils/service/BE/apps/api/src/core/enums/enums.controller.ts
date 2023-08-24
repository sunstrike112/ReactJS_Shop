import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { EnumsService } from './enums.service';
import { CreateEnumDto } from './dto/create-enum.dto';
import { UpdateEnumDto } from './dto/update-enum.dto';
import { EnumToArrayInterceptor } from '@interceptors/enum-array.interceptor';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiExcludeEndpoint,
  ApiSecurity,
  ApiBody,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { GeneratedGender } from '@generated/gender.enum';
import { GeneratedOrganizationType } from '@generated/organization-type.enum';
import { GeneratedGlobalSettingType } from '@generated/global-setting-type.enum';
import { GeneratedProvider } from '@generated/provider.enum';

@Controller('enums')
@ApiTags('Enums')
export class EnumsController {
  constructor(private readonly enumsService: EnumsService) {}

  @Get('/Gender')
  @ApiOperation({ summary: 'Gender Enum' })
  @ApiResponse({
    status: 200,
    description: 'The model enum',
  })
  @UseInterceptors(new EnumToArrayInterceptor())
  findGender() {
    return { statusCode: 200, message: GeneratedGender };
  }

  @Get('/Provider')
  @ApiOperation({ summary: 'Provider Enum' })
  @ApiResponse({
    status: 200,
    description: 'The model enum',
  })
  @UseInterceptors(new EnumToArrayInterceptor())
  findProvider() {
    return { statusCode: 200, message: GeneratedProvider };
  }

  @Get('/OrganizationType')
  @ApiOperation({ summary: 'OrganizationType Enum' })
  @ApiResponse({
    status: 200,
    description: 'The model enum',
  })
  @UseInterceptors(new EnumToArrayInterceptor())
  findOrganizationType() {
    return { statusCode: 200, message: GeneratedOrganizationType };
  }

  @Get('/GlobalSettingType')
  @ApiOperation({ summary: 'GlobalSettingType Enum' })
  @ApiResponse({
    status: 200,
    description: 'The model enum',
  })
  @UseInterceptors(new EnumToArrayInterceptor())
  findGlobalSettingType() {
    return { statusCode: 200, message: GeneratedGlobalSettingType };
  }
}
