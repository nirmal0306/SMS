import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-visitor',
  templateUrl: './add-visitor.component.html',
  styleUrls: ['./add-visitor.component.css']
})
export class AddVisitorComponent {
  apiUrl = 'http://localhost:5000/visitors';
  newVisitor = { name: '', email: '', phone: '', image: '' };
  selectedFile: File | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addVisitor() {
    const formData = new FormData();
    formData.append('name', this.newVisitor.name);
    formData.append('email', this.newVisitor.email);
    formData.append('phone', this.newVisitor.phone);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.http.post(`${this.apiUrl}/add`, formData).subscribe(
      () => {
        alert('Visitor added successfully');
        this.newVisitor = { name: '', email: '', phone: '', image: '' };
        this.selectedFile = null;
        this.router.navigate(['/list-visitor']);
      },
      error => console.error('Error adding visitor:', error)
    );
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove token from storage
    window.location.href = '/admin-login'; // Redirect to login
  }
}
