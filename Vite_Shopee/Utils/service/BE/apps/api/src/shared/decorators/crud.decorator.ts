import { SetMetadata } from '@nestjs/common';

export function Crud(name: string) {
  return function (constructor: Function) {
    constructor.prototype.modelName = name;
  }
}