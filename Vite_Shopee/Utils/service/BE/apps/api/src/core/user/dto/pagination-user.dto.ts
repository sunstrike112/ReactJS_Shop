import { PartialType, PickType, IntersectionType, OmitType } from '@nestjs/swagger';
import { PaginationDto } from '@crud/dto/pagination.dto';
import { UserDto } from './user.dto';

export class UserItemsDto {
  items: UserDto[]
}

export class PaginationUserDto extends IntersectionType(
  UserItemsDto,
  PaginationDto,
) {}
