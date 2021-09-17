import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { LogHttpDTO } from './dto/loghttp.dto';
import { LogHttpService } from './loghttp.service';

@Controller('loghttp')
export class LogHttpController {
  constructor(private readonly logHttpService: LogHttpService) {}

  @EventPattern('log')
  saveLog(data: LogHttpDTO) {
    return this.logHttpService.saveLog(data);
  }
}
