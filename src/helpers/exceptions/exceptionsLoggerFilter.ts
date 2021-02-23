import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import {BaseExceptionFilter} from "@nestjs/core";

@Catch()
export class ExceptionsLoggerFilter<T> extends BaseExceptionFilter {
  catch(exception: T, host: ArgumentsHost): void {
    super.catch(exception, host);
  }
}
