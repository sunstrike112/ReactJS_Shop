import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { uuid } from 'uuidv4';

export function correlationId(req: Request, res: Response, next: NextFunction) {
  const correlationHeader = req.header("x-correlation-id") || uuid();
  req.headers["x-correlation-id"] = correlationHeader;
  res.set("X-Correlation-Id", correlationHeader);
  next();
};

