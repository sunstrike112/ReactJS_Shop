import { Injectable, NestInterceptor, ExecutionContext, CallHandler, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { defaultOrganizationId } from '@constants/variable.const';
import { MSG_FORBIDDEN_DELETE_ORGANIZATION_DEFAULT } from '@constants/messages.constant';
import { GeneratedOrganizationType } from '@generated/organization-type.enum';

interface ClassType<T> {
  new(): T;
}

@Injectable()
export class OrganizationReqInterceptor<T> implements NestInterceptor<Partial<T>, T> {

  constructor(private readonly classType: ClassType<T>) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<T>> {
    const { body, params } = context.switchToHttp().getRequest();
    context.switchToHttp().getRequest().body = await this.beforeHandleNext(context.getHandler().name, body, params);

    return next.handle().pipe(
      switchMap(async data => this.afterHandleNext(context.getHandler().name, data))
    );
  }

  private async beforeHandleNext(methodName: string, data: any, params: any) {
    if (methodName === 'create' || methodName === 'update') {
      data.parentId = defaultOrganizationId;
      data.type = GeneratedOrganizationType[GeneratedOrganizationType.servicecentre];
    }

    if (methodName === 'remove') {
      if (+params.id === defaultOrganizationId) throw new ForbiddenException(MSG_FORBIDDEN_DELETE_ORGANIZATION_DEFAULT);
    }
    return data;
  }

  private async afterHandleNext(methodName: string, data: any) {
    return data;
  }
}