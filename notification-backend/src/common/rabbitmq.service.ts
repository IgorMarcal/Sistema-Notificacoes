import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { connect, Channel } from 'amqplib';
import { StatusService } from './status.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RabbitmqService implements OnModuleInit, OnModuleDestroy {
    private connection: any;
    private channel: Channel;
    private readonly rabbitMQUrl: string;

    constructor(private configService: ConfigService, private statusService: StatusService) {
        this.rabbitMQUrl = this.configService.get<string>('RABBITMQ_URL');
        console.log(`RabbitMQ URL: ${this.rabbitMQUrl}`);
    }

    async onModuleInit() {
        try {
            this.connection = await connect(this.rabbitMQUrl);
            this.channel = await this.connection.createChannel();
            if (this.channel) {
                console.log(this.channel)
                await this.setupConsumers();
            }
            console.log('Conectado ao RabbitMQ com sucesso.');
        } catch (error) {
            console.error('Erro ao conectar ao RabbitMQ:', error);
        }
    }

    async publishToQueue(queueName: string, payload: any) {
        if (!this.channel) {
            console.error('Canal do RabbitMQ não está disponível.');
            return;
        }
        console.log(`Publicando na fila: ${payload}`)
        const message = Buffer.from(JSON.stringify(payload));
        const teste = this.channel.sendToQueue(queueName, message, { persistent: true });
        console.log(`Publicando na fila: ${teste}`, teste);

    }

    async onModuleDestroy() {
        if (this.channel) await this.channel.close();
        if (this.connection) await this.connection.close();
    }

    private async setupConsumers() {
        const entradaQueue = 'fila.notificacao.entrada.igor-marcal';
        const statusQueue = 'fila.notificacao.status.igor-marcal';

        await this.channel.assertQueue(entradaQueue, { durable: true });
        await this.channel.assertQueue(statusQueue, { durable: true });

        console.log(`Consumindo da fila: ${entradaQueue}`);
        this.channel.consume(entradaQueue, async (msg) => {
            console.log('Mensagem recebida:', msg);
            if (msg) {
                try {
                    const content = JSON.parse(msg.content.toString());
                    this.statusService.updateStatus(content.mensagemId, "Pendente");
                    this.channel.ack(msg);

                    console.log(`Recebida mensagem para processar: ${content.mensagemId}`);

                    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

                    const isSuccess = Math.random() * 10 > 2;
                    const status = isSuccess ? 'PROCESSADO_SUCESSO' : 'FALHA_PROCESSAMENTO';
                    this.statusService.updateStatus(content.mensagemId, status);

                    const statusPayload = {
                        mensagemId: content.mensagemId,
                        status: status,
                    };

                    const teste = await this.publishToQueue(statusQueue, statusPayload);
                    console.log(`Status '${status}' publicado para ${content.mensagemId}`);

                } catch (error) {
                    console.error('Erro ao processar mensagem:', error);
                    this.channel.nack(msg, false, false);
                }
            }
        }, { noAck: false });
    }
}
