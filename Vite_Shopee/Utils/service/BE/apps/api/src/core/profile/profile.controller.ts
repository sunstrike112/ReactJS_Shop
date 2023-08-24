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
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UserService } from '@core/user/user.service';
import { UpdatePasswordDto, UpdateProfileDto } from './dto/update-profile.dto';
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
import { ProfileDto } from './dto/profile.dto';
import { UserLoginedDto } from '@core/auth/dto/auth.dto';
import { TransformDtoInterceptor } from '@interceptors/transform-dto.interceptor';
import { ProfileReqInterceptor } from './interceptors/profile-req.interceptor';
import { SentryInterceptor } from '@interceptors/sentry.interceptor';
import { JwtAuthGuard } from '@core/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '@core/casl/guards/policies.guard';
import { CheckPolicies } from '@core/casl/decorators/check-policies.decorator';
import { AppAbility } from '@core/casl/casl-ability.factory';
import { Action } from '@core/casl/enums/action.enum';
import { User } from '@core/auth/decorators/user.decorator';

@ApiTags('Profiles')
@ApiBearerAuth()
@Controller('auth/profiles')
@UseInterceptors(ClassSerializerInterceptor)
// @UseInterceptors(SentryInterceptor)
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private userService: UserService,
    private eventEmitter: EventEmitter2
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get Current User Profile' })
  @ApiResponse({
    status: 200,
    description: 'Get Current User Profile successfully',
    type: ProfileDto,
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ProfileReqInterceptor(ProfileDto))
  @UseInterceptors(new TransformDtoInterceptor(ProfileDto))
  async getProfiles(@User() user: any) {
    const result = await this.profileService.getProfiles(user);
    
    return result;
  }

  @Patch()
  @ApiOperation({ summary: 'Update Current User Profile' })
  @ApiResponse({
    status: 200,
    description: 'The profile has been successfully deleted.',
    type: ProfileDto,
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ProfileReqInterceptor(UpdateProfileDto))
  @UseInterceptors(new TransformDtoInterceptor(ProfileDto))
  async updateProfiles(@Body() updateProfileDto: UpdateProfileDto, @User() user: any) {
    const result = await this.profileService.updateProfiles(user, updateProfileDto);
    this.eventEmitter.emit('profiles.updated', result);
    return result;
  }

  @Patch('change-password')
  @ApiOperation({ summary: 'Change password of current user' })
  @ApiResponse({
    status: 200,
    description: 'The password has been successfully changed.'
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ProfileReqInterceptor(UpdatePasswordDto))
  @UseInterceptors(new TransformDtoInterceptor(ProfileDto))
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto, @Req() req: any) {
    const { user } = req;
    const result = await this.profileService.updatePassword(user.id, updatePasswordDto);
    this.eventEmitter.emit('profiles.updated', result);
    return result;
  }
}