import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EventModel {
  _id?: string;
  title: string;
  description?: string;
  eventDate: Date;
  eventTime?: string;
  location?: string;
  organizedBy?: string;
  contactInfo?: string;
  eventType?: string;
  registrationRequired?: boolean;
  maxParticipants?: number;
  posterImage?: string;
  status?: 'Upcoming' | 'Ongoing' | 'Completed';
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'http://localhost:5000/events';

  constructor(private http: HttpClient) {}

  createEvent(eventData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, eventData, {
      headers: { 'enctype': 'multipart/form-data' }
    });
  }
  addEvent(eventData: FormData): Observable<any> {
    return this.http.post('http://localhost:5000/events', eventData);
  }
  

  getAllEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(`${this.baseUrl}`);
  }

  getEventById(id: string): Observable<EventModel> {
    return this.http.get<EventModel>(`${this.baseUrl}/${id}`);
  }

  updateEvent(id: string, eventData: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, eventData, {
      headers: { 'enctype': 'multipart/form-data' }
    });
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}