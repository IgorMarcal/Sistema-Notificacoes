import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { StatusService } from './status.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [RabbitmqService, StatusService],
  exports: [RabbitmqService, StatusService ],
})
export class RabbitmqModule {}
