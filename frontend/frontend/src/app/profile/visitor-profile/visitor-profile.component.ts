import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-visitor-profile',
  templateUrl: './visitor-profile.component.html',
  styleUrls: ['./visitor-profile.component.css']
})
export class VisitorProfileComponent implements OnInit {

  name: string = '';
  email: string | null = '';
  phone: string = '';
  image: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    console.log(this.email);
    this.getVisitorData();
    if (this.email) {
      this.http.get<any>(`http://localhost:5000/visitor/${this.email}`).subscribe(
        (data) => {
          this.name = data.name;
          this.email = data.email;
          this.phone = data.phone;
          this.image = data.image;
        },
        (error) => {
          console.error('Failed to fetch visitor details:', error);
        }
      );
    }
  }

  getVisitorData() {
    const token = sessionStorage.getItem("token"); 
    const storedEmail = sessionStorage.getItem("email");
    
    if (!token || !storedEmail) {
      return;
    }

    this.http.get<{ email: string, username: string }>("http://localhost:5000/getUser1", {
      headers: { 
        Authorization: `Bearer ${token}`,
        'X-User-Email': storedEmail
      }
    }).subscribe((response) => {
      console.log("Fetched visitor:", response);

      if (response && response.email === storedEmail) {
        sessionStorage.setItem("username", response.username);
      } else {
        console.error("Email does not match database");
      }
    }, (error) => {
      console.error("Error fetching visitor:", error);
    });
  }

  logout(): void {
    localStorage.removeItem('token'); 
    window.location.href = '/visitor-login';
  }
}