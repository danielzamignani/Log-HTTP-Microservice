import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogHttpDTO } from './dto/loghttp.dto';
import { LogHttp } from './entities/loghttp.entity';
import * as uuid from 'uuid';

@Injectable()
export class LogHttpService {
  @InjectRepository(LogHttp)
  private readonly logHttpRepository: Repository<LogHttp>;

  async saveLog({ url, method, headers, body }: LogHttpDTO) {
    let logHttp = new LogHttp();

    Object.assign(logHttp, {
      id: uuid.v4(),
      url,
      method,
      headers,
      body,
    });

    logHttp = await this.logHttpRepository.save(logHttp);

    return logHttp;
  }
}
