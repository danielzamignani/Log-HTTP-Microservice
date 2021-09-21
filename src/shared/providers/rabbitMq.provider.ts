import { connect, Connection, Channel } from 'amqplib';
import {
  rabbitMqHost,
  rabbitMqPassword,
  rabbitMqPort,
  rabbitMqQueue,
  rabbitMqUsername,
} from '../configs/rabbitMq.config';

async function createConnection() {
  try {
    const connection = await connect({
      hostname: rabbitMqHost,
      locale: 'pt-br',
      port: rabbitMqPort,
      username: rabbitMqUsername,
      password: rabbitMqPassword,
    });
    return connection;
  } catch (err) {
    console.log(err);
    process.exit(-1);
  }
}

async function createConsumerChannel(connection: Connection) {
  let consumerChannel: Channel;

  try {
    consumerChannel = await connection.createChannel();
  } catch (err) {
    console.log(err);
    process.exit(-1);
  }

  try {
    await consumerChannel.assertQueue(rabbitMqQueue, {
      durable: true,
      autoDelete: false,
    });
  } catch (err) {
    console.log(err);
    process.exit(-1);
  }
  consumerChannel.prefetch(1);

  return consumerChannel;
}

export const RabbitProvider = [
  {
    provide: 'RABBIT_CONNECTION',
    useFactory: async () => {
      return await createConnection();
    },
  },
  {
    provide: 'RABBIT_CONSUMER_CHANNEL',
    useFactory: async (connection: Connection) => {
      return await createConsumerChannel(connection);
    },
    inject: ['RABBIT_CONNECTION'],
  },
];
