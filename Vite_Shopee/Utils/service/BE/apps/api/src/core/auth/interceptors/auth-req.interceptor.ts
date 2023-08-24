import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { hashValue } from '@helpers/hash.helper';

@Injectable()
export class AuthReqInterceptor<T> implements NestInterceptor<Partial<T>, T> {

  constructor() {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<T>> {
    const { body } = context.switchToHttp().getRequest();
    context.switchToHttp().getRequest().body = await this.beforeHandleNext(context.getHandler().name, body);

    return next.handle().pipe(
      switchMap(async data => this.afterHandleNext(context.getHandler().name, data))
    );
  }

  private async beforeHandleNext(methodName: string, data: any) {
    return data;
  }

  private async afterHandleNext(methodName: string, data: any) {
    if (["login", "refresh"].includes(methodName)) return this.removeGuardedFields(data);
    return data;
  }

  private removeGuardedFields(data) {
    const guardedFields = [
      'currentHashedRefreshToken',
      'password',
      'twoFactorAuthenticationSecret'
    ];
    return Object.fromEntries(
      Object.entries(data).filter(
        ([key, val]) => !guardedFields.includes(key)
      )
    );
  }
}