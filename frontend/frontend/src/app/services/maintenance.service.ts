// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root' // This ensures the service is available app-wide
// })
// export class MaintenanceService {
//   private apiUrl = 'http://localhost:5000/maintenance';

//   constructor(private http: HttpClient) {}

//   submitPayment(payment: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/pay`, payment);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// export class MaintenanceService {
//   private apiUrl = 'http://localhost:5000/maintenance';

//   constructor(private http: HttpClient) {}

//   submitPayment(payment: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/pay`, payment);
//   }

//   checkPaymentStatus(userId: string): Observable<any> {
//     return this.http.get(`${this.apiUrl}/status/${userId}`);
//   }
// }
export class MaintenanceService {
  private apiUrl = 'http://localhost:5000/maintenance';

  constructor(private http: HttpClient) {}

  checkPaymentStatus(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/status/${email}`);
  }

  submitPayment(payment: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/pay`, payment);
  }
}