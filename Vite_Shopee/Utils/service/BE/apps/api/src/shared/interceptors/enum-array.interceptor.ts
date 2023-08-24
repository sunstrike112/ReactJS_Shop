import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { enumToArray } from '@helpers/enum-array.helper';

// interface ClassType<T> {
//   new(): T;
// }

@Injectable()
export class EnumToArrayInterceptor<T> implements NestInterceptor<Partial<T[]>, T[]> {

  constructor() {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    return next.handle().pipe(switchMap(async data => await enumToArray(data.message)));
  }
}