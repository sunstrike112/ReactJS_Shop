import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { hashValue } from '@helpers/hash.helper';
import { uuid } from 'uuidv4';

interface ClassType<T> {
  new(): T;
}

@Injectable()
export class CustomerReqInterceptor<T> implements NestInterceptor<Partial<T>, T> {

  constructor(private readonly classType: ClassType<T>) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<T>> {
    const { body } = context.switchToHttp().getRequest();
    context.switchToHttp().getRequest().body = await this.beforeHandleNext(context.getHandler().name, body);

    return next.handle().pipe(
      switchMap(async data => this.afterHandleNext(context.getHandler().name, data))
    );
  }

  private async beforeHandleNext(methodName: string, data: any) {
    if (["create", "update", "adminCreate", "adminUpdate"].includes(methodName)) {
      let password = data.password;
      if (methodName === 'adminCreate' && !password) {
        password = uuid();
      }
      
      if (password) {
        data.password = await hashValue(password);
      }
    }

    return data;
  }

  private async afterHandleNext(methodName: string, data: any) {
    return data;
  }
}