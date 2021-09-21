import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { LogHttpModule } from './loghttp/loghttp.module';
import { RabbitModule } from './shared/provider/rabbitMq.module';
//import { RabbitModule } from './shared/provider/rabbitMq.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    LogHttpModule,
    RabbitModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
