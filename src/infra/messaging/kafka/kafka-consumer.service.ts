import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['moral-mako-11119-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',

          username:
            'bW9yYWwtbWFrby0xMTExOSSNNV2DhG8DXOYqGH3rkSOag5u0arXmGyQjF304B9Q',

          password: '1d4c9866197e4966886f1b7d790b939c',
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
