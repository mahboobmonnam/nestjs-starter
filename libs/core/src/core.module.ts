import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { WinstonModule } from './winston/winston.module';

@Module({
  providers: [CoreService],
  exports: [CoreService],
  imports: [WinstonModule],
})
export class CoreModule {}
