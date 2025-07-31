import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificacaoModule } from './notificacao/notificacao.module';
import { RabbitmqModule } from './common/rabbitmq.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [NotificacaoModule, RabbitmqModule, 
    ConfigModule.forRoot({
      isGlobal: true,
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
