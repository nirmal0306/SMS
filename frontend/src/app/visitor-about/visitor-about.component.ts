import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-visitor-about',
  templateUrl: './visitor-about.component.html',
  styleUrls: ['./visitor-about.component.css']
})
export class VisitorAboutComponent implements OnInit {
  name: string = '';
  email: string | null = '';


    constructor(private http: HttpClient, private router: Router,private api: ApiService) {}
    ngOnInit(): void {
      this.email = localStorage.getItem('email');
      console.log(this.email)
      this.getUserData1();
      if (this.email) {
        this.http.get<any>(`http://localhost:5000/visitor/${this.email}`).subscribe(
          (data) => {
            this.name = data.name;
            this.email = data.email;
          },
          (error) => {
            console.error('Failed to fetch visitor details:', error);
          }
        );
      }
    }
  
    getUserData1() {
      const token = sessionStorage.getItem("token"); 
      const storedEmail = sessionStorage.getItem("email"); // Get stored email
      
      if (!token || !storedEmail) {
        return;
      }
  
      this.http.get<{ email: string, username: string }>("http://localhost:5000/getUser1", {
        headers: { 
          Authorization: `Bearer ${token}`,
          'X-User-Email': storedEmail // Send email in header
        }
      }).subscribe((response) => {
        console.log("Fetched user:", response);
  
        if (response && response.email === storedEmail) {
          sessionStorage.setItem("username", response.username); // Store username
        } else {
          console.error("Email does not match database");
        }
      }, (error) => {
        console.error("Error fetching user:", error);
      });
  }
  
  logout(): void {
    localStorage.removeItem('token'); // Remove token from storage
    window.location.href = '/visitor-login'; // Redirect to login
  }
  

}
