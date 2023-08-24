import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthCustomerService } from '../auth-customer.service';

@Injectable()
export class CustomerLocalStrategy extends PassportStrategy(Strategy, 'customer-local') {
  constructor(
    private authCustomerService: AuthCustomerService
  ) {
    super({
      usernameField: 'email'
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authCustomerService.getAuthenticatedCustomer(email, password);
    return user;
  }
}