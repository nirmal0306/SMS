import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visitor-login',
  templateUrl: './visitor-login.component.html',
  styleUrls: ['./visitor-login.component.css']
})
export class VisitorLoginComponent {
  userData = { name: '', email: '' };

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.http.post<any>('http://localhost:5000/visitorLogin', this.userData).subscribe(
      (response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('name', this.userData.name);
          localStorage.setItem('email', this.userData.email);

          // ✅ Redirect to visitor home page if login is successful
          this.router.navigate(['/visitor-home']);
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
