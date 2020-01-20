import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Event } from './models/event';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {

  constructor(private http: HttpClient) { }

  getAllEvents() {
      return this.http.get<Event[]>(environment.apiMonitoring + '/events');
  }
}
