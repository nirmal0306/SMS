import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resident-login',
  templateUrl: './resident-login.component.html',
  styleUrls: ['./resident-login.component.css']
})
export class ResidentLoginComponent {
  userData = { email: '', password: '' };

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.http.post<any>('http://localhost:5000/reslog', this.userData).subscribe(
      (response) => {
        if (response.token) {
          localStorage.setItem('token', response.token); // Store token
          localStorage.setItem('email', this.userData.email); // Store Email
          localStorage.setItem('password', this.userData.password); // Store Password

          this.router.navigate(['/after-login']);
        } else {
          console.error('Token not received');
        }
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
  
}
