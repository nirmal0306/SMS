import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Notice {
  _id?: string;
  content: string;
  createdAt?: Date;
}

@Injectable({ providedIn: 'root' })
export class NoticeService {
  private apiUrl = 'http://localhost:5000/notices';

  constructor(private http: HttpClient) {}

  getNotices(): Observable<Notice[]> {
    return this.http.get<Notice[]>(this.apiUrl);
  }

  createNotice(content: string): Observable<Notice> {
    return this.http.post<Notice>(this.apiUrl, { content });
  }

  updateNotice(id: string, content: string): Observable<Notice> {
    return this.http.put<Notice>(`${this.apiUrl}/${id}`, { content });
  }

  deleteNotice(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
