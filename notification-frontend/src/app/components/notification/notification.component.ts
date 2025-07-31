import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { interval, Subscription } from 'rxjs';

interface Notification {
  mensagemId: string;
  conteudoMensagem: string;
  status: string;
}

@Component({
  selector: 'app-notification',
  standalone: true,
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class NotificationComponent {
  notifications: Notification[] = [];
  messageControl = new FormControl('');
  status: any = '';
  private pollingSubscription: Subscription | undefined;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.pollingSubscription = interval(2000).subscribe(() => {
      this.notificationService.getAllStatuses()
        .subscribe({
          next: (allStatuses) => {
            const statusMap = new Map(allStatuses.map(item => [item.uuid, item.status]));

            const updatedNotifications = [...this.notifications];

            allStatuses.forEach(({ uuid, status }) => {
              const index = updatedNotifications.findIndex(n => n.mensagemId === uuid);
              if (index !== -1) {
                updatedNotifications[index] = {
                  ...updatedNotifications[index],
                  status,
                };
              } else {
                updatedNotifications.push({
                  mensagemId: uuid,
                  conteudoMensagem: 'Conteúdo não disponível',
                  status,
                });
              }
            });
            this.notifications = updatedNotifications.slice().reverse();
          },
          error: (err) => {
            console.error('Falha ao atualizar todos os status', err);
          }
        });
    });
  }


  ngOnDestroy() {
    this.pollingSubscription?.unsubscribe();
  }


  sendNotification() {
    const content = this.messageControl.value;
    if (content && content.trim().length > 0) {
      const newNotification: Notification = {
        mensagemId: uuidv4(),
        conteudoMensagem: content,
        status: 'PENDENTE'
      };

      console.log('Enviando notificação:', newNotification);

      this.notificationService.sendNotification(newNotification).subscribe({
        next: (res) => {
          console.log('Notificação enviada:', res);
          this.notifications.push(newNotification);
          this.messageControl.reset();
        },
        error: (err) => {
          console.error('Erro ao enviar notificação', err);
        }
      });
    }
  }

  // fetchStatus(mensagemId: string) {
  //     this.notificationService.getNotificationStatus(mensagemId)
  //     .subscribe({
  //       next: (data) => {
  //         this.status = data;
  //         console.log('Status da notificação:', data);
  //       },
  //       error: (error) => {
  //         console.error('Erro ao buscar status:', error);
  //       }
  //     });
  // }
}
