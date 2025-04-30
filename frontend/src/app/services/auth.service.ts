// import { Injectable } from '@angular/core';
// import axios from 'axios';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:5000/api/auth';

//   async register(user: any) {
//     return await axios.post(`${this.apiUrl}/register`, user);
//   }

//   async login(credentials: any) {
//     return await axios.post(`${this.apiUrl}/login`, credentials);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth'; // ✅ Adjust based on your backend

  constructor(private http: HttpClient) {}

  // ✅ Register User
  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  // ✅ Login User
  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }

  // ✅ Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('name');
  }

  // ✅ Logout User
  logout(): void {
    localStorage.removeItem('username');
  }

  // getUser(): Observable<any> {
  //   return this.http.get('http://localhost:5000/getUser', {
  //     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  //   });
  // }
  // getUser() {
  //   return this.http.get('http://localhost:5000/getUser', {
  //     headers: new HttpHeaders({
  //       Authorization: `Bearer ${localStorage.getItem('token')}` // Ensure you send the token
  //     })
  //   });
  // }
  // getUser() {
  //   const token = localStorage.getItem('token'); // Get token from local storage
  //   return this.http.get('http://localhost:5000/getUser', {
  //     headers: new HttpHeaders({
  //       Authorization: `Bearer ${token}` // Send token in Authorization header
  //     })
  //   });
  // }
  // getUser() {
  //   const token = localStorage.getItem('token'); // Fetch token from local storage
  //   if (!token) {
  //     console.error('Token is missing');
  //     return throwError(() => new Error('No token found'));
  //   }
  
  //   return this.http.get('http://localhost:5000/getUser', {
  //     headers: new HttpHeaders({
  //       Authorization: `Bearer ${token}` // Send token in Authorization header
  //     })
  //   });
  // }
  getUser(): Observable<any> {
    return this.http.get('http://localhost:5000/getUser', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }
}
