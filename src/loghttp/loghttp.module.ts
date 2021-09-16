import { Module } from '@nestjs/common';
import { LoghttpService } from './loghttp.service';
import { LoghttpController } from './loghttp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogHttp } from './entities/loghttp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LogHttp])],
  providers: [LoghttpService],
  controllers: [LoghttpController],
})
export class LoghttpModule {}
