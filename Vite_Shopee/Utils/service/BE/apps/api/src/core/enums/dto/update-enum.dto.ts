import { PartialType } from '@nestjs/swagger';
import { CreateEnumDto } from './create-enum.dto';

export class UpdateEnumDto extends PartialType(CreateEnumDto) {}
