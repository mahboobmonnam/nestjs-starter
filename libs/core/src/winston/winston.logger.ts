/* eslint-disable @typescript-eslint/no-shadow */
import { LoggerService } from '@nestjs/common';
import { Logger, createLogger, format, transports } from 'winston';

const { combine, timestamp, colorize, json, prettyPrint } = format;

export const winstonLoggerInstance: Logger = createLogger({
  // format: combine(timestamp(), json()),
  transports: [
    new transports.Console({
      format:
        process.env.NODE_ENV === 'production'
          ? combine(timestamp(), json())
          : combine(colorize(), timestamp(), prettyPrint()),
    }),
  ],
});

export class WinstonLogger implements LoggerService {
  private context?: string;

  constructor(private readonly logger: Logger) {}

  public setContext(context: string) {
    this.context = context;
  }

  log(message: any, context: string = this.context) {
    if (typeof message === 'object') {
      const { message: msg, level = 'info', ...meta } = message;
      return this.logger.log(level, msg as string, { context, value: message, ...meta });
    }
    return this.logger.info(message, { context });
  }

  error(message: any, trace?: string, context: string = this.context) {
    if (message instanceof Error) {
      const { message: value, name, stack, ...meta } = message;
      return this.logger.error(value, { context, stack: [trace || stack], value, ...meta });
    }

    if (typeof message === 'object') {
      const { message: msg, ...meta } = message;
      return this.logger.error(msg as string, { context, stack: [trace], value: msg, ...meta });
    }
    return this.logger.error(message, { context, stack: [trace] });
  }

  warn(message: any, context: string = this.context) {
    if (typeof message === 'object') {
      const { message: msg, ...meta } = message;
      return this.logger.warn(msg as string, { context, value: message, ...meta });
    }
    return this.logger.warn(message, { context });
  }

  debug?(message: any, context: string = this.context) {
    if (typeof message === 'object') {
      const { message: msg, ...meta } = message;
      return this.logger.debug(msg as string, { context, value: message, ...meta });
    }
    return this.logger.debug(message, { context });
  }

  verbose?(message: any, context: string = this.context) {
    if (typeof message === 'object') {
      const { message: msg, ...meta } = message;
      return this.logger.verbose(msg as string, { context, value: message, ...meta });
    }
    return this.logger.verbose(message, { context });
  }

  public getWinstonLogger(): Logger {
    return this.logger;
  }
}
