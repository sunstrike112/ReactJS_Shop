import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { paramCase } from "change-case";
import { defaultRoleLevel } from '@constants/variable.const'
 
interface ClassType<T> {
  new(): T;
}

@Injectable()
export class RoleReqInterceptor<T> implements NestInterceptor<Partial<T>, T> {

  constructor(private readonly classType: ClassType<T>) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<T>> {
    const { body } = context.switchToHttp().getRequest();
    context.switchToHttp().getRequest().body = await this.beforeHandleNext(context.getHandler().name, body);

    return next.handle().pipe(
      switchMap(async data => this.afterHandleNext(context.getHandler().name, data))
    );
  }

  private async beforeHandleNext(methodName: string, data: any) {
    if (methodName == 'create') {
      data.level = data.level ?? defaultRoleLevel;
    }
    if (methodName == 'create' || methodName == 'update') {
      // transform name to code
      if (data.name && !data.code) data.code = paramCase(data.name.trim());
    }
    return data;
  }

  private async afterHandleNext(methodName: string, data: any) {
    return data;
  }
}
