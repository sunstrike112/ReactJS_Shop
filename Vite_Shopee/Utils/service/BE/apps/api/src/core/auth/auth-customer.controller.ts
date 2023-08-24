import { TransformDtoInterceptor } from '@interceptors/transform-dto.interceptor';
import { CustomerDto, CustomerLoginRequestDto } from '@modules/customer/dto/customer.dto';
import { CustomerForgotPasswordDto, CustomerResetPasswordDto } from '@modules/customer/dto/reset-password.dto';
import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthCustomerService } from './auth-customer.service';
import { User } from './decorators/user.decorator';
import { CustomerLocalAuthGuard } from './guards/customer-local-auth.guard,';
import { FacebookGuard } from './guards/facebook.guard';
import { GoogleGuard } from './guards/google.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Controller('auth/customer')
@ApiTags('Auth Customer')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthCustomerController {
  constructor(
    private readonly authCustomerService: AuthCustomerService,
  ) {}

  @UseGuards(CustomerLocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Customer Local Login' })
  @ApiBody({
    type: CustomerLoginRequestDto
  })
  @ApiResponse({
    status: 200,
    description: 'The login has been successfully.',
    type: CustomerDto,
  })
  @UseInterceptors(new TransformDtoInterceptor(CustomerDto))
  async customerLogin(@Req() req: any) {
    const { user } = req;
    const { userLogined, refreshTokenCookie, refreshToken } = await this.authCustomerService.handleResponseAccessRefreshToken(user.email);

    req.res.setHeader('Set-Cookie', [refreshTokenCookie]);
    userLogined['refreshToken'] = refreshToken;

    return userLogined;
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Forgot password for user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The forgot password email has been sent.'
  })
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() customerForgotPasswordDto: CustomerForgotPasswordDto) {
    const { email } = customerForgotPasswordDto;
    await this.authCustomerService.forgotPassword(email);
  
    return {
      statusCode: HttpStatus.OK,
      message: 'The forgot password email has been sent.',
    };
  }
  
  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password for customer' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Reset password has been successfully.'
  })
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() customerResetPasswordDto: CustomerResetPasswordDto) {
    await this.authCustomerService.resetPassword(customerResetPasswordDto);

    return {
      statusCode: HttpStatus.OK,
      message: 'Reset password has been successfully.',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout' })
  async logOut(@Req() req: any) {
    const { user } = req;
    await this.authCustomerService.removeRefreshToken(user.email);
    return { 
      statusCode: 200,
      message: "Logout sucessfully" 
    };
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @ApiOperation({ summary: 'Get Refresh Token' })
  @ApiBearerAuth()
  @ApiBody({
    type: CustomerLoginRequestDto
  })
  @ApiResponse({
    status: 200,
    description: 'The refresh has been successfully.',
    type: CustomerDto,
  })
  @UseInterceptors(new TransformDtoInterceptor(CustomerDto))
  async refresh(@Req() req: any) {
    const { user } = req;
    const { userLogined, refreshTokenCookie, refreshToken } = await this.authCustomerService.handleResponseAccessRefreshToken(user.email);

    req.res.setHeader('Set-Cookie', [refreshTokenCookie]);
    userLogined['refreshToken'] = refreshToken;

    return userLogined;
  }

  @Get('/facebook')
  @ApiOperation({ summary: 'Facebook authentication' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User detail'
  })
  @UseGuards(FacebookGuard)
  async facebookAuth(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(FacebookGuard)
  async facebookAuthRedirect(@User() user, @Req() req: any): Promise<any> {
    if (user.error) {
      const statusCode = user.error.statusCode ? user.error.statusCode : HttpStatus.FORBIDDEN;
      req.res.status(statusCode);
      return {
        statusCode,
        message: user.error.message,
      };
    }

    const { userLogined, refreshTokenCookie, refreshToken } =
      await this.authCustomerService.createCustomerSocialUser(user);

    req.res.setHeader('Set-Cookie', [refreshTokenCookie]);
    userLogined['refreshToken'] = refreshToken;

    return userLogined;
  }

  @Get('/google')
  @ApiOperation({ summary: 'Google authentication' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User detail'
  })
  @UseGuards(GoogleGuard)
  async googleAuth() {}

  @Get('/google/redirect')
  @UseGuards(GoogleGuard)
  async googleAuthRedirect(@User() user, @Req() req: any): Promise<any> {
    const { userLogined, refreshTokenCookie, refreshToken } =
      await this.authCustomerService.createCustomerSocialUser(user);

    req.res.setHeader('Set-Cookie', [refreshTokenCookie]);
    userLogined['refreshToken'] = refreshToken;

    return userLogined;
  }
}
