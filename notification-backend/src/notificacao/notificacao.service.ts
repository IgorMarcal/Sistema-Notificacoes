import { Injectable } from '@nestjs/common';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { UpdateNotificacaoDto } from './dto/update-notificacao.dto';
import { RabbitmqService } from 'src/common/rabbitmq.service';

@Injectable()
export class NotificacaoService {
  constructor(private readonly rabbitMQService: RabbitmqService) { }

  async create(createNotificacaoDto: CreateNotificacaoDto) {
    const queueName = 'fila.notificacao.entrada.igor-marcal';
    await this.rabbitMQService.publishToQueue(queueName, createNotificacaoDto);
    return { mensagemId: createNotificacaoDto.mensagemId };
  }

  findAll() {
    return `This action returns all notificacao`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notificacao`;
  }

  update(id: number, updateNotificacaoDto: UpdateNotificacaoDto) {
    return `This action updates a #${id} notificacao`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificacao`;
  }
}
