import { Module } from '@nestjs/common';
import { NotificacaoService } from './notificacao.service';
import { NotificacaoController } from './notificacao.controller';
import { RabbitmqModule } from 'src/common/rabbitmq.module';

@Module({
  imports: [RabbitmqModule],
  controllers: [NotificacaoController],
  providers: [NotificacaoService],
})
export class NotificacaoModule {}
