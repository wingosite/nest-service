import { HttpStatusMessage } from '@/constants';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

/**
 * 错误处理返回
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const data = exception.getResponse() as any;
    response.status(status).json({
      error: 'Error',
      statusCode: data.statusCode || status,
      message:
        data || HttpStatusMessage[data.statusCode] || HttpStatusMessage[status],
    });
  }
}

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const data = exception.getResponse() as any;
    response.status(status).json({
      error: 'Unauthorized',
      statusCode: data.statusCode || HttpStatus.UNAUTHORIZED,
      message: HttpStatusMessage[data.statusCode],
    });
  }
}
