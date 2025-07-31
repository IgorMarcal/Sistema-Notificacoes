import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateNotificacaoDto {
    @IsUUID()
    @IsNotEmpty()
    mensagemId: string;

    @IsString()
    @IsNotEmpty()
    conteudoMensagem: string
}
