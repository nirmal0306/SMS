import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  name: string = '';
  email: string | null = '';
  apartment: string = '';
  phone: string = '';
  image:string = '';;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    console.log(this.email)
    this.getUserData();
    if (this.email) {
      this.http.get<any>(`http://localhost:5000/resident/${this.email}`).subscribe(
        (data) => {
          this.name = data.name;
          this.email = data.email;
          this.apartment = data.apartment;
          this.phone = data.phone;
          this.image = data.image;
        },
        (error) => {
          console.error('Failed to fetch resident details:', error);
        }
      );
    }
  }
  getUserData() {
    const token = sessionStorage.getItem("token"); 
    const storedEmail = sessionStorage.getItem("email"); // Get stored email
    
    if (!token || !storedEmail) {
      return;
    }

    this.http.get<{ email: string, username: string }>("http://localhost:5000/getUser", {
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
    window.location.href = '/resident-login'; // Redirect to login
  }
}