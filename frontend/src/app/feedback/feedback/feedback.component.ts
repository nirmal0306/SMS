import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  name: string = '';
  email: string | null = '';
  form = { name: '', email: '', message: '' };
  responseMsg = '';

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
          this.form.name = data.name;
          this.form.email = data.email;
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

  onSubmit() {
    if (this.form.message == '') {
      alert('Please enter your feedback.');
      return;
    }
    this.api.submitFeedback(this.form).subscribe({
      next: () => {
        this.responseMsg = 'Feedback submitted!';
        this.form = { name: this.form.name, email: this.form.email, message: '' };
        alert("Feedback Submitted")
      },
      error: () => {
        this.responseMsg = 'Submission failed.';
      },
    });
  }
  logout(): void {
    localStorage.removeItem('token'); // Remove token from storage
    window.location.href = '/visitor-login'; // Redirect to login
  }
}

// export class AddComplaintComponent {

//     apartment: string | null = '';
//     form = { residentName: '', apartmentNumber: '', complaint: '' };
//     responseMsg = '';
  
//     
    
  
    
  
  

  

//   onSubmit() {
//     this.api.submitComplaint(this.form).subscribe({
//       next: () => {
//         this.responseMsg = 'Complaint submitted!';
//         this.form = { residentName: this.form.residentName, apartmentNumber: this.form.apartmentNumber, complaint: '' };
//         alert("Complaint Submitted")
//       },
//       error: () => {
//         this.responseMsg = 'Submission failed.';
//       },
//     });
//   }
  
