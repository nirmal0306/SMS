import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-visitor',
  templateUrl: './edit-visitor.component.html',
  styleUrls: ['./edit-visitor.component.css']
})
export class EditVisitorComponent implements OnInit {

  @Input() visitor: any;
  @Output() updateSuccess = new EventEmitter<void>();
  @Output() cancelEdit = new EventEmitter<void>();

  apiUrl = 'http://localhost:5000/visitors';
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('EditVisitorComponent initialized.');
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  updateVisitor() {
    const formData = new FormData();
    formData.append('name', this.visitor.name);
    formData.append('email', this.visitor.email);
    formData.append('phone', this.visitor.phone);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.http.put(`${this.apiUrl}/update/${this.visitor._id}`, formData).subscribe(
      () => this.updateSuccess.emit(),
      error => console.error('Error updating visitor:', error)
    );
  }

  cancel() {
    this.cancelEdit.emit();
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove token from storage
    window.location.href = '/admin-login'; // Redirect to login
  }
}
