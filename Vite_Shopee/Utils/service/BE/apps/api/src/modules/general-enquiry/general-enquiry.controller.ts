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
  HttpStatus,
} from '@nestjs/common';
import { GeneralEnquiryService } from './general-enquiry.service';
import { UpdateGeneralEnquiryDto } from './dto/update-general-enquiry.dto';
import { FindAllDto, OnlySelectDto } from '@crud/dto/find-all.dto';
import { FieldSchemaItemsDto } from '@crud/dto/schema.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GeneralEnquiryDto } from './dto/general-enquiry.dto';
import { PaginationGeneralEnquiryDto } from './dto/pagination-general-enquiry.dto';
import { TransformDtoInterceptor } from '@interceptors/transform-dto.interceptor';
import { GeneralEnquiryReqInterceptor } from './interceptors/general-enquiry-req.interceptor';
import { JwtAuthGuard } from '@core/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '@core/casl/guards/policies.guard';
import { CheckPolicies } from '@core/casl/decorators/check-policies.decorator';
import { AppAbility } from '@core/casl/casl-ability.factory';
import { Action } from '@core/casl/enums/action.enum';

@ApiTags('GeneralEnquiry')
@ApiBearerAuth()
@Controller('general-enquiry')
@UseInterceptors(ClassSerializerInterceptor)
export class GeneralEnquiryController {
  constructor(
    private readonly generalEnquiryService: GeneralEnquiryService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Get('schema')
  @ApiOperation({ summary: 'GeneralEnquiry Schema' })
  @ApiResponse({
    status: 200,
    description: 'The model schema',
    type: FieldSchemaItemsDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(Action.Read, 'GeneralEnquiry') ||
      ability.can(Action.Create, 'GeneralEnquiry') ||
      ability.can(Action.Update, 'GeneralEnquiry'),
  )
  async getModelSchema() {
    return this.generalEnquiryService.getModelSchema(GeneralEnquiryDto);
  }

  @Post()
  @ApiOperation({ summary: 'Submit form general enquiry' })
  @ApiResponse({
    status: 200,
    description: 'Submit form general enquiry.',
  })
  async submitGeneralEnquiry(@Body() body: GeneralEnquiryDto) {
    const organization = await this.generalEnquiryService.submitGeneralEnquiry(
      body,
    );

    await this.eventEmitter.emit('customer.GeneralEnquiry', {
      ...body,
      organizationName: organization.name,
    });
    return {
      statusCode: HttpStatus.OK,
      message:
        'Thanks for your enquiry. A Motorserve team member will be in touch soon.',
    };
  }

  @Post('search')
  @HttpCode(200)
  @ApiOperation({ summary: 'List GeneralEnquiry' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: PaginationGeneralEnquiryDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Read, 'GeneralEnquiry'),
  )
  @UseInterceptors(new GeneralEnquiryReqInterceptor(GeneralEnquiryDto))
  @UseInterceptors(new TransformDtoInterceptor(GeneralEnquiryDto))
  findAll(@Body() findAllDto: FindAllDto, @Req() req) {
    return this.generalEnquiryService.findAll(findAllDto, false, req);
  }

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Detail GeneralEnquiry' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: GeneralEnquiryDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Read, 'GeneralEnquiry'),
  )
  @UseInterceptors(new GeneralEnquiryReqInterceptor(GeneralEnquiryDto))
  @UseInterceptors(new TransformDtoInterceptor(GeneralEnquiryDto))
  findOne(
    @Param('id') id: string,
    @Body() onlySelectDto: OnlySelectDto,
    @Req() req,
  ) {
    return this.generalEnquiryService.findOne(+id, onlySelectDto, false, req);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Detail GeneralEnquiry' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: GeneralEnquiryDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Update, 'GeneralEnquiry'),
  )
  @UseInterceptors(new GeneralEnquiryReqInterceptor(GeneralEnquiryDto))
  @UseInterceptors(new TransformDtoInterceptor(GeneralEnquiryDto))
  async update(
    @Param('id') id: string,
    @Body() updateGeneralEnquiryDto: UpdateGeneralEnquiryDto,
    @Req() req,
  ) {
    const result = await this.generalEnquiryService.update(
      +id,
      updateGeneralEnquiryDto,
      req,
    );
    this.eventEmitter.emit('general-enquiry.updated', result);
    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete A general-enquiry' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Delete, 'GeneralEnquiry'),
  )
  @UseInterceptors(new GeneralEnquiryReqInterceptor(GeneralEnquiryDto))
  async remove(@Param('id') id: string, @Req() req) {
    const result = await this.generalEnquiryService.remove(+id, req);
    this.eventEmitter.emit('general-enquiry.deleted', result);
    return result;
  }
}
