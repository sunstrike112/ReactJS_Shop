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
  CacheKey,
  CacheTTL,
  UseGuards,
  ExecutionContext,
  HttpCode,
} from '@nestjs/common';
import { GlobalSettingService } from './global-setting.service';
import { CreateGlobalSettingDto } from './dto/create-global-setting.dto';
import { UpdateGlobalSettingDto } from './dto/update-global-setting.dto';
import { FindAllDto, OnlySelectDto } from '@crud/dto/find-all.dto';
import { FieldSchemaDto, FieldSchemaItemsDto } from '@crud/dto/schema.dto';
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
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GlobalSettingDto } from './dto/global-setting.dto';
import { PaginationGlobalSettingDto } from './dto/pagination-global-setting.dto';
import { TransformDtoInterceptor } from '@interceptors/transform-dto.interceptor';
import { GlobalSettingReqInterceptor } from './interceptors/global-setting-req.interceptor';
import { SentryInterceptor } from '@interceptors/sentry.interceptor';
import { JwtAuthGuard } from '@core/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '@core/casl/guards/policies.guard';
import { CheckPolicies } from '@core/casl/decorators/check-policies.decorator';
import { AppAbility } from '@core/casl/casl-ability.factory';
import { Action } from '@core/casl/enums/action.enum';

@ApiTags('GlobalSettings')
@ApiBearerAuth()
@Controller('global-settings')
@UseInterceptors(ClassSerializerInterceptor)
// @UseInterceptors(SentryInterceptor)
export class GlobalSettingController {
  constructor(
    private readonly globalSettingService: GlobalSettingService,
    private eventEmitter: EventEmitter2
  ) {}

  @Get('schema')
  @ApiOperation({ summary: 'GlobalSetting Schema' })
  @ApiResponse({
    status: 200,
    description: 'The model schema',
    type: FieldSchemaItemsDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(Action.Read, 'GlobalSetting') || ability.can(Action.Create, 'GlobalSetting') || ability.can(Action.Update, 'GlobalSetting')
  )
  async getModelSchema() {
    return this.globalSettingService.getModelSchema(GlobalSettingDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create GlobalSetting' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: GlobalSettingDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, 'GlobalSetting'))
  @UseInterceptors(new GlobalSettingReqInterceptor(GlobalSettingDto))
  @UseInterceptors(new TransformDtoInterceptor(GlobalSettingDto))
  async create(@Body() createGlobalSettingDto: CreateGlobalSettingDto, @Req() req) {
    const result = await this.globalSettingService.create(createGlobalSettingDto, req);
    this.eventEmitter.emit('global-settings.created', result);
    return result;
  }

  @Post('search')
  @HttpCode(200)
  @ApiOperation({ summary: 'List GlobalSetting' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: PaginationGlobalSettingDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'GlobalSetting'))
  @UseInterceptors(new GlobalSettingReqInterceptor(GlobalSettingDto))
  @UseInterceptors(new TransformDtoInterceptor(GlobalSettingDto))
  findAll(@Body() findAllDto: FindAllDto, @Req() req) {
    return this.globalSettingService.findAll(findAllDto, false, req);
  }

  // @Get('include-trashed')
  // @ApiOperation({ summary: 'List GlobalSetting (With Trashed)' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The found record',
  //   type: PaginationGlobalSettingDto,
  // })
  // @UseInterceptors(new GlobalSettingReqInterceptor(GlobalSettingDto))
  // @UseInterceptors(new TransformDtoInterceptor(GlobalSettingDto))
  // findAllWithTrashed(@Body() findAllDto: FindAllDto) {
  //   return this.globalSettingService.findAll(findAllDto, true);
  // }

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Detail GlobalSetting' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: GlobalSettingDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'GlobalSetting'))
  @UseInterceptors(new GlobalSettingReqInterceptor(GlobalSettingDto))
  @UseInterceptors(new TransformDtoInterceptor(GlobalSettingDto))
  findOne(@Param('id') id: string, @Body() onlySelectDto: OnlySelectDto, @Req() req) {
    return this.globalSettingService.findOne(+id, onlySelectDto, false, req);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Detail GlobalSetting' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: GlobalSettingDto
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, 'GlobalSetting'))
  @UseInterceptors(new GlobalSettingReqInterceptor(GlobalSettingDto))
  @UseInterceptors(new TransformDtoInterceptor(GlobalSettingDto))
  async update(@Param('id') id: string, @Body() updateGlobalSettingDto: UpdateGlobalSettingDto, @Req() req) {
    const result = await this.globalSettingService.update(+id, updateGlobalSettingDto, req);
    this.eventEmitter.emit('global-settings.updated', result);
    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete A global-setting' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.'
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, 'GlobalSetting'))
  @UseInterceptors(new GlobalSettingReqInterceptor(GlobalSettingDto))
  async remove(@Param('id') id: string, @Req() req) {
    const result = await this.globalSettingService.remove(+id, req);
    this.eventEmitter.emit('global-settings.deleted', result);
    return result;
  }
}