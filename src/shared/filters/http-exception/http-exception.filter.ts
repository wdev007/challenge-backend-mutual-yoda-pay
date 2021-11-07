import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger();

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (!(exception instanceof HttpException)) {
      this.logger.error('ocorreu um erro inesperado!', exception);
      return response.status(500).json({
        message: 'Internal server error',
      });
    }

    const status = exception.getStatus();
    const message = exception.getResponse();

    this.logger.debug(
      `RESPONSE: ${exception.getResponse()} - STATUS: ${status}`,
    );

    response.status(status).json({
      message,
    });
  }
}
