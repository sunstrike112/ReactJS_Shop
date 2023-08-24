import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class CustomerForgotPasswordDto {
  @IsEmail()
  @MaxLength(50)
  email: string
}

export class CustomerResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  newPassword: string

  @IsString()
  token: string
}