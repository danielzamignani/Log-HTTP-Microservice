import { connect, Connection, Channel } from 'amqplib';

async function createConnection() {
  try {
    const connection = await connect({
      hostname: 'localhost',
      locale: 'pt-br',
      port: 5672,
      username: 'admin',
      password: 'admin',
    });
    return connection;
  } catch (err) {
    console.log(err);
  }
}

async function createConsumerChannel(connection: Connection) {
  let consumerChannel: Channel;

  try {
    consumerChannel = await connection.createChannel();
  } catch (err) {
    console.log(err);
  }

  try {
    await consumerChannel.assertQueue('loghttp', {
      durable: true,
      autoDelete: false,
    });
  } catch (err) {
    console.log(err);
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
