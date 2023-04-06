import { NestFactory } from '@nestjs/core';
import { WinstonModule } from '@app/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(),
  });
  await app.listen(3000);
  Logger.log('Application is running on port 3000');
}
bootstrap();
