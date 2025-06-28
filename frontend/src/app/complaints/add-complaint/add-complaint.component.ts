import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.css']
})
export class AddComplaintComponent {
   name: string = '';
    email: string | null = '';
    apartment: string | null = '';
    form = { residentName: '', apartmentNumber: '', complaint: '' };
    responseMsg = '';
  
    constructor(private http: HttpClient, private router: Router,private api: ApiService) {}
    
  
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
            this.form.residentName = data.name;
            this.form.apartmentNumber = data.apartment;
          },
          (error) => {
            console.error('Failed to fetch resident details:', error);
            alert('Failed to fetch resident details');
            this.router.navigate(['/resident-login']);
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
  
  

  

  onSubmit() {
    if (this.form.complaint == '') {
      alert('Please enter your Complaint.');
      return;
    }
    this.api.submitComplaint(this.form).subscribe({
      next: () => {
        this.responseMsg = 'Complaint submitted!';
        this.form = { residentName: this.form.residentName, apartmentNumber: this.form.apartmentNumber, complaint: '' };
        alert("Complaint Submitted")
      },
      error: () => {
        this.responseMsg = 'Submission failed.';
      },
    });
  }
  logout(): void {
    localStorage.removeItem('token'); // Remove token from storage
    window.location.href = '/resident-login'; // Redirect to login
  }
}
