import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  sendNotification(payload: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }

  getNotificationStatus(id: string): Observable<{ status: string }> {
    return this.http.get<{ status: string }>(`${this.apiUrl}/status/${id}`);
  }

  getAllStatuses(): Observable<{ uuid: string; status: string }[]> {
    return this.http.get<{ uuid: string; status: string }[]>(`${this.apiUrl}/status`);
  }
}