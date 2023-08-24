import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function httpLogger(req: Request, res: Response, next: NextFunction) {
  const { ip, method, path: url } = req;
  const userAgent = req.get('user-agent') || '';

  res.on('close', () => {
    const { statusCode } = res;
    const contentType = res.get('Content-Type');
    const contentLength = res.get('Content-Length');
    const correlationId = res.get('X-Correlation-Id');
    const reqBody = JSON.stringify(req.body);

    const logger = new Logger();
    logger.verbose(`{
      correlationId: ${correlationId},
      method: ${method},
      url: ${url},
      statusCode: ${statusCode},
      contentType: ${contentType},
      contentLength: ${contentLength},
      userAgent: ${userAgent},
      ip: ${ip},
      body: ${reqBody}
    }`);
  });
  
  next();
};

