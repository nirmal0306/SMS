// // // import { Component, OnInit } from '@angular/core';
// // // import { HttpClient } from '@angular/common/http';

// // // @Component({
// // //   selector: 'app-edit-resident',
// // //   templateUrl: './edit-resident.component.html',
// // //   styleUrls: ['./edit-resident.component.css']
// // // })
// // // export class EditResidentComponent implements OnInit {


// // import { Component, Input, OnInit } from '@angular/core';
// // import { ActivatedRoute, Router } from '@angular/router';
// // import { HttpClient } from '@angular/common/http';

// // @Component({
// //   selector: 'app-edit-resident',
// //   templateUrl: './edit-resident.component.html',
// //   styleUrls: ['./edit-resident.component.css']
// // })
// // export class EditResidentComponent implements OnInit {
// //   @Input() selectedResident: any = null;  
// //   apiUrl = 'http://localhost:5000/residents';
// //   residentId: string | null = null;
// //   residentData: any = { name: '', email: '', phone: '', apartment: '', image: '' };
// //   selectedFile: File | null = null;

// //   constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

// //   ngOnInit() {
// //     this.route.queryParams.subscribe(params => {
// //       this.residentId = params['id'];
// //       if (this.residentId) {
// //         this.fetchResident();
// //       }
// //     });
// //   }

// //   fetchResident() {
// //     this.http.get(`${this.apiUrl}/${this.residentId}`).subscribe(
// //       (data) => this.residentData = data,
// //       (error) => console.error('Error fetching resident:', error)
// //     );
// //   }

// //   onFileSelected(event: any) {
// //     this.selectedFile = event.target.files[0];
// //   }

// //   updateResident() {
// //     const formData = new FormData();
// //     formData.append('name', this.residentData.name);
// //     formData.append('email', this.residentData.email);
// //     formData.append('phone', this.residentData.phone);
// //     formData.append('apartment', this.residentData.apartment);

// //     if (this.selectedFile) {
// //       formData.append('image', this.selectedFile);
// //     } else {
// //       formData.append('image', this.residentData.image);
// //     }

// //     this.http.put(`${this.apiUrl}/update/${this.residentId}`, formData).subscribe(
// //       () => this.router.navigate(['/residents']),
// //       (error) => console.error('Error updating resident:', error)
// //     );
// //   }

//   // logout(): void {
//   //   localStorage.removeItem('token'); // Remove token from storage
//   //   window.location.href = '/login'; // Redirect to login
//   // }
// //   cancelEdit() {
// //     this.selectedResident = null;  // ✅ Fixes the issue in the template
// //   }
// // }
// import { Component, Input, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-edit-resident',
//   templateUrl: './edit-resident.component.html',
//   styleUrls: ['./edit-resident.component.css']
// })
// export class EditResidentComponent implements OnInit {
//   @Input() selectedResident: any = null;  // ✅ Add this to fix the issue
//   newResident = { name: '', email: '', phone: '', apartment: '', image: '' };
//   selectedFile: File | null = null;
//   apiUrl = 'http://localhost:5000/residents';

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     if (this.selectedResident) {
//       this.newResident = { ...this.selectedResident };
//     }
//   }

//   onFileSelected(event: any) {
//     this.selectedFile = event.target.files[0];
//   }

//   updateResident() {
//     const formData = new FormData();
//     formData.append('name', this.newResident.name);
//     formData.append('email', this.newResident.email);
//     formData.append('phone', this.newResident.phone);
//     formData.append('apartment', this.newResident.apartment);

//     if (this.selectedFile) {
//       formData.append('image', this.selectedFile);
//     } else {
//       formData.append('image', this.newResident.image);
//     }

//     this.http.put(`${this.apiUrl}/update/${this.selectedResident._id}`, formData).subscribe(
//       () => this.cancelEdit(),
//       error => console.error('Error updating resident:', error)
//     );
//   }

//   cancelEdit() {
//     this.selectedResident = null;  // ✅ Fixes the issue in the template
//   }
  
//   logout(): void {
//     localStorage.removeItem('token'); // Remove token from storage
//     window.location.href = '/login'; // Redirect to login
//   }

// }


// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-edit-resident',
//   templateUrl: './edit-resident.component.html',
//   styleUrls: ['./edit-resident.component.css']
// })
// export class EditResidentComponent implements OnInit {
  
//   apiUrl = 'http://localhost:5000/residents';
//   residents: any[] = [];
//   newResident = { name: '', email: '', phone: '', apartment: '', image: '' };
//   selectedResident: any = null;
//   selectedFile: File | null = null;

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.fetchResidents();
//   }

//   fetchResidents() {
//     this.http.get<any[]>(`${this.apiUrl}/list`).subscribe(
//       data => this.residents = data,
//       error => console.error('Error fetching residents:', error)
//     );
//   }

//   onFileSelected(event: any) {
//     this.selectedFile = event.target.files[0];
//   }

//   addResident() {
//     const formData = new FormData();
//     formData.append('name', this.newResident.name);
//     formData.append('email', this.newResident.email);
//     formData.append('phone', this.newResident.phone);
//     formData.append('apartment', this.newResident.apartment);
//     if (this.selectedFile) {
//       formData.append('image', this.selectedFile);
//     }

//     this.http.post(`${this.apiUrl}/add`, formData).subscribe(
//       () => {
//         this.fetchResidents();
//         this.newResident = { name: '', email: '', phone: '', apartment: '', image: '' };
//         this.selectedFile = null;
//       },
//       error => console.error('Error adding resident:', error)
//     );
//   }

//   // 📝 Set form data for editing
//   editResident(resident: any) {
//     this.selectedResident = resident;
//     this.newResident = { ...resident };
//   }

//   // 📝 Update resident details
//   updateResident() {
//     const formData = new FormData();
//     formData.append('name', this.newResident.name);
//     formData.append('email', this.newResident.email);
//     formData.append('phone', this.newResident.phone);
//     formData.append('apartment', this.newResident.apartment);

//     if (this.selectedFile) {
//       formData.append('image', this.selectedFile);
//     } else {
//       formData.append('image', this.newResident.image);
//     }

//     this.http.put(`${this.apiUrl}/update/${this.selectedResident._id}`, formData).subscribe(
//       () => {
//         this.fetchResidents();
//         this.cancelEdit();
//       },
//       error => console.error('Error updating resident:', error)
//     );
//   }

//   // 🛑 Cancel editing
//   cancelEdit() {
//     this.selectedResident = null;
//     this.newResident = { name: '', email: '', phone: '', apartment: '', image: '' };
//     this.selectedFile = null;
//   }

//   // ❌ Delete resident
//   deleteResident(id: string) {
//     this.http.delete(`${this.apiUrl}/delete/${id}`).subscribe(
//       () => this.fetchResidents(),
//       error => console.error('Error deleting resident:', error)
//     );
//   }
//     logout(): void {
//     localStorage.removeItem('token'); // Remove token from storage
//     window.location.href = '/login'; // Redirect to login
//   }
// }


import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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

  apiUrl = 'http://localhost:5000/residents';
  selectedFile: File | null = null;
  blocks: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
flatNos: number[] = [];

constructor(private http: HttpClient, private router: Router) {
    for (let floor = 1; floor <= 5; floor++) {
      for (let unit = 1; unit <= 6; unit++) {
        this.flatNos.push(floor * 100 + unit);
      }
    }
  }
  
  
  
  // ngOnInit(): void {
  //   console.log('EditResidentComponent initialized.');
  // }
  ngOnInit(): void {
    console.log('EditResidentComponent initialized.');
  
    // Split apartment back into block and flatNo
    if (this.resident.apartment) {
      const [block, flatNo] = this.resident.apartment.split('-');
      this.resident.block = block;
      this.resident.flatNo = Number(flatNo);
    }
  }
  

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  updateResident() {
    this.resident.apartment = `${this.resident.block}-${this.resident.flatNo}`;
    
    const formData = new FormData();
    formData.append('name', this.resident.name);
    formData.append('email', this.resident.email);
    formData.append('phone', this.resident.phone);
    formData.append('block', this.resident.block);
    formData.append('flatNo', this.resident.flatNo);
    formData.append('apartment', this.resident.apartment);
    formData.append('password', this.resident.password); // add this line
  
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
    localStorage.removeItem('token'); // Remove token from storage
    window.location.href = '/admin-login'; // Redirect to login
  }
}
