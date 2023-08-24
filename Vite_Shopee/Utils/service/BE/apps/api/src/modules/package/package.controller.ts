import {
  Controller,
  Req,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { FindAllDto, OnlySelectDto } from '@crud/dto/find-all.dto';
import { FieldSchemaItemsDto } from '@crud/dto/schema.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PackageDto } from './dto/package.dto';
import { PaginationPackageDto } from './dto/pagination-package.dto';
import { TransformDtoInterceptor } from '@interceptors/transform-dto.interceptor';
import { PackageReqInterceptor } from './interceptors/package-req.interceptor';
import { JwtAuthGuard } from '@core/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '@core/casl/guards/policies.guard';
import { CheckPolicies } from '@core/casl/decorators/check-policies.decorator';
import { AppAbility } from '@core/casl/casl-ability.factory';
import { Action } from '@core/casl/enums/action.enum';

@ApiTags('Packages')
@ApiBearerAuth()
@Controller('packages')
@UseInterceptors(ClassSerializerInterceptor)
// @UseInterceptors(SentryInterceptor)
export class PackageController {
  constructor(
    private readonly packageService: PackageService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Get('schema')
  @ApiOperation({ summary: 'Package Schema' })
  @ApiResponse({
    status: 200,
    description: 'The model schema',
    type: FieldSchemaItemsDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(Action.Read, 'Package') ||
      ability.can(Action.Create, 'Package') ||
      ability.can(Action.Update, 'Package'),
  )
  async getModelSchema() {
    return this.packageService.getModelSchema(PackageDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create Package' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: PackageDto,
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new PackageReqInterceptor(PackageDto))
  @UseInterceptors(new TransformDtoInterceptor(PackageDto))
  async create(@Body() createPackageDto: CreatePackageDto, @Req() req) {
    const result = await this.packageService.create(createPackageDto, req);
    this.eventEmitter.emit('packages.created', result);
    return result;
  }

  @Post('search')
  @HttpCode(200)
  @ApiOperation({ summary: 'List Package' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: PaginationPackageDto,
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new PackageReqInterceptor(PackageDto))
  @UseInterceptors(new TransformDtoInterceptor(PackageDto))
  findAll(@Body() findAllDto: FindAllDto, @Req() req) {
    return this.packageService.findAll(findAllDto, false, req);
  }

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Detail Package' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: PackageDto,
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new PackageReqInterceptor(PackageDto))
  @UseInterceptors(new TransformDtoInterceptor(PackageDto))
  findOne(
    @Param('id') id: string,
    @Body() onlySelectDto: OnlySelectDto,
    @Req() req,
  ) {
    return this.packageService.findOne(+id, onlySelectDto, false, req);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Detail Package' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PackageDto,
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new PackageReqInterceptor(PackageDto))
  @UseInterceptors(new TransformDtoInterceptor(PackageDto))
  async update(
    @Param('id') id: string,
    @Body() updatePackageDto: UpdatePackageDto,
    @Req() req,
  ) {
    const result = await this.packageService.update(+id, updatePackageDto, req);
    this.eventEmitter.emit('packages.updated', result);
    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete A package' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new PackageReqInterceptor(PackageDto))
  async remove(@Param('id') id: string, @Req() req) {
    const result = await this.packageService.remove(+id, req);
    this.eventEmitter.emit('packages.deleted', result);
    return result;
  }
}
