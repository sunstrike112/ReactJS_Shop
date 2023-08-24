import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  GatewayTimeoutException,
  UnauthorizedException
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    
    const ctx = context.switchToHttp();
    const res = ctx.getResponse();
    const correlationId = res.get('X-Correlation-Id');

    return next
      .handle()
      .pipe(
        catchError(err => {
          const exception = `correlationId: ${correlationId}, exception: ${err}`
          return throwError(exception);
        }),
      );
  }
}
