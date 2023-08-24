import {
  ExecutionContext,
  Injectable,
  NestInterceptor,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as Sentry from '@sentry/minimal';

@Injectable()
export class SentryInterceptor implements NestInterceptor {

  intercept( context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const res = ctx.getResponse();
    const correlationId = res.get('X-Correlation-Id');

    return next
      .handle()
      .pipe(
        tap(null, (exception) => {
          exception = `correlationId: ${correlationId}, exception: ${exception}`
          Sentry.captureException(exception);
        }),
      );
  }
}