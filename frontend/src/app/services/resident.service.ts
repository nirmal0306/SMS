import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResidentService {
  private apiUrl = 'http://localhost:5000/residents';

  constructor(private http: HttpClient) {}
  

  getResidents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/list`);
  }

  addResident(resident: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, resident);
  }

  updateResident(id: string, resident: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, resident);
  }

  deleteResident(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
