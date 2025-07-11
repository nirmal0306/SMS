import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-visitors-list',
  templateUrl: './visitors-list.component.html',
  styleUrls: ['./visitors-list.component.css']
})
export class VisitorsListComponent implements OnInit {

  apiUrl = 'http://localhost:5000/visitors';
  visitors: any[] = [];
  selectedVisitor: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchVisitors();
  }

  fetchVisitors() {
    this.http.get<any[]>(`${this.apiUrl}/list`).subscribe(
      data => this.visitors = data,
      error => console.error('Error fetching visitors:', error)
    );
  }

  editVisitor(visitor: any) {
    this.selectedVisitor = { ...visitor }; // Clone to avoid direct binding issues
  }

  deleteVisitor(id: string) {
    this.http.delete(`${this.apiUrl}/delete/${id}`).subscribe(
      () => this.fetchVisitors(),
      error => console.error('Error deleting visitor:', error)
    );
  }

  onUpdateSuccess() {
    this.selectedVisitor = null;
    this.fetchVisitors(); // Refresh list after edit
  }

  cancelEdit() {
    this.selectedVisitor = null;
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove token from storage
    window.location.href = '/admin-login'; // Redirect to login
  }
}
