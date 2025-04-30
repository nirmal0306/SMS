// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-add-resident',
//   templateUrl: './add-resident.component.html',
//   styleUrls: ['./add-resident.component.css']
// })
// export class AddResidentComponent implements OnInit {

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



import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-resident',
  templateUrl: './add-resident.component.html',
  styleUrls: ['./add-resident.component.css']
})
export class AddResidentComponent {
  apiUrl = 'http://localhost:5000/residents';
  blocks: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  flatNos: number[] = [];

  newResident = { name: '', email: '', phone: '',block: '',flatNo: '', apartment: '', password: '',image: '' };
  selectedFile: File | null = null;

  
  constructor(private http: HttpClient, private router: Router) {
    for (let floor = 1; floor <= 5; floor++) {
      for (let unit = 1; unit <= 6; unit++) {
        this.flatNos.push(floor * 100 + unit);
      }
    }
  }
  

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
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
        
        // this.newResident = { name: '', email: '', phone: '', apartment: '', image: '' };
        this.selectedFile = null;
        this.router.navigate(['/list-residents'])
      },
      error => console.error('Error adding resident:', error)
    );
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove token from storage
    window.location.href = '/admin-login'; // Redirect to login
  }
}
