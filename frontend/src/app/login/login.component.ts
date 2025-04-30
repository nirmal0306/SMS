import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userData = { email: '', password: '' };

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.http.post<any>('http://localhost:5000/login', this.userData).subscribe(
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
