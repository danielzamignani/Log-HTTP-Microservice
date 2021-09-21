import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitModule } from 'src/shared/providers/rabbitMq.module';

import { LogHttp } from './entities/loghttp.entity';
import { LogHttpService } from './loghttp.service';

@Module({
  imports: [TypeOrmModule.forFeature([LogHttp]), RabbitModule],
  providers: [LogHttpService],
  exports: [LogHttpService],
})
export class LogHttpModule {}
