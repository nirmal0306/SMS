import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  submitFeedback(data: any) {
    return this.http.post(`${this.baseUrl}/feedback/submit-feedback`, data);
  }

  submitComplaint(data: any) {
    return this.http.post(`${this.baseUrl}/complaint/submit-complaint`, data);
  }
}
