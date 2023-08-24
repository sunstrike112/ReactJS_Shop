import { MSG_WRONG_CUSTOMER_CREDENTIALS } from '@constants/messages.constant';
import { hashValue } from '@helpers/hash.helper';
import { CustomerService } from '@modules/customer/customer.service';
import { CustomerResetPasswordDto } from '@modules/customer/dto/reset-password.dto';
import { forwardRef, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Injectable()
export class AuthCustomerService {
  constructor(
    private eventEmitter: EventEmitter2,
    private jwtService: JwtService,
    @Inject(forwardRef(() => CustomerService))
    private customerService: CustomerService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) {}

  async getAuthenticatedCustomer(email: string, plainTextPassword: string) {
    try {
      const user = await this.customerService.findOne({ email: email });
      if (!user.isActive) throw new HttpException(MSG_WRONG_CUSTOMER_CREDENTIALS, HttpStatus.BAD_REQUEST);
      await this.authService.verifyPassword(plainTextPassword, user.password);

      const { password, ...userTransformed } = user;
      return userTransformed;
    } catch (error) {
      throw new HttpException(MSG_WRONG_CUSTOMER_CREDENTIALS, HttpStatus.BAD_REQUEST);
    }
  }

  async forgotPassword(email, isAdminCreateCustomer = false) {
    const user = await this.customerService.findCustomerByEmail(email);
    const forgotPasswordToken = this.authService.generateJwtForgotPassword(email, false);

    await this.setCurrentForgotPasswordToken(email, forgotPasswordToken);

    if (isAdminCreateCustomer) {
      this.eventEmitter.emit('customer.created.admin', { user, forgotPasswordToken });
    } else {
      this.eventEmitter.emit('customer.forgotPassword', {user, forgotPasswordToken});
    }
  }

  async setCurrentForgotPasswordToken(email: string, forgotPasswordToken: string) {
    const currentForgotPasswordToken = await hashValue(forgotPasswordToken);
    await this.customerService.update(
      { email: email },
      { currentHashedForgotPasswordToken: currentForgotPasswordToken },
    );
  }

  async resetPassword(customerResetPasswordDto: CustomerResetPasswordDto) {
    const user = await this.authService.getUserFromResetPasswordToken(customerResetPasswordDto.token);

    const hashedNewPassword = await hashValue(customerResetPasswordDto.newPassword);
    await this.customerService.update(user.id, {
      password: hashedNewPassword,
      currentHashedForgotPasswordToken: null,
      emailVerifiedAt: new Date(),
    })
  }

  async handleResponseAccessRefreshToken(email: string) {
    const userLogined = await this.login(email);
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(email, false, false);
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authService.getCookieWithJwtRefreshToken(email, false, false);

    await this.setCurrentRefreshToken(refreshToken, email);

    return { userLogined, accessTokenCookie, refreshTokenCookie, refreshToken };
  }

  async login(email: string) {
    const user = await this.customerService.findCustomerByEmail(email);
    delete user.currentHashedRefreshToken;
    const payload = { email: user.email, isAdmin: false };
    return {
      accessToken: this.jwtService.sign(payload),
      ...user,
    };
  }

  async setCurrentRefreshToken(refreshToken: string, email: string) {
    const currentHashedRefreshToken = await hashValue(refreshToken);
    await this.customerService.update(
      { email: email },
      { currentHashedRefreshToken: currentHashedRefreshToken },
    );
  }

  async removeRefreshToken(email: string) {
    await this.customerService.update(
      { email: email },
      { currentHashedRefreshToken: null },
    );
  }

  async createCustomerSocialUser(userDTO: any) {
    let user = null;

    try {
      user = await this.customerService.findCustomerByEmail(userDTO.email);
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        throw error;
      }
    }

    if (user) {
      user = await this.customerService.update(user.id, { provider: userDTO.provider });
    } else {
      user = await this.customerService.create(userDTO);
    }

    return await this.handleResponseAccessRefreshToken(user.email);
  }
}
