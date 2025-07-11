import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  submitRequest(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/parking/request`, request);
  }

  getAllRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/parking/requests`);
  }

  approveRequest(id: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/parking/approve/${id}`, {});
  }

  rejectRequest(id: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/parking/reject/${id}`, {});
  }
    // Fetch accepted parking requests
    getAcceptedRequests(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/parking/accepted`);
    }
  
    // Fetch rejected parking requests
    getRejectedRequests(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/parking/rejected`);
    }
}
