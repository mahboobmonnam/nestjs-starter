import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly logger: Logger) {}

  @Get()
  getHello(): string {
    this.logger.log('test', 'App controller get hello');
    return this.appService.getHello();
  }
}
