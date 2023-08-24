import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { hashValue } from '@helpers/hash.helper';
import {
  Ability,
  AbilityBuilder,
  Abilities,
  buildMongoQueryMatcher,
} from '@casl/ability';
import { uuid } from 'uuidv4';

interface ClassType<T> {
  new(): T;
}

@Injectable()
export class UserReqInterceptor<T> implements NestInterceptor<Partial<T>, T> {

  constructor(private readonly classType: ClassType<T>) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<T>> {
    const { body, user } = context.switchToHttp().getRequest();
    context.switchToHttp().getRequest().body = await this.beforeHandleNext(context.getHandler().name, body);

    return next.handle().pipe(
      switchMap(async data => this.afterHandleNext(context.getHandler().name, data))
    );
  }

  private async beforeHandleNext(methodName: string, data: any) {
    if (["create", "update"].includes(methodName)) {
      let password = data.password;
      if (["create"].includes(methodName) && !password) {
        password = uuid();
      }
      if (password) {
        data.password = await hashValue(password);
      }
    }
    return data;
  }

  private async afterHandleNext(methodName: string, data: any) {
    // if (["findAll", "findOne"].includes(methodName)) {
    //   if (data.items) {
    //     data.items = data.items.map((item) => {
    //       item.fullName = this.handleExposeFullName(item.firstName, item.lastName);
    //       return item;
    //     })
    //   } else {
    //     data.fullName = this.handleExposeFullName(data.firstName, data.lastName);
    //   }
    // }
    return data;
  }

  // handleExposeFullName(firstName?: string, lastName?: string) {
  //   return (firstName || lastName) ? firstName + " " + lastName : null
  // }
}