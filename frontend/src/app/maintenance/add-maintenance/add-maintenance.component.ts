// // // import { Component, OnInit } from '@angular/core';
// // // import { Router } from '@angular/router';
// // // import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// // // import { MaintenanceService } from '../../services/maintenance.service';

// // // @Component({
// // //   selector: 'app-add-maintenance',
// // //   templateUrl: './add-maintenance.component.html',
// // //   styleUrls: ['./add-maintenance.component.css']
// // // })
// // // export class AddMaintenanceComponent implements OnInit {
// // //   residentName: string = '';
// // //   email: string = '';
// // //   apartment: string = '';
// // //   amount: number | null = null;
// // //   month: string = '';
// // //   name: string = '';
// // //   userEmail: string | null = '';

// // //   constructor(
// // //     private maintenanceService: MaintenanceService, // Properly injected
// // //     private router: Router,
// // //     private http: HttpClient
// // //   ) {}

// // //   ngOnInit(): void {
// // //     this.userEmail = localStorage.getItem('email');
// // //     if (this.userEmail) {
// // //       this.http.get<any>(`http://localhost:5000/resident/${this.userEmail}`).subscribe(
// // //         (data) => {
// // //           this.name = data.name;
// // //           this.residentName = data.name;
// // //           this.email = data.email;
// // //           this.apartment = data.apartment; // e.g., 'G-501'
// // //         },
// // //         (error: HttpErrorResponse) => { // Explicitly typed error
// // //           console.error('Failed to fetch resident details:', error);
// // //           alert('Error fetching resident details. Please try again.');
// // //         }
// // //       );
// // //     } else {
// // //       alert('Please log in to continue.');
// // //       this.router.navigate(['/resident-login']);
// // //     }
// // //   }

// // //   payMaintenance() {
// // //     if (!this.amount || this.amount <= 0) {
// // //       alert('Please enter a valid amount.');
// // //       return;
// // //     }
// // //     if (!this.month) {
// // //       alert('Please select a month.');
// // //       return;
// // //     }

// // //     const payment = {
// // //       residentName: this.residentName,
// // //       email: this.email,
// // //       apartment: this.apartment,
// // //       amount: this.amount,
// // //       month: this.month,
// // //       paymentDate: new Date().toISOString()
// // //     };

// // //     this.maintenanceService.submitPayment(payment).subscribe(
// // //       () => {
// // //         alert(`Payment of ${this.amount} for ${this.month} submitted successfully.`);
// // //         this.amount = null;
// // //         this.month = '';
// // //         this.router.navigate(['/after-login']);
// // //       },
// // //       (error: HttpErrorResponse) => { // Explicitly typed error
// // //         console.error('Payment submission failed:', error);
// // //         alert('Payment submission failed. Please try again.');
// // //       }
// // //     );
// // //   }

// // //   logout(): void {
// // //     localStorage.removeItem('token');
// // //     localStorage.removeItem('email');
// // //     window.location.href = '/resident-login';
// // //   }
// // // }

// // // import { Component, OnInit } from '@angular/core';
// // // import { Router } from '@angular/router';
// // // import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// // // import { MaintenanceService } from 'src/app/services/maintenance.service';

// // // @Component({
// // //   selector: 'app-add-maintenance',
// // //   templateUrl: './add-maintenance.component.html',
// // //   styleUrls: ['./add-maintenance.component.css']
// // // })
// // // export class AddMaintenanceComponent implements OnInit {
// // //   residentName: string = '';
// // //   email: string = '';
// // //   apartment: string = '';
// // //   amount: number = 5000; // Fixed amount
// // //   month: string = '';
// // //   name: string = '';
// // //   userEmail: string | null = '';
// // //   userId: string | null = ''; // Assuming userId is stored or derived
// // //   paymentStatus: string = '';
// // //   isPaymentDisabled: boolean = false;

// // //   constructor(
// // //     private maintenanceService: MaintenanceService,
// // //     private router: Router,
// // //     private http: HttpClient
// // //   ) {}

