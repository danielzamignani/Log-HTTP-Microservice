import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel, ConsumeMessage } from 'amqplib';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';
import { LogHttp } from './entities/loghttp.entity';

@Injectable()
export class LogHttpService {
  constructor(
    @Inject('RABBIT_CONSUMER_CHANNEL')
    private readonly consumerChannel: Channel,
    @InjectRepository(LogHttp)
    private readonly logHttpRepository: Repository<LogHttp>,
  ) {
    this.saveLog();
  }
  async saveLog() {
    this.consumerChannel.consume('loghttp', async (msg: ConsumeMessage) => {
      const log = JSON.parse(msg.content.toString());

      const id = uuid.v4();

      const logHttp = new LogHttp();
      Object.assign(logHttp, {
        id,
        url: log.url,
        body: log.body,
        headers: log.headers,
        method: log.method,
      });

      await this.logHttpRepository.save(logHttp);

      this.consumerChannel.ack(msg);
    });
  }
}
