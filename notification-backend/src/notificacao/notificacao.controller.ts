import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { NotificacaoService } from './notificacao.service';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { UpdateNotificacaoDto } from './dto/update-notificacao.dto';
import { StatusService } from 'src/common/status.service';

@Controller('api/notificacao')
export class NotificacaoController {
  constructor(private readonly notificacaoService: NotificacaoService,
    private statusService: StatusService
  ) { }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  create(@Body() createNotificacaoDto: CreateNotificacaoDto) {
    return this.notificacaoService.create(createNotificacaoDto);
  }

  @Get('status')
  findAll() {
    return this.statusService.getAllStatuses();
  }
  @Get('status/:mensagemId')
  getStatus(@Param('mensagemId') mensagemId: string) {
    return this.statusService.getStatus(mensagemId);
  }

  // @Get(':id')
  // get(@Param('id') mensagemId: string) {
  //   return this.statusService.getStatus(mensagemId);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificacaoDto: UpdateNotificacaoDto) {
    return this.notificacaoService.update(+id, updateNotificacaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificacaoService.remove(+id);
  }
}
