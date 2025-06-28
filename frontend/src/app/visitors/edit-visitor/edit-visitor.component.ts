// import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-edit-visitor',
//   templateUrl: './edit-visitor.component.html',
//   styleUrls: ['./edit-visitor.component.css']
// })
// export class EditVisitorComponent implements OnInit {

//   @Input() visitor: any;
//   @Output() updateSuccess = new EventEmitter<void>();
//   @Output() cancelEdit = new EventEmitter<void>();

//   apiUrl = 'http://localhost:5000/visitors';
//   selectedFile: File | null = null;

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     console.log('EditVisitorComponent initialized.');
//   }

//   onFileSelected(event: any) {
//     this.selectedFile = event.target.files[0];
//   }

//   updateVisitor() {
//     const formData = new FormData();
//     formData.append('name', this.visitor.name);
//     formData.append('email', this.visitor.email);
//     formData.append('phone', this.visitor.phone);

//     if (this.selectedFile) {
//       formData.append('image', this.selectedFile);
//     }

//     this.http.put(`${this.apiUrl}/update/${this.visitor._id}`, formData).subscribe(
//       () => this.updateSuccess.emit(),
//       error => console.error('Error updating visitor:', error)
//     );
//   }

//   cancel() {
//     this.cancelEdit.emit();
//   }

//   logout(): void {
//     localStorage.removeItem('token'); // Remove token from storage
//     window.location.href = '/admin-login'; // Redirect to login
//   }
// }
import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('video') video!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;

  apiUrl = 'http://localhost:5000/visitors';
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      this.video.nativeElement.srcObject = stream;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  capture() {
    const canvasEl = this.canvas.nativeElement;
    const context = canvasEl.getContext('2d');

    // Flip the canvas horizontally
    context.save();
    context.translate(canvasEl.width, 0);
    context.scale(-1, 1); // Flip horizontally
    context.drawImage(this.video.nativeElement, 0, 0, canvasEl.width, canvasEl.height);
    context.restore();

    // Convert canvas to blob and prepare it as a file
    canvasEl.toBlob((blob: Blob) => {
      this.selectedFile = new File([blob], 'selfie.jpg', { type: 'image/jpeg' });
    }, 'image/jpeg');
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
    localStorage.removeItem('token');
    window.location.href = '/admin-login';
  }
}
