import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, IsNotEmpty, IsOptional, IsPositive, Min } from 'class-validator';

export class FindAllDto {
  @IsInt()
  @IsOptional()
  @Min(-1)
  page?: number

  @IsInt()
  @IsOptional()
  @IsPositive()
  size?: number

  // @IsOptional()
  // cursor?: any
  
  @IsOptional()
  where?: any

  @IsOptional()
  select?: any;

  @IsOptional()
  include?: any;

  @IsOptional()
  orderBy?: any
}

export class OnlySelectDto {
  @IsOptional()
  select?: any;

  @IsOptional()
  include?: any;
}