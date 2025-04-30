// // // // // import { Component, OnInit } from '@angular/core';

// // // // // @Component({
// // // // //   selector: 'app-resident',
// // // // //   templateUrl: './resident.component.html',
// // // // //   styleUrls: ['./resident.component.css']
// // // // // })
// // // // // export class ResidentComponent implements OnInit {

// // // // //   constructor() { }

// // // // //   ngOnInit(): void {
// // // // //   }

// // // // // }
// // // // import { Component, OnInit } from '@angular/core';
// // // // import { ResidentService } from '../services/resident.service';

// // // // @Component({
// // // //   selector: 'app-resident',
// // // //   templateUrl: './resident.component.html',
// // // //   styleUrls: ['./resident.component.css']
// // // // })
// // // // export class ResidentsComponent implements OnInit {
// // // //   residents: any[] = [];
// // // //   newResident = { name: '', email: '', phone: '', apartment: '' };
// // // //   selectedResident: any = null;

// // // //   constructor(private residentService: ResidentService) {}

// // // //   ngOnInit() {
// // // //     this.loadResidents();
// // // //   }

// // // //   loadResidents() {
// // // //     this.residentService.getResidents().subscribe(data => {
// // // //       this.residents = data;
// // // //     });
// // // //   }

// // // //   addResident() {
// // // //     this.residentService.addResident(this.newResident).subscribe(() => {
// // // //       this.loadResidents();
// // // //       this.newResident = { name: '', email: '', phone: '', apartment: '' };
// // // //     });
// // // //   }

// // // //   editResident(resident: any) {
// // // //     this.selectedResident = { ...resident };
// // // //   }

// // // //   updateResident() {
// // // //     if (!this.selectedResident) return;
// // // //     this.residentService.updateResident(this.selectedResident._id, this.selectedResident).subscribe(() => {
// // // //       this.loadResidents();
// // // //       this.selectedResident = null;
// // // //     });
// // // //   }

// // // //   deleteResident(id: string) {
// // // //     this.residentService.deleteResident(id).subscribe(() => {
// // // //       this.loadResidents();
// // // //     });
// // // //   }
// // // // }

// // // import { Component } from '@angular/core';

// // // @Component({
// // //   selector: 'app-resident',
// // //   templateUrl: './resident.component.html',
// // //   styleUrls: ['./resident.component.css']
// // // })
// // // export class ResidentComponent {
// // //   newResident: { name: string; email: string; phone: string; apartment: string } = {
// // //     name: '',
// // //     email: '',
// // //     phone: '',
// // //     apartment: ''
// // //   };

// // //   selectedResident: { name: string; email: string; phone: string; apartment: string } = {
// // //     name: '',
// // //     email: '',
// // //     phone: '',
// // //     apartment: ''
// // //   };

// // //   residents: any[] = []; // To store residents data

// // //   addResident() {
// // //     this.residents.push({ ...this.newResident });
// // //     this.newResident = { name: '', email: '', phone: '', apartment: '' }; // Reset form
// // //   }

// // //   editResident(resident: any) {
// // //     this.selectedResident = { ...resident };
// // //   }

// // //   updateResident() {
// // //     let index = this.residents.findIndex(res => res.email === this.selectedResident.email);
// // //     if (index !== -1) {
// // //       this.residents[index] = { ...this.selectedResident };
// // //     }
// // //     this.selectedResident = { name: '', email: '', phone: '', apartment: '' }; // Reset form
// // //   }

// // //   deleteResident(index: number) {
// // //     this.residents.splice(index, 1);
// // //   }
// // // }
// // import { Component, OnInit } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';

// // @Component({
// //   selector: 'app-resident',
// //   templateUrl: './resident.component.html',
// //   styleUrls: ['./resident.component.css']
// // })
// // export class ResidentComponent implements OnInit {
// //   apiUrl = 'http://localhost:5000/residents'; // Adjust port if needed
// //   residents: any[] = [];
// //   newResident = { name: '', email: '', phone: '', apartment: '' };
// //   selectedResident: any = null;

// //   constructor(private http: HttpClient) {}

// //   ngOnInit() {
// //     this.fetchResidents();
// //   }

