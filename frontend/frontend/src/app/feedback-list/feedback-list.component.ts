import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  feedbacks: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchFeedbacks();
  }

  fetchFeedbacks(): void {
    this.http.get<any[]>('http://localhost:5000/feedback').subscribe(
      (data) => {
        this.feedbacks = data;
      },
      (error) => {
        console.error('Error fetching feedbacks:', error);
      }
    );
  }

  deleteFeedback(id: string): void {
    if (confirm('Are you sure you want to delete this feedback?')) {
      this.http.delete(`http://localhost:5000/feedback/${id}`).subscribe(
        () => {
          alert('Feedback deleted successfully!');
          this.fetchFeedbacks();
        },
        (error) => {
          console.error('Error deleting feedback:', error);
        }
      );
    }
  }
  logout(): void {
    localStorage.removeItem('token');
    window.location.href = '/admin-login';
  }
}
