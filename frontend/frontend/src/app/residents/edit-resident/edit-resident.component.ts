// import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// @Component({
//   selector: 'app-edit-resident',
//   templateUrl: './edit-resident.component.html',
//   styleUrls: ['./edit-resident.component.css']
// })
// export class EditResidentComponent implements OnInit {

//   @Input() resident: any;
//   @Output() updateSuccess = new EventEmitter<void>();
//   @Output() cancelEdit = new EventEmitter<void>();

//   apiUrl = 'http://localhost:5000/residents';
//   selectedFile: File | null = null;
//   blocks: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
// flatNos: number[] = [];

// constructor(private http: HttpClient, private router: Router) {
//     for (let floor = 1; floor <= 5; floor++) {
//       for (let unit = 1; unit <= 6; unit++) {
//         this.flatNos.push(floor * 100 + unit);
//       }
//     }
//   }
  
  
  
//   // ngOnInit(): void {
//   //   console.log('EditResidentComponent initialized.');
//   // }
//   ngOnInit(): void {
//     console.log('EditResidentComponent initialized.');
  
//     // Split apartment back into block and flatNo
//     if (this.resident.apartment) {
//       const [block, flatNo] = this.resident.apartment.split('-');
//       this.resident.block = block;
//       this.resident.flatNo = Number(flatNo);
//     }
//   }
  

//   onFileSelected(event: any) {
//     this.selectedFile = event.target.files[0];
//   }

//   updateResident() {
//     this.resident.apartment = `${this.resident.block}-${this.resident.flatNo}`;
    
//     const formData = new FormData();
//     formData.append('name', this.resident.name);
//     formData.append('email', this.resident.email);
//     formData.append('phone', this.resident.phone);
//     formData.append('block', this.resident.block);
//     formData.append('flatNo', this.resident.flatNo);
//     formData.append('apartment', this.resident.apartment);
//     formData.append('password', this.resident.password); // add this line
  
//     if (this.selectedFile) {
//       formData.append('image', this.selectedFile);
//     }
  
//     this.http.put(`${this.apiUrl}/update/${this.resident._id}`, formData).subscribe(
//       () => this.updateSuccess.emit(),
//       error => console.error('Error updating resident:', error)
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-resident',
  templateUrl: './edit-resident.component.html',
  styleUrls: ['./edit-resident.component.css']
})
export class EditResidentComponent implements OnInit {

  @Input() resident: any;
  @Output() updateSuccess = new EventEmitter<void>();
  @Output() cancelEdit = new EventEmitter<void>();

  @ViewChild('video') video!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;

  selectedFile: File | null = null;
  capturedBlob!: Blob;
  apiUrl = 'http://localhost:5000/residents';

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
    console.log('EditResidentComponent initialized.');
    if (this.resident.apartment) {
      const [block, flatNo] = this.resident.apartment.split('-');
      this.resident.block = block;
      this.resident.flatNo = Number(flatNo);
    }

    // Start camera stream
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      this.video.nativeElement.srcObject = stream;
    }).catch(err => {
      console.error('Camera access denied:', err);
    });
  }

  // capture() {
  //   const context = this.canvas.nativeElement.getContext('2d');
  //   context.drawImage(this.video.nativeElement, 0, 0, 320, 240);
  //   this.canvas.nativeElement.toBlob((blob: Blob) => {
  //     this.capturedBlob = blob;
  //     this.selectedFile = new File([blob], 'snapshot.jpg', { type: 'image/jpeg' });
  //   }, 'image/jpeg');
  // }
  capture() {
    const canvasEl = this.canvas.nativeElement;
    const context = canvasEl.getContext('2d');
  
    // Flip canvas horizontally before drawing
    context.save(); // Save current context state
    context.translate(canvasEl.width, 0); // Move to far right
    context.scale(-1, 1); // Flip horizontally
  
    context.drawImage(this.video.nativeElement, 0, 0, canvasEl.width, canvasEl.height);
  
    context.restore(); // Restore context to normal (for future use)
  
    // Convert to blob
    canvasEl.toBlob((blob: Blob) => {
      this.capturedBlob = blob;
      this.selectedFile = new File([blob], 'snapshot.jpg', { type: 'image/jpeg' });
    }, 'image/jpeg');
  }
  
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      this.selectedFile = file;
    } else {
      alert('Please select a JPG or JPEG image');
    }
  }

  updateResident() {
    this.resident.apartment = `${this.resident.block}-${this.resident.flatNo}`;

    const formData = new FormData();
    formData.append('name', this.resident.name);
    formData.append('email', this.resident.email);
    formData.append('phone', this.resident.phone);
    formData.append('block', this.resident.block);
    formData.append('flatNo', this.resident.flatNo.toString());
    formData.append('apartment', this.resident.apartment);
    formData.append('password', this.resident.password);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.http.put(`${this.apiUrl}/update/${this.resident._id}`, formData).subscribe(
      () => this.updateSuccess.emit(),
      error => console.error('Error updating resident:', error)
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
