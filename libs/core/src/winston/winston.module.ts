import { DynamicModule, LoggerService, Module } from '@nestjs/common';
import { LoggerOptions } from 'winston';
import { createWinstonProviders, createWinstonWithDefaults } from './winston.providers';

@Module({})
export class WinstonModule {
  static forRoot(options: LoggerOptions): DynamicModule {
    const provider = createWinstonProviders(options);
    return {
      module: WinstonModule,
      providers: provider,
      exports: provider,
    };
  }

  static createLogger(): LoggerService {
    return createWinstonWithDefaults();
  }
}
