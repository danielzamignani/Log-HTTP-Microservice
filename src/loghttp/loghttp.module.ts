import { Module } from '@nestjs/common';
import { LogHttpService } from './loghttp.service';
import { LogHttpController } from './loghttp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogHttp } from './entities/loghttp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LogHttp])],
  providers: [LogHttpService],
  controllers: [LogHttpController],
})
export class LogHttpModule {}
