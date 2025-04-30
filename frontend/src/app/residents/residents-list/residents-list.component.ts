import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-residents-list',
  templateUrl: './residents-list.component.html',
  styleUrls: ['./residents-list.component.css']
})
export class ResidentsListComponent implements OnInit {

  apiUrl = 'http://localhost:5000/residents';
  residents: any[] = [];
  selectedResident: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchResidents();
  }

  fetchResidents() {
    this.http.get<any[]>(`${this.apiUrl}/list`).subscribe(
      data => this.residents = data,
      error => console.error('Error fetching residents:', error)
    );
  }

  editResident(resident: any) {
    this.selectedResident = { ...resident }; // Clone to avoid direct binding issues
  }

  deleteResident(id: string) {
    this.http.delete(`${this.apiUrl}/delete/${id}`).subscribe(
      () => this.fetchResidents(),
      error => console.error('Error deleting resident:', error)
    );
  }

  onUpdateSuccess() {
    this.selectedResident = null;
    this.fetchResidents(); // Refresh list after edit
  }

  cancelEdit() {
    this.selectedResident = null;
  }
   logout(): void {
    localStorage.removeItem('token'); // Remove token from storage
    window.location.href = '/admin-login'; // Redirect to login
  }
}