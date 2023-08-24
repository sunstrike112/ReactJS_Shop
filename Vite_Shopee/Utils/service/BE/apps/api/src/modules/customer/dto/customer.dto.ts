import { PartialType, OmitType, PickType, ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { GeneratedCustomerEntity } from '@generated/customer.dto';

export class CustomerDto extends OmitType(
  GeneratedCustomerEntity,
  ['emailVerifiedAt', 'isActive', 'createdAt', 'updatedAt', 'deletedAt', 'provider', 'isActive', 'currentHashedRefreshToken', 'currentHashedForgotPasswordToken'] as const
) {
  @Exclude()
  @ApiHideProperty()
  password?: string;

  @Exclude()
  @ApiHideProperty()
  currentHashedRefreshToken: string;

  @Exclude()
  @ApiHideProperty()
  currentHashedForgotPasswordToken: string;

  @Exclude()
  @ApiHideProperty()
  emailVerifiedAt: Date;
}

export class CustomerLoginRequestDto extends PickType(GeneratedCustomerEntity, ['email', 'password'] as const) {}