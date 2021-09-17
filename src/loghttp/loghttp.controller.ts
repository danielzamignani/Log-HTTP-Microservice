import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { LogHttpDTO } from './dto/loghttp.dto';
import { LogHttpService } from './loghttp.service';

@Controller('loghttp')
export class LogHttpController {
  constructor(private readonly logHttpService: LogHttpService) {}

  @EventPattern('log')
  async saveLog(@Payload() data: LogHttpDTO, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    await this.logHttpService.saveLog(data);

    channel.ack(originalMsg);
  }
}
