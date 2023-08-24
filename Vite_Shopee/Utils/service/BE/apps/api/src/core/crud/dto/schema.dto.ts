import {
  IsInt,
  IsEmpty,
  IsOptional,
  ValidateNested,
  IsArray,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

export class FieldSchemaDto {
  name: string;
  /*
   * Determine the field is required
   */
  isRequired: boolean;
  /*
   * Determine the field is unique
   */
  isUnique?: boolean;
  /*
   * Determine the field is ID
   */
  isId: boolean;
  isReadOnly?: boolean;
  type: string;
  hasDefaultValue?: boolean;
  default?: any;
  /*
   * Determine Relation Resource
   */
  isList?: boolean;
}

export class FieldSchemaItemsDto {
  items: FieldSchemaDto[];
  relationships: string[];
}

@ValidatorConstraint()
export class IsManyToMany implements ValidatorConstraintInterface {
  public async validate(manyToManyDto: ManyToManyDto, args: ValidationArguments) {
    return this.validateIds(manyToManyDto, 'connect') &&
      this.validateIds(manyToManyDto, 'disconnect') &&
      (!manyToManyDto.set || (Array.isArray(manyToManyDto.set) && manyToManyDto.set.length === 0));
  }

  validateIds(manyToManyDto: ManyToManyDto, key: string) {
    if (!manyToManyDto[key]) return true;
    if (!Array.isArray(manyToManyDto[key])) return false;
    const itemHasNotId = manyToManyDto[key].filter((item) => !item.hasOwnProperty('id'));
    if (itemHasNotId && itemHasNotId.length > 0) return false;
    const itemHasIdValueNotNumber = manyToManyDto[key].filter((item: any) => item.id && typeof item.id !== 'number');
    if (itemHasIdValueNotNumber && itemHasIdValueNotNumber.length > 0) return false;
    return true;
  }
}

export class IdDto {
  id: number;
}

export class ManyToManyDto {
  /*
   * using set when you want to clear all relative items that connected
   */
  @IsOptional()
  @IsArray()
  set?: any[];

  @IsOptional()
  @IsArray()
  connect?: IdDto[];

  @IsOptional()
  @IsArray()
  disconnect?: IdDto[];
}