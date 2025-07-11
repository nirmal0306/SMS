// import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-add-resident',
//   templateUrl: './add-resident.component.html',
//   styleUrls: ['./add-resident.component.css']
// })
// export class AddResidentComponent {
//   @ViewChild('video') video!: ElementRef;
//   @ViewChild('canvas') canvas!: ElementRef;

//   capturedBlob!: Blob;
//   apiUrl = 'http://localhost:5000/residents';
//   blocks: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
//   flatNos: number[] = [];
  

//   newResident = { name: '', email: '', phone: '',block: '',flatNo: '', apartment: '', password: '',image: '' };
//   selectedFile1: File | null = null;

  
//   constructor(private http: HttpClient, private router: Router) {
//     for (let floor = 1; floor <= 5; floor++) {
//       for (let unit = 1; unit <= 6; unit++) {
//         this.flatNos.push(floor * 100 + unit);
//       }
//     }
//   }
//   ngOnInit() {
//     navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
//       this.video.nativeElement.srcObject = stream;
//     });
//   }
  

//   onFileSelected1(event: any) {
//     this.selectedFile1 = event.target.files[0];
//   }
//   selectedFile: File | null = null;

//   onFileSelected(event: any) {
//   const file = event.target.files[0];
//   if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
//     this.selectedFile = file;
//   } else {
//     alert('Please capture a JPG or JPEG image');
//   }
// }


//   addResident() {
//     this.newResident.apartment = `${this.newResident.block}-${this.newResident.flatNo}`;
//     const formData = new FormData();
//     formData.append('name', this.newResident.name);
//     formData.append('email', this.newResident.email);
//     formData.append('phone', this.newResident.phone);
//     formData.append('apartment', this.newResident.apartment);
//     formData.append('password', this.newResident.password);

//     // if (this.selectedFile) {
//     //   formData.append('image', this.selectedFile);
//     // }
//     if (this.selectedFile) {
//       formData.append('image', this.selectedFile as Blob);
//     }

//     this.http.post(`${this.apiUrl}/add`, formData).subscribe(
//       () => {
//         alert('Resident added successfully');
//         this.newResident = {
//           name: '',
//           email: '',
//           phone: '',
//           block: '',
//           flatNo: '',
//           apartment: '',
//           password: '',
//           image: ''
//         };
        
//         // this.newResident = { name: '', email: '', phone: '', apartment: '', image: '' };
//         this.selectedFile = null;
//         this.router.navigate(['/list-residents'])
//       },
//       error => console.error('Error adding resident:', error)
//     );
//   }

//   logout(): void {
//     localStorage.removeItem('token'); // Remove token from storage
//     window.location.href = '/admin-login'; // Redirect to login
//   }
// }
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-resident',
  templateUrl: './add-resident.component.html',
  styleUrls: ['./add-resident.component.css']
})
export class AddResidentComponent implements OnInit {
  @ViewChild('video') video!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;

  capturedBlob!: Blob;
  apiUrl = 'http://localhost:5000/residents';
  blocks: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  flatNos: number[] = [];

  newResident = {
    name: '',
    email: '',
    phone: '',
    block: '',
    flatNo: '',
    apartment: '',
    password: '',
    image: ''
  };

  selectedFile: File | null = null;

  constructor(private http: HttpClient, private router: Router) {
    for (let floor = 1; floor <= 5; floor++) {
      for (let unit = 1; unit <= 6; unit++) {
        this.flatNos.push(floor * 100 + unit);
      }
    }
  }

  ngOnInit() {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      this.video.nativeElement.srcObject = stream;
    }).catch(err => {
      console.error('Camera access denied:', err);
    });
  }

  // 📸 Capture image from video stream
  capture() {
    const context = this.canvas.nativeElement.getContext('2d');
    context.drawImage(this.video.nativeElement, 0, 0, 320, 240);
    this.canvas.nativeElement.toBlob((blob: Blob) => {
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

  addResident() {
    this.newResident.apartment = `${this.newResident.block}-${this.newResident.flatNo}`;
    const formData = new FormData();
    formData.append('name', this.newResident.name);
    formData.append('email', this.newResident.email);
    formData.append('phone', this.newResident.phone);
    formData.append('apartment', this.newResident.apartment);
    formData.append('password', this.newResident.password);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.http.post(`${this.apiUrl}/add`, formData).subscribe(
      () => {
        alert('Resident added successfully');
        this.newResident = {
          name: '',
          email: '',
          phone: '',
          block: '',
          flatNo: '',
          apartment: '',
          password: '',
          image: ''
        };
        this.selectedFile = null;
        this.router.navigate(['/list-residents']);
      },
      error => console.error('Error adding resident:', error)
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    window.location.href = '/admin-login';
  }
}