// // //   ngOnInit() {
// // //     this.userEmail = localStorage.getItem('email');
// // //     // this.userId = localStorage.getItem('userId'); // Replace with actual userId from auth
// // //     if (this.userEmail) {
// // //       this.http.get<any>(`http://localhost:5000/resident/${this.userEmail}`).subscribe(
// // //         (data) => {
// // //           this.name = data.name;
// // //           this.residentName = data.name;
// // //           this.email = data.email;
// // //           this.apartment = data.apartment;
// // //           this.checkOverallStatus(); // Check initial status
// // //         },
// // //         (error: HttpErrorResponse) => {
// // //           console.error('Failed to fetch resident details:', error);
// // //           alert('Error fetching resident details. Please try again.');
// // //         }
// // //       );
// // //     } else {
// // //       alert('Please log in to continue.');
// // //       this.router.navigate(['/resident-login']);
// // //     }
// // //   }

// // //   checkPaymentStatus() {
// // //     if (this.userId && this.month) {
// // //       this.maintenanceService.checkPaymentStatus(this.userId).subscribe(
// // //         (response) => {
// // //           this.paymentStatus = response.status;
// // //           if (response.unpaidMonths) {
// // //             this.paymentStatus += `: ${response.unpaidMonths.join(', ')}`;
// // //           }
// // //           this.isPaymentDisabled = response.status === 'Maintenance already paid for this month' || response.status === 'All month maintenance paid' || response.status === 'Up to date';
// // //         },
// // //         (error: HttpErrorResponse) => {
// // //           console.error('Failed to check payment status:', error);
// // //           this.paymentStatus = 'Error checking status';
// // //         }
// // //       );
// // //     }
// // //   }

// // //   checkOverallStatus() {
// // //     if (this.userId) {
// // //       this.maintenanceService.checkPaymentStatus(this.userId).subscribe(
// // //         (response) => {
// // //           this.paymentStatus = response.status;
// // //           if (response.unpaidMonths) {
// // //             this.paymentStatus += `: ${response.unpaidMonths.join(', ')}`;
// // //           }
// // //           this.isPaymentDisabled = response.status === 'Maintenance already paid for this month' || response.status === 'All month maintenance paid' || response.status === 'Up to date';
// // //         },
// // //         (error: HttpErrorResponse) => {
// // //           console.error('Failed to check overall status:', error);
// // //           this.paymentStatus = 'Error checking status';
// // //         }
// // //       );
// // //     }
// // //   }

// // //   payMaintenance() {
// // //     if (!this.month) {
// // //       alert('Please select a month.');
// // //       return;
// // //     }

// // //     const payment = {
// // //       residentName: this.residentName,
// // //       email: this.email,
// // //       apartment: this.apartment,
// // //       amount: this.amount,
// // //       month: this.month,
// // //       userId: this.userId
// // //     };

// // //     this.maintenanceService.submitPayment(payment).subscribe(
// // //       () => {
// // //         alert(`Payment of ${this.amount} for ${this.month} submitted successfully.`);
// // //         this.checkPaymentStatus(); // Update status after payment
// // //         this.month = ''; // Reset month selection
// // //       },
// // //       (error: HttpErrorResponse) => {
// // //         console.error('Payment submission failed:', error);
// // //         alert('Payment submission failed. Please try again.');
// // //       }
// // //     );
// // //   }

// // //   logout() {
// // //     localStorage.removeItem('token');
// // //     localStorage.removeItem('email');
// // //     localStorage.removeItem('userId'); // Remove userId if stored
// // //     window.location.href = '/resident-login';
// // //   }
// // // }



// // import { Component, OnInit } from '@angular/core';
// // import { Router } from '@angular/router';
// // import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// // import { MaintenanceService } from '../../services/maintenance.service';

// // @Component({
// //   selector: 'app-add-maintenance',
// //   templateUrl: './add-maintenance.component.html',
// //   styleUrls: ['./add-maintenance.component.css']
// // })
// // export class AddMaintenanceComponent implements OnInit {
// //   residentName: string = '';
// //   email: string = '';
// //   apartment: string = '';
// //   amount: number = 5000; // Fixed amount
// //   month: string = '';
// //   name: string = '';
// //   userEmail: string | null = '';
// //   paymentStatus: string = '';
// //   isPaymentDisabled: boolean = false;

// //   constructor(
// //     private maintenanceService: MaintenanceService,
// //     private router: Router,
// //     private http: HttpClient
// //   ) {}

// //   ngOnInit() {
// //     this.userEmail = localStorage.getItem('email');
// //     // this.userId = localStorage.getItem('userId'); // Replace with actual userId from auth
// //     if (this.userEmail) {
// //       this.http.get<any>(`http://localhost:5000/resident/${this.userEmail}`).subscribe(
// //         (data) => {
// //           this.name = data.name;
// //           this.residentName = data.name;
// //           this.email = data.email;
// //           this.apartment = data.apartment;
// //           this.checkOverallStatus(); // Check initial status
// //         },
// //         (error: HttpErrorResponse) => {
// //           console.error('Failed to fetch resident details:', error);
// //           alert('Error fetching resident details. Please try again.');
// //         }
// //       );
// //     } else {
// //       alert('Please log in to continue.');
// //       this.router.navigate(['/resident-login']);
// //     }
// //   }

// //   checkPaymentStatus() {
// //     if (this.month) {
// //       this.maintenanceService.checkPaymentStatus(this.email).subscribe(
// //         (response) => {
// //           this.paymentStatus = response.status;
// //           if (response.unpaidMonths) {
// //             this.paymentStatus += `: ${response.unpaidMonths.join(', ')}`;
// //           }
// //           this.isPaymentDisabled = response.status === 'Maintenance already paid for this resident for the selected month' || 
// //                                  response.status === 'All month maintenance paid' || 
// //                                  response.status === 'Up to date';
// //         },
// //         (error: HttpErrorResponse) => {
// //           console.error('Failed to check payment status:', error);
// //           this.paymentStatus = 'Error checking status';
// //         }
// //       );
// //     }
// //   }

// //   checkOverallStatus() {
// //     if (this.userEmail) {
// //       this.maintenanceService.checkPaymentStatus(this.userEmail).subscribe(
// //         (response) => {
// //           this.paymentStatus = response.status;
// //           if (response.unpaidMonths) {
// //             this.paymentStatus += `: ${response.unpaidMonths.join(', ')}`;
// //           }
// //           this.isPaymentDisabled = response.status === 'Maintenance already paid for this resident for the selected month' || 
// //                                  response.status === 'All month maintenance paid' || 
// //                                  response.status === 'Up to date';
// //         },
// //         (error: HttpErrorResponse) => {
// //           console.error('Failed to check overall status:', error);
// //           this.paymentStatus = 'Error checking status';
// //         }
// //       );
// //     }
// //   }

// //   payMaintenance() {
// //     if (!this.month) {
// //       alert('Please select a month.');
// //       return;
// //     }

// //     const payment = {
// //       residentName: this.residentName,
// //       email: this.email,
// //       apartment: this.apartment,
// //       amount: this.amount,
// //       month: this.month
// //     };

// //     this.maintenanceService.submitPayment(payment).subscribe(
// //       (response) => {
// //         alert(response.message || `Payment of ${this.amount} for ${this.month} submitted successfully.`);
// //         this.checkPaymentStatus(); // Update status after payment
// //         this.month = ''; // Reset month selection
// //       },
// //       (error: HttpErrorResponse) => {
// //         console.error('Payment submission failed:', error);
// //         alert(error.error.message || 'Payment submission failed. Please try again.');
// //       }
// //     );
// //   }

// //   logout() {
// //     localStorage.removeItem('token');
// //     localStorage.removeItem('email');
// //     window.location.href = '/resident-login';
// //   }
// // }


// //new
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { MaintenanceService } from '../../services/maintenance.service';

// @Component({
//   selector: 'app-add-maintenance',
//   templateUrl: './add-maintenance.component.html',
//   styleUrls: ['./add-maintenance.component.css']
// })
// export class AddMaintenanceComponent implements OnInit {
//   residentName: string = '';
//   email: string = '';
//   apartment: string = '';
//   amount: number = 5000; // Default amount per month
//   month: string = '';
//   name: string = '';
//   userEmail: string | null = '';
//   paymentStatus: string = '';
//   isPaymentDisabled: boolean = false;
//   payWholeYear: boolean = false; // New property for whole year payment

//   constructor(
//     private maintenanceService: MaintenanceService,
//     private router: Router,
//     private http: HttpClient
//   ) {}

//   ngOnInit() {
//     this.userEmail = localStorage.getItem('email');
//     if (this.userEmail) {
//       this.http.get<any>(`http://localhost:5000/resident/${this.userEmail}`).subscribe(
//         (data) => {
//           this.name = data.name;
//           this.residentName = data.name;
//           this.email = data.email;
//           this.apartment = data.apartment;
//           this.checkOverallStatus(); // Check initial status
//         },
//         (error: HttpErrorResponse) => {
//           console.error('Failed to fetch resident details:', error);
//           alert('Error fetching resident details. Please try again.');
//         }
//       );
//     } else {
//       alert('Please log in to continue.');
//       this.router.navigate(['/resident-login']);
//     }
//   }

//   updateAmount() {
//     if (this.payWholeYear) {
//       this.amount = 60000; // 12 months × 5000
//       this.month = 'Whole Year'; // Set month to indicate whole year payment
//       this.checkPaymentStatus(); // Check if whole year payment is already made
//     } else {
//       this.amount = 5000; // Reset to default monthly amount
//       this.month = ''; // Reset month selection
//       this.checkOverallStatus(); // Check overall status
//     }
//   }

//   checkPaymentStatus() {
//     if (this.month) {
//       this.maintenanceService.checkPaymentStatus(this.email).subscribe(
//         (response) => {
//           this.paymentStatus = response.status;
//           if (response.unpaidMonths) {
//             this.paymentStatus += `: ${response.unpaidMonths.join(', ')}`;
//           }
//           this.isPaymentDisabled = response.status === 'Maintenance already paid for this resident for the selected month' ||
//                                  response.status === 'All month maintenance paid' ||
//                                  response.status === 'Whole year maintenance paid' ||
//                                  response.status === 'Up to date';
//         },
//         (error: HttpErrorResponse) => {
//           console.error('Failed to check payment status:', error);
//           this.paymentStatus = 'Error checking status';
//         }
//       );
//     }
//   }

//   checkOverallStatus() {
//     if (this.userEmail) {
//       this.maintenanceService.checkPaymentStatus(this.userEmail).subscribe(
//         (response) => {
//           this.paymentStatus = response.status;
//           if (response.unpaidMonths) {
//             this.paymentStatus += `: ${response.unpaidMonths.join(', ')}`;
//           }
//           this.isPaymentDisabled = response.status === 'Maintenance already paid for this resident for the selected month' ||
//                                  response.status === 'All month maintenance paid' ||
//                                  response.status === 'Whole year maintenance paid' ||
//                                  response.status === 'Up to date';
//         },
//         (error: HttpErrorResponse) => {
//           console.error('Failed to check overall status:', error);
//           this.paymentStatus = 'Error checking status';
//         }
//       );
//     }
//   }

//   payMaintenance() {
//     if (!this.month && !this.payWholeYear) {
//       alert('Please select a month or choose to pay for the whole year.');
//       return;
//     }

//     const payment = {
//       residentName: this.residentName,
//       email: this.email,
//       apartment: this.apartment,
//       amount: this.amount,
//       month: this.payWholeYear ? 'Whole Year' : this.month,
//       paymentDate: new Date()
//     };

//     this.maintenanceService.submitPayment(payment).subscribe(
//       (response) => {
//         alert(response.message || `Payment of ${this.amount} for ${this.payWholeYear ? 'the whole year' : this.month} submitted successfully.`);
//         this.checkPaymentStatus(); // Update status after payment
//         this.month = ''; // Reset month selection
//         this.payWholeYear = false; // Reset whole year checkbox
//         this.amount = 5000; // Reset amount
//       },
//       (error: HttpErrorResponse) => {
//         console.error('Payment submission failed:', error);
//         alert(error.error.message || 'Payment submission failed. Please try again.');
//       }
//     );
//   }

//   logout() {
//     localStorage.removeItem('token');
//     localStorage.removeItem('email');
//     window.location.href = '/resident-login';
//   }
// }


//neww 1111
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MaintenanceService } from '../../services/maintenance.service';

@Component({
  selector: 'app-add-maintenance',
  templateUrl: './add-maintenance.component.html',
  styleUrls: ['./add-maintenance.component.css']
})
export class AddMaintenanceComponent implements OnInit {
  residentName: string = '';
  email: string = '';
  apartment: string = '';
  amount: number = 5000; // Default amount per month
  month: string = '';
  name: string = '';
  userEmail: string | null = '';
  paymentStatus: string = '';
  isPaymentDisabled: boolean = false;
  payWholeYear: boolean = false; // New property for whole year payment

  constructor(
    private maintenanceService: MaintenanceService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.userEmail = localStorage.getItem('email');
    if (this.userEmail) {
      this.http.get<any>(`http://localhost:5000/resident/${this.userEmail}`).subscribe(
        (data) => {
          this.name = data.name;
          this.residentName = data.name;
          this.email = data.email;
          this.apartment = data.apartment;
          this.checkOverallStatus(); // Check initial status
        },
        (error: HttpErrorResponse) => {
          console.error('Failed to fetch resident details:', error);
          alert('Error fetching resident details. Please try again.');
        }
      );
    } else {
      alert('Please log in to continue.');
      this.router.navigate(['/resident-login']);
    }
  }

  updateAmount() {
    if (this.payWholeYear) {
      this.amount = 60000; // 12 months × 5000
      this.month = 'Whole Year'; // Set month to indicate whole year payment
      this.checkPaymentStatus(); // Check if whole year payment is already made
    } else {
      this.amount = 5000; // Reset to default monthly amount
      this.month = ''; // Reset month selection
      this.checkOverallStatus(); // Check overall status
    }
  }

  checkPaymentStatus() {
    if (this.month) {
      this.maintenanceService.checkPaymentStatus(this.email).subscribe(
        (response) => {
          this.paymentStatus = response.status;
          if (response.unpaidMonths) {
            this.paymentStatus += `: ${response.unpaidMonths.join(', ')}`;
          }
          this.isPaymentDisabled = response.status === 'Maintenance already paid for this resident for the selected month' ||
                                 response.status === 'All month maintenance paid' ||
                                 response.status === 'Whole year maintenance paid' ||
                                 response.status === 'Up to date';
        },
        (error: HttpErrorResponse) => {
          console.error('Failed to check payment status:', error);
          this.paymentStatus = 'Error checking status';
        }
      );
    }
  }

  checkOverallStatus() {
    if (this.userEmail) {
      this.maintenanceService.checkPaymentStatus(this.userEmail).subscribe(
        (response) => {
          this.paymentStatus = response.status;
          if (response.unpaidMonths) {
            this.paymentStatus += `: ${response.unpaidMonths.join(', ')}`;
          }
          this.isPaymentDisabled = response.status === 'Maintenance already paid for this resident for the selected month' ||
                                 response.status === 'All month maintenance paid' ||
                                 response.status === 'Whole year maintenance paid' ||
                                 response.status === 'Up to date';
        },
        (error: HttpErrorResponse) => {
          console.error('Failed to check overall status:', error);
          this.paymentStatus = 'Error checking status';
        }
      );
    }
  }

  payMaintenance() {
    if (!this.month && !this.payWholeYear) {
      alert('Please select a month or choose to pay for the whole year.');
      return;
    }

    const payment = {
      residentName: this.residentName,
      email: this.email,
      apartment: this.apartment,
      amount: this.amount,
      month: this.payWholeYear ? 'Whole Year' : this.month,
      paymentDate: new Date()
    };

    this.maintenanceService.submitPayment(payment).subscribe(
      (response) => {
        alert(response.message || `Payment of ${this.amount} for ${this.payWholeYear ? 'the whole year' : this.month} submitted successfully.`);
        this.checkPaymentStatus(); // Update status after payment
        this.month = ''; // Reset month selection
        this.payWholeYear = false; // Reset whole year checkbox
        this.amount = 5000; // Reset amount
      },
      (error: HttpErrorResponse) => {
        console.error('Payment submission failed:', error);
        alert(error.error.message || 'Payment submission failed. Please try again.');
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.href = '/resident-login';
  }
}