import { NestFactory } from '@nestjs/core';
import { ValidationPipe, ValidationError, BadRequestException } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
// import { ErrorsInterceptor } from '@interceptors/errors.interceptor';
import { TransformInterceptor } from '@interceptors/transform.interceptor';
import { correlationId } from '@middlewares/correlation-id.middleware';
import { httpLogger } from '@middlewares/http-logger.middleware';
import { utilities as nestWinstonModuleUtilities, WinstonModule, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as cookieParser from 'cookie-parser';
// import * as Sentry from '@sentry/node';
import * as helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: ['error', 'warn', 'verbose'],
    logger: true,
    bodyParser: true
  });
  // Global Prefix
  // app.setGlobalPrefix('api');

  // Setting logger application
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  // Sentry.init({
  //   dsn: 'https://9eedb3ca554549de8f2339cf34fa1efa@o687468.ingest.sentry.io/5773056',
  // });

  // app.useGlobalInterceptors(new ErrorsInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());

  // Middleware
  app.use(correlationId);
  app.use(httpLogger);
  app.use(cookieParser());

  // Helmet Security
  app.use(helmet.hidePoweredBy());
  app.use(helmet.xssFilter());
  // Cors
  app.enableCors({
    origin: process.env.CORS_ORIGIN.split(',').map(item => item.trim()),
    methods: process.env.CORS_METHODS,
    allowedHeaders: process.env.CORS_ALLOW_HEADERS.split(',').map(item => item.trim()),
    credentials: true,
    // exposedHeaders: process.env.CORS_EXPOSE_HEADERS
  });
  // compression
  app.use(compression());

  const config = new DocumentBuilder()
    .setTitle('Framework Document')
    .setDescription('The Framework API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe({
    // forbidNonWhitelisted: true,
    transform: true,
    // whitelist: true,
    // validationError: {
    //   target: false,
    //   value: false
    // }
    exceptionFactory: (errors: ValidationError[]) => {
      // console.log(errors);
      const customFormatError = [];
      errors.forEach(error => {
        const errorMsg = Object.values(error["constraints"]);
        const errorObj = {
          'target': error['property'],
          'message': errorMsg[0]
          // [error['property']]: errorMsg[0]
        };
        customFormatError.push(errorObj);
      });
      return new BadRequestException(customFormatError);
    }
  }));

  await app.listen(3000);
}
bootstrap();
