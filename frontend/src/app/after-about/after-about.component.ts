import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-after-about',
  templateUrl: './after-about.component.html',
  styleUrls: ['./after-about.component.css']
})
export class AfterAboutComponent implements OnInit {
  name: string = '';
  email: string | null = '';
    constructor(private http: HttpClient, private router: Router) {}
  
    ngOnInit(): void {
      this.email = localStorage.getItem('email');
      console.log(this.email)
      if (this.email) {
        this.http.get<any>(`http://localhost:5000/resident/${this.email}`).subscribe(
          (data) => {
            this.name = data.name;
          },
          (error) => {
            console.error('Failed to fetch resident details:', error);
          }
        );
      }
    }
  logout(): void {
    localStorage.removeItem('token'); // Remove token from storage
    window.location.href = '/resident-login'; // Redirect to login
  }

}
