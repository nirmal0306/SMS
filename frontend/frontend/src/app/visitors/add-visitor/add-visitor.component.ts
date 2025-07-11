import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-visitor',
  templateUrl: './add-visitor.component.html',
  styleUrls: ['./add-visitor.component.css']
})
export class AddVisitorComponent {
  @ViewChild('video') video!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;

  apiUrl = 'http://localhost:5000/visitors';
  newVisitor = { name: '', email: '', phone: '', image: '' };
  selectedFile: File | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
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
    localStorage.removeItem('token');
    window.location.href = '/admin-login';
  }
}
