import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { LogHttpDTO } from './dto/loghttp.dto';

@Controller('loghttp')
export class LoghttpController {
  @EventPattern({ cmd: 'log' })
  test(data: LogHttpDTO) {
    console.log(data);
  }
}
