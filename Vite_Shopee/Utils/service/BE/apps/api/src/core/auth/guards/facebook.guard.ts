import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FacebookGuard extends AuthGuard('facebook') {
  constructor() {
    super();
  }

  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (err || !user) {
      return {
        error: {
          statusCode: err.status,
          message: err.message
        }
      };
    }
    return user;
  }
}