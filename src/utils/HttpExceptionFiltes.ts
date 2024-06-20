import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { ValidationException } from './ValidateExceptions';

@Catch(ValidationException) 
export class AllExceptionsFilter implements ExceptionFilter {
  async catch(exception: ValidationException, host: ArgumentsHost)  {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Unexpected error occurred';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse() as string;
    } else if (exception instanceof Error) {

      message = exception.message;
    }

    response.status(200).json({
      statusCode: 200,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
      status,
      detail: (exception as any).detail || null,
    });
  }
}