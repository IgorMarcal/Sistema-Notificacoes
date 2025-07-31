import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificacaoDto } from './create-notificacao.dto';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateNotificacaoDto extends PartialType(CreateNotificacaoDto) {
    @IsUUID()
    @IsNotEmpty()
    mensagemId: string;

    @IsString()
    @IsNotEmpty()
    conteudoMensagem: string
}
