import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { NotificationModule } from './app/components/notification/notification.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // configure as rotas do seu app aqui
  // Exemplo:
  // { path: 'notification', loadChildren: () => import('./app/components/notification/notification.module').then(m => m.NotificationModule) }
];

@NgModule({
  declarations: [
    // AppComponent,
    // outros componentes que não são standalone e não estão em módulos próprios  
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,    
    NotificationModule,
    RouterModule.forRoot(routes),
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  // bootstrap: [AppComponent],  // indica o componente raiz para iniciar a aplicação
})
export class AppModule { }
