import { Catch, ArgumentsHost, Logger, Injectable } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class ExceptionsLoggerFilter extends BaseExceptionFilter {

  private readonly logger = new Logger();

  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
    const [req, res, next] = host.getArgs();
    const correlationId = res.get('X-Correlation-Id');
    const errorException = `correlationId: ${correlationId}, exception: ${JSON.stringify(exception)}`;
    this.logger.error(errorException);
  }
}