import { Component, OnInit } from '@angular/core';
import { EventService, EventModel } from 'src/app/services/event.service';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resident-events',
  templateUrl: './resident-events.component.html',
  styleUrls: ['./resident-events.component.css']
})

 export class ResidentEventsComponent {
  events: EventModel[] = [];

  name: string = '';
    email: string | null = '';
    form = { name: '', email: '', message: '' };
    responseMsg = '';
  
    constructor(private http: HttpClient, private router: Router,private api: ApiService,private eventService: EventService) {}
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
      this.eventService.getAllEvents().subscribe({
        next: (data) => {
          this.events = data;
        },
        error: (err) => {
          console.error('Error fetching events:', err);
        }
      });
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
    localStorage.removeItem('token');
    window.location.href = '/admin-login';
  }
}