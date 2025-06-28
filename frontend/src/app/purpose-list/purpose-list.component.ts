import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-purpose-list',
  templateUrl: './purpose-list.component.html',
  styleUrls: ['./purpose-list.component.css']
})
export class PurposeListComponent implements OnInit {

  purposeList: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getPurposeList();
  }

  getPurposeList(): void {
    this.http.get<any[]>('http://localhost:5000/visitor-purpose').subscribe({
      next: (data) => {
        this.purposeList = data;
      },
      error: (err) => {
        console.error('Error fetching purpose list:', err);
      }
    });
  }
  logout(): void {
    localStorage.removeItem('token');
    window.location.href = '/admin-login';
  }
}

