import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface ClassType<T> {
  new(): T;
}

@Injectable()
export class TransformDtoInterceptor<T> implements NestInterceptor<Partial<T>, T> {

  constructor(private readonly classType: ClassType<T>) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<T>> {
    return next.handle().pipe(
      switchMap(async data => {
        // Whether data has items property and items is array
        if (data === undefined) return data;
        if (data.items && data.items.length > 0) {
          data.items = await of(data.items).pipe(
            map(item => plainToClass(this.classType, item))
          ).toPromise();
          return data;
        } else {
          return plainToClass(this.classType, data)
        }
      })
    );
  }
}