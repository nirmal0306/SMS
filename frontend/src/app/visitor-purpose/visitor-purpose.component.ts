import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visitor-purpose',
  templateUrl: './visitor-purpose.component.html',
  styleUrls: ['./visitor-purpose.component.css']
})
export class VisitorPurposeComponent implements OnInit {
  name: string = '';
  email: string | null = '';
  form = {
    name: '',
    purpose: '',
    block: '',
    flatNo: ''
  };

  blocks: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  flatNos: number[] = [];

  constructor(private http: HttpClient, private router: Router) {
    for (let floor = 1; floor <= 5; floor++) {
      for (let unit = 1; unit <= 6; unit++) {
        this.flatNos.push(floor * 100 + unit);
      }
    }
  }

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    if (this.email) {
      this.http.get<any>(`http://localhost:5000/visitor/${this.email}`).subscribe(
        (data) => {
          this.name = data.name;
          this.form.name = data.name;
        },
        (error) => {
          console.error('Failed to fetch visitor details:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (!this.form.purpose || !this.form.block || !this.form.flatNo) {
      alert('Please fill all required fields.');
      return;
    }

    this.http.post('http://localhost:5000/visitor-purpose', this.form).subscribe({
      next: () => {
        alert('Purpose submitted successfully');
        this.form.purpose = '';
        this.form.block = '';
        this.form.flatNo = '';
      },
      error: () => {
        alert('Submission failed');
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove token from storage
    window.location.href = '/visitor-login'; // Redirect to login
  }
}
