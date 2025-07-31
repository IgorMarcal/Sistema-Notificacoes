// import { platformBrowser } from '@angular/platform-browser';
// import { AppModule } from './app.module';

// platformBrowser().bootstrapModule(AppModule, {
//   ngZoneEventCoalescing: true,
// })
//   .catch(err => console.error(err));

// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { NotificationComponent } from './app/components/notification/notification.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: 'notifications', component: NotificationComponent },
      { path: '', redirectTo: '/notifications', pathMatch: 'full' },
    ]),
    provideHttpClient(),
  ]
})
.catch(err => console.error(err));