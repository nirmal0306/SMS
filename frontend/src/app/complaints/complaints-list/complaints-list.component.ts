import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-complaints-list',
  templateUrl: './complaints-list.component.html',
  styleUrls: ['./complaints-list.component.css']
})
export class ComplaintsListComponent implements OnInit {
  complaints: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchComplaints();
  }

  fetchComplaints(): void {
    this.http.get<any[]>('http://localhost:5000/complaint').subscribe(
      (data) => {
        this.complaints = data;
      },
      (error) => {
        console.error('Error fetching complaints:', error);
      }
    );
  }
  markResolved(id: string): void {
    this.http.put(`http://localhost:5000/complaint/${id}/resolve`, {}).subscribe(
      () => {
        alert('Complaint marked as resolved!');
        
        // Update the local array immediately
        const complaint = this.complaints.find(c => c._id === id);
        if (complaint) {
          complaint.status = 'Resolved';
        }
      },
      (error) => {
        console.error('Error resolving complaint:', error);
      }
    );
  }
  
  // markResolved(id: string): void {
  //   this.http.put(`http://localhost:5000/complaint/${id}/resolve`, {}).subscribe(
  //     () => {
  //       alert('Complaint marked as resolved!');
  //       this.fetchComplaints();
  //     },
  //     (error) => {
  //       console.error('Error resolving complaint:', error);
  //     }
  //   );
  // }

  deleteComplaint(id: string): void {
    if (confirm('Are you sure you want to delete this complaint?')) {
      this.http.delete(`http://localhost:5000/complaint/${id}`).subscribe(
        () => {
          alert('Complaint deleted!');
          this.fetchComplaints();
        },
        (error) => {
          console.error('Error deleting complaint:', error);
        }
      );
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    window.location.href = '/admin-login';
  }
}