// //   // Fetch all residents from backend
// //   fetchResidents() {
// //     this.http.get<any[]>(`${this.apiUrl}/list`).subscribe(
// //       (data) => (this.residents = data),
// //       (error) => console.error('Error fetching residents:', error)
// //     );
// //   }

// //   // Add a new resident
// //   addResident() {
// //     this.http.post(`${this.apiUrl}/add`, this.newResident).subscribe(
// //       (res) => {
// //         console.log(res);
// //         this.fetchResidents(); // Refresh list
// //         this.newResident = { name: '', email: '', phone: '', apartment: '' };
// //       },
// //       (error) => console.error('Error adding resident:', error)
// //     );
// //   }

// //   // Select resident for editing
// //   editResident(resident: any) {
// //     this.selectedResident = { ...resident };
// //   }

// //   // Update resident data
// //   updateResident() {
// //     if (!this.selectedResident || !this.selectedResident._id) return;

// //     this.http.put(`${this.apiUrl}/update/${this.selectedResident._id}`, this.selectedResident).subscribe(
// //       (res) => {
// //         console.log(res);
// //         this.fetchResidents();
// //         this.selectedResident = null;
// //       },
// //       (error) => console.error('Error updating resident:', error)
// //     );
// //   }

// //   // Delete resident
// //   deleteResident(id: string) {
// //     this.http.delete(`${this.apiUrl}/delete/${id}`).subscribe(
// //       (res) => {
// //         console.log(res);
// //         this.fetchResidents();
// //       },
// //       (error) => console.error('Error deleting resident:', error)
// //     );
// //   }

//   // logout(): void {
//   //   localStorage.removeItem('token'); // Remove token from storage
//   //   window.location.href = '/login'; // Redirect to login
//   // }
// // }


// // import { Component, OnInit } from "@angular/core";
// // import { HttpClient } from "@angular/common/http";

// // @Component({
// //   selector: "app-resident",
// //   templateUrl: "./resident.component.html",
// //   styleUrls: ["./resident.component.css"],
// // })
// // export class ResidentComponent implements OnInit {
// //   apiUrl = "http://localhost:5000/residents";
// //   residents: any[] = [];
// //   newResident = { name: "", email: "", phone: "", apartment: "", image: null };
// //   selectedResident: any = null;
// //   selectedFile: File | null = null;

// //   constructor(private http: HttpClient) {}

// //   ngOnInit() {
// //     this.fetchResidents();
// //   }

// //   fetchResidents() {
// //     this.http.get<any[]>(`${this.apiUrl}/list`).subscribe(
// //       (data) => (this.residents = data),
// //       (error) => console.error("Error fetching residents:", error)
// //     );
// //   }

// //   onFileSelected(event: any) {
// //     this.selectedFile = event.target.files[0];
// //   }

// //   addResident() {
// //     const formData = new FormData();
// //     formData.append("name", this.newResident.name);
// //     formData.append("email", this.newResident.email);
// //     formData.append("phone", this.newResident.phone);
// //     formData.append("apartment", this.newResident.apartment);
// //     if (this.selectedFile) formData.append("image", this.selectedFile);

// //     this.http.post(`${this.apiUrl}/add`, formData).subscribe(
// //       (res) => {
// //         console.log(res);
// //         this.fetchResidents();
// //         this.newResident = { name: "", email: "", phone: "", apartment: "", image: null };
// //         this.selectedFile = null;
// //       },
// //       (error) => console.error("Error adding resident:", error)
// //     );
// //   }

// //   editResident(resident: any) {
// //     this.selectedResident = { ...resident };
// //   }

// //   updateResident() {
// //     if (!this.selectedResident || !this.selectedResident._id) return;

// //     const formData = new FormData();
// //     formData.append("name", this.selectedResident.name);
// //     formData.append("email", this.selectedResident.email);
// //     formData.append("phone", this.selectedResident.phone);
// //     formData.append("apartment", this.selectedResident.apartment);
// //     if (this.selectedFile) formData.append("image", this.selectedFile);

// //     this.http.put(`${this.apiUrl}/update/${this.selectedResident._id}`, formData).subscribe(
// //       (res) => {
// //         console.log(res);
// //         this.fetchResidents();
// //         this.selectedResident = null;
// //         this.selectedFile = null;
// //       },
// //       (error) => console.error("Error updating resident:", error)
// //     );
// //   }

