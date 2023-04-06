import { Provider } from '@nestjs/common';
import { LoggerOptions, createLogger } from 'winston';
import { WinstonLogger, winstonLoggerInstance } from './winston.logger';

export function createWinstonProviders(loggerOptions: LoggerOptions): Provider[] {
  return [
    {
      provide: 'WINSTON_MODULE_PROVIDER',
      useFactory: () => createLogger(loggerOptions),
    },
  ];
}

export function createWinstonWithDefaults(): WinstonLogger {
  return new WinstonLogger(winstonLoggerInstance);
}