// //   // Delete resident
// //   deleteResident(id: string) {
// //     this.http.delete(`${this.apiUrl}/delete/${id}`).subscribe(
// //       (res) => {
// //         console.log(res);
// //         this.fetchResidents();
// //       },
// //       (error) => console.error('Error deleting resident:', error)
// //     );
// //   }

// //   logout(): void {
// //     localStorage.removeItem('token'); // Remove token from storage
// //     window.location.href = '/login'; // Redirect to login
// //   }
// // }

// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-resident',
//   templateUrl: './resident.component.html',
//   styleUrls: ['./resident.component.css']
// })
// export class ResidentComponent implements OnInit {
//   apiUrl = 'http://localhost:5000/residents'; // Adjust port if needed
//   residents: any[] = [];
//   newResident = { name: '', email: '', phone: '', apartment: '', image: null };
//   selectedResident: any = null;
//   selectedFile: File | null = null;

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.fetchResidents();
//   }

//   // Fetch all residents
//   fetchResidents() {
//     this.http.get<any[]>(`${this.apiUrl}/list`).subscribe(
//       data => this.residents = data,
//       error => console.error('Error fetching residents:', error)
//     );
//   }

//   // Handle file selection
//   onFileSelected(event: any) {
//     this.selectedFile = event.target.files[0];
//   }

//   // Add a new resident with an image
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
//         this.newResident = { name: '', email: '', phone: '', apartment: '', image: null };
//         this.selectedFile = null;
//       },
//       error => console.error('Error adding resident:', error)
//     );
//   }

//   // Delete resident
//   deleteResident(id: string) {
//     this.http.delete(`${this.apiUrl}/delete/${id}`).subscribe(
//       () => this.fetchResidents(),
//       error => console.error('Error deleting resident:', error)
//     );
//   }
// }

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-resident',
  templateUrl: './resident.component.html',
  styleUrls: ['./resident.component.css']
})
export class ResidentComponent implements OnInit {
  apiUrl = 'http://localhost:5000/residents';
  residents: any[] = [];
  newResident = { name: '', email: '', phone: '', apartment: '', image: '' };
  selectedResident: any = null;
  selectedFile: File | null = null;

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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addResident() {
    const formData = new FormData();
    formData.append('name', this.newResident.name);
    formData.append('email', this.newResident.email);
    formData.append('phone', this.newResident.phone);
    formData.append('apartment', this.newResident.apartment);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.http.post(`${this.apiUrl}/add`, formData).subscribe(
      () => {
        this.fetchResidents();
        this.newResident = { name: '', email: '', phone: '', apartment: '', image: '' };
        this.selectedFile = null;
      },
      error => console.error('Error adding resident:', error)
    );
  }

  // 📝 Set form data for editing
  editResident(resident: any) {
    this.selectedResident = resident;
    this.newResident = { ...resident };
  }

  // 📝 Update resident details
  updateResident() {
    const formData = new FormData();
    formData.append('name', this.newResident.name);
    formData.append('email', this.newResident.email);
    formData.append('phone', this.newResident.phone);
    formData.append('apartment', this.newResident.apartment);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    } else {
      formData.append('image', this.newResident.image);
    }

    this.http.put(`${this.apiUrl}/update/${this.selectedResident._id}`, formData).subscribe(
      () => {
        this.fetchResidents();
        this.cancelEdit();
      },
      error => console.error('Error updating resident:', error)
    );
  }

  // 🛑 Cancel editing
  cancelEdit() {
    this.selectedResident = null;
    this.newResident = { name: '', email: '', phone: '', apartment: '', image: '' };
    this.selectedFile = null;
  }

  // ❌ Delete resident
  deleteResident(id: string) {
    this.http.delete(`${this.apiUrl}/delete/${id}`).subscribe(
      () => this.fetchResidents(),
      error => console.error('Error deleting resident:', error)
    );
  }
    logout(): void {
    localStorage.removeItem('token'); // Remove token from storage
    window.location.href = '/login'; // Redirect to login
  }
}
