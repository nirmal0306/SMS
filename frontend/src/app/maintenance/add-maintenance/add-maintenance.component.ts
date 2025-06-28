// // // // // import { Component, OnInit } from '@angular/core';
// // // // // import { Router } from '@angular/router';
// // // // // import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// // // // // import { MaintenanceService } from '../../services/maintenance.service';

// // // // // @Component({
// // // // //   selector: 'app-add-maintenance',
// // // // //   templateUrl: './add-maintenance.component.html',
// // // // //   styleUrls: ['./add-maintenance.component.css']
// // // // // })
// // // // // export class AddMaintenanceComponent implements OnInit {
// // // // //   residentName: string = '';
// // // // //   email: string = '';
// // // // //   apartment: string = '';
// // // // //   amount: number | null = null;
// // // // //   month: string = '';
// // // // //   name: string = '';
// // // // //   userEmail: string | null = '';

// // // // //   constructor(
// // // // //     private maintenanceService: MaintenanceService, // Properly injected
// // // // //     private router: Router,
// // // // //     private http: HttpClient
// // // // //   ) {}

// // // // //   ngOnInit(): void {
// // // // //     this.userEmail = localStorage.getItem('email');
// // // // //     if (this.userEmail) {
// // // // //       this.http.get<any>(`http://localhost:5000/resident/${this.userEmail}`).subscribe(
// // // // //         (data) => {
// // // // //           this.name = data.name;
// // // // //           this.residentName = data.name;
// // // // //           this.email = data.email;
// // // // //           this.apartment = data.apartment; // e.g., 'G-501'
// // // // //         },
// // // // //         (error: HttpErrorResponse) => { // Explicitly typed error
// // // // //           console.error('Failed to fetch resident details:', error);
// // // // //           alert('Error fetching resident details. Please try again.');
// // // // //         }
// // // // //       );
// // // // //     } else {
// // // // //       alert('Please log in to continue.');
// // // // //       this.router.navigate(['/resident-login']);
// // // // //     }
// // // // //   }

// // // // //   payMaintenance() {
// // // // //     if (!this.amount || this.amount <= 0) {
// // // // //       alert('Please enter a valid amount.');
// // // // //       return;
// // // // //     }
// // // // //     if (!this.month) {
// // // // //       alert('Please select a month.');
// // // // //       return;
// // // // //     }

// // // // //     const payment = {
// // // // //       residentName: this.residentName,
// // // // //       email: this.email,
// // // // //       apartment: this.apartment,
// // // // //       amount: this.amount,
// // // // //       month: this.month,
// // // // //       paymentDate: new Date().toISOString()
// // // // //     };

// // // // //     this.maintenanceService.submitPayment(payment).subscribe(
// // // // //       () => {
// // // // //         alert(`Payment of ${this.amount} for ${this.month} submitted successfully.`);
// // // // //         this.amount = null;
// // // // //         this.month = '';
// // // // //         this.router.navigate(['/after-login']);
// // // // //       },
// // // // //       (error: HttpErrorResponse) => { // Explicitly typed error
// // // // //         console.error('Payment submission failed:', error);
// // // // //         alert('Payment submission failed. Please try again.');
// // // // //       }
// // // // //     );
// // // // //   }

// // // // //   logout(): void {
// // // // //     localStorage.removeItem('token');
// // // // //     localStorage.removeItem('email');
// // // // //     window.location.href = '/resident-login';
// // // // //   }
// // // // // }

// // // // // import { Component, OnInit } from '@angular/core';
// // // // // import { Router } from '@angular/router';
// // // // // import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// // // // // import { MaintenanceService } from 'src/app/services/maintenance.service';

// // // // // @Component({
// // // // //   selector: 'app-add-maintenance',
// // // // //   templateUrl: './add-maintenance.component.html',
// // // // //   styleUrls: ['./add-maintenance.component.css']
// // // // // })
// // // // // export class AddMaintenanceComponent implements OnInit {
// // // // //   residentName: string = '';
// // // // //   email: string = '';
// // // // //   apartment: string = '';
// // // // //   amount: number = 5000; // Fixed amount
// // // // //   month: string = '';
// // // // //   name: string = '';
// // // // //   userEmail: string | null = '';
// // // // //   userId: string | null = ''; // Assuming userId is stored or derived
// // // // //   paymentStatus: string = '';
// // // // //   isPaymentDisabled: boolean = false;

// // // // //   constructor(
// // // // //     private maintenanceService: MaintenanceService,
// // // // //     private router: Router,
// // // // //     private http: HttpClient
// // // // //   ) {}

// // // // //   ngOnInit() {
// // // // //     this.userEmail = localStorage.getItem('email');
// // // // //     // this.userId = localStorage.getItem('userId'); // Replace with actual userId from auth
// // // // //     if (this.userEmail) {
// // // // //       this.http.get<any>(`http://localhost:5000/resident/${this.userEmail}`).subscribe(
// // // // //         (data) => {
// // // // //           this.name = data.name;
// // // // //           this.residentName = data.name;
// // // // //           this.email = data.email;
// // // // //           this.apartment = data.apartment;
// // // // //           this.checkOverallStatus(); // Check initial status
// // // // //         },
// // // // //         (error: HttpErrorResponse) => {
// // // // //           console.error('Failed to fetch resident details:', error);
// // // // //           alert('Error fetching resident details. Please try again.');
// // // // //         }
// // // // //       );
// // // // //     } else {
// // // // //       alert('Please log in to continue.');
// // // // //       this.router.navigate(['/resident-login']);
// // // // //     }
// // // // //   }

// // // // //   checkPaymentStatus() {
// // // // //     if (this.userId && this.month) {
// // // // //       this.maintenanceService.checkPaymentStatus(this.userId).subscribe(
// // // // //         (response) => {
// // // // //           this.paymentStatus = response.status;
// // // // //           if (response.unpaidMonths) {
// // // // //             this.paymentStatus += `: ${response.unpaidMonths.join(', ')}`;
// // // // //           }
// // // // //           this.isPaymentDisabled = response.status === 'Maintenance already paid for this month' || response.status === 'All month maintenance paid' || response.status === 'Up to date';
// // // // //         },
// // // // //         (error: HttpErrorResponse) => {
// // // // //           console.error('Failed to check payment status:', error);
// // // // //           this.paymentStatus = 'Error checking status';
// // // // //         }
// // // // //       );
// // // // //     }
// // // // //   }

// // // // //   checkOverallStatus() {
// // // // //     if (this.userId) {
// // // // //       this.maintenanceService.checkPaymentStatus(this.userId).subscribe(
// // // // //         (response) => {
// // // // //           this.paymentStatus = response.status;
// // // // //           if (response.unpaidMonths) {
// // // // //             this.paymentStatus += `: ${response.unpaidMonths.join(', ')}`;
// // // // //           }
// // // // //           this.isPaymentDisabled = response.status === 'Maintenance already paid for this month' || response.status === 'All month maintenance paid' || response.status === 'Up to date';
// // // // //         },
// // // // //         (error: HttpErrorResponse) => {
// // // // //           console.error('Failed to check overall status:', error);
// // // // //           this.paymentStatus = 'Error checking status';
// // // // //         }
// // // // //       );
// // // // //     }
// // // // //   }

// // // // //   payMaintenance() {
// // // // //     if (!this.month) {
// // // // //       alert('Please select a month.');
// // // // //       return;
// // // // //     }

// // // // //     const payment = {
// // // // //       residentName: this.residentName,
// // // // //       email: this.email,
// // // // //       apartment: this.apartment,
// // // // //       amount: this.amount,
// // // // //       month: this.month,
// // // // //       userId: this.userId
// // // // //     };

// // // // //     this.maintenanceService.submitPayment(payment).subscribe(
// // // // //       () => {
// // // // //         alert(`Payment of ${this.amount} for ${this.month} submitted successfully.`);
// // // // //         this.checkPaymentStatus(); // Update status after payment
// // // // //         this.month = ''; // Reset month selection
// // // // //       },
// // // // //       (error: HttpErrorResponse) => {
// // // // //         console.error('Payment submission failed:', error);
// // // // //         alert('Payment submission failed. Please try again.');
// // // // //       }
// // // // //     );
// // // // //   }

// // // // //   logout() {
// // // // //     localStorage.removeItem('token');
// // // // //     localStorage.removeItem('email');
// // // // //     localStorage.removeItem('userId'); // Remove userId if stored
// // // // //     window.location.href = '/resident-login';
// // // // //   }
// // // // // }



// // // // import { Component, OnInit } from '@angular/core';
// // // // import { Router } from '@angular/router';
// // // // import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// // // // import { MaintenanceService } from '../../services/maintenance.service';

// // // // @Component({
// // // //   selector: 'app-add-maintenance',
// // // //   templateUrl: './add-maintenance.component.html',
// // // //   styleUrls: ['./add-maintenance.component.css']
// // // // })
// // // // export class AddMaintenanceComponent implements OnInit {
// // // //   residentName: string = '';
// // // //   email: string = '';
// // // //   apartment: string = '';
// // // //   amount: number = 5000; // Fixed amount
// // // //   month: string = '';
// // // //   name: string = '';
// // // //   userEmail: string | null = '';
// // // //   paymentStatus: string = '';
// // // //   isPaymentDisabled: boolean = false;

// // // //   constructor(
// // // //     private maintenanceService: MaintenanceService,
// // // //     private router: Router,
// // // //     private http: HttpClient
// // // //   ) {}

// // // //   ngOnInit() {
// // // //     this.userEmail = localStorage.getItem('email');
// // // //     // this.userId = localStorage.getItem('userId'); // Replace with actual userId from auth
// // // //     if (this.userEmail) {
// // // //       this.http.get<any>(`http://localhost:5000/resident/${this.userEmail}`).subscribe(
// // // //         (data) => {
// // // //           this.name = data.name;
// // // //           this.residentName = data.name;
// // // //           this.email = data.email;
// // // //           this.apartment = data.apartment;
// // // //           this.checkOverallStatus(); // Check initial status
// // // //         },
// // // //         (error: HttpErrorResponse) => {
// // // //           console.error('Failed to fetch resident details:', error);
// // // //           alert('Error fetching resident details. Please try again.');
// // // //         }
// // // //       );
// // // //     } else {
// // // //       alert('Please log in to continue.');
// // // //       this.router.navigate(['/resident-login']);
// // // //     }
// // // //   }

// // // //   checkPaymentStatus() {
// // // //     if (this.month) {
// // // //       this.maintenanceService.checkPaymentStatus(this.email).subscribe(
// // // //         (response) => {
// // // //           this.paymentStatus = response.status;
// // // //           if (response.unpaidMonths) {
// // // //             this.paymentStatus += `: ${response.unpaidMonths.join(', ')}`;
// // // //           }
// // // //           this.isPaymentDisabled = response.status === 'Maintenance already paid for this resident for the selected month' || 
// // // //                                  response.status === 'All month maintenance paid' || 
// // // //                                  response.status === 'Up to date';
// // // //         },
// // // //         (error: HttpErrorResponse) => {
// // // //           console.error('Failed to check payment status:', error);
// // // //           this.paymentStatus = 'Error checking status';
// // // //         }
// // // //       );
// // // //     }
// // // //   }

// // // //   checkOverallStatus() {
// // // //     if (this.userEmail) {
// // // //       this.maintenanceService.checkPaymentStatus(this.userEmail).subscribe(
// // // //         (response) => {
// // // //           this.paymentStatus = response.status;
// // // //           if (response.unpaidMonths) {
// // // //             this.paymentStatus += `: ${response.unpaidMonths.join(', ')}`;
// // // //           }
// // // //           this.isPaymentDisabled = response.status === 'Maintenance already paid for this resident for the selected month' || 
// // // //                                  response.status === 'All month maintenance paid' || 
// // // //                                  response.status === 'Up to date';
// // // //         },
// // // //         (error: HttpErrorResponse) => {
// // // //           console.error('Failed to check overall status:', error);
// // // //           this.paymentStatus = 'Error checking status';
// // // //         }
// // // //       );
// // // //     }
// // // //   }

// // // //   payMaintenance() {
// // // //     if (!this.month) {
// // // //       alert('Please select a month.');
// // // //       return;
// // // //     }

// // // //     const payment = {
// // // //       residentName: this.residentName,
// // // //       email: this.email,
// // // //       apartment: this.apartment,
// // // //       amount: this.amount,
// // // //       month: this.month
// // // //     };

// // // //     this.maintenanceService.submitPayment(payment).subscribe(
// // // //       (response) => {
// // // //         alert(response.message || `Payment of ${this.amount} for ${this.month} submitted successfully.`);
// // // //         this.checkPaymentStatus(); // Update status after payment
// // // //         this.month = ''; // Reset month selection
// // // //       },
// // // //       (error: HttpErrorResponse) => {
// // // //         console.error('Payment submission failed:', error);
// // // //         alert(error.error.message || 'Payment submission failed. Please try again.');
// // // //       }
// // // //     );
// // // //   }

// // // //   logout() {
// // // //     localStorage.removeItem('token');
// // // //     localStorage.removeItem('email');
// // // //     window.location.href = '/resident-login';
// // // //   }
// // // // }


// // // //new
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
// // //   amount: number = 5000; // Default amount per month
// // //   month: string = '';
// // //   name: string = '';
// // //   userEmail: string | null = '';
// // //   paymentStatus: string = '';
// // //   isPaymentDisabled: boolean = false;
// // //   payWholeYear: boolean = false; // New property for whole year payment

// // //   constructor(
// // //     private maintenanceService: MaintenanceService,
// // //     private router: Router,
// // //     private http: HttpClient
// // //   ) {}

// // //   ngOnInit() {
// // //     this.userEmail = localStorage.getItem('email');
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

// // //   updateAmount() {
// // //     if (this.payWholeYear) {
// // //       this.amount = 60000; // 12 months × 5000
// // //       this.month = 'Whole Year'; // Set month to indicate whole year payment
// // //       this.checkPaymentStatus(); // Check if whole year payment is already made
// // //     } else {
// // //       this.amount = 5000; // Reset to default monthly amount
// // //       this.month = ''; // Reset month selection
// // //       this.checkOverallStatus(); // Check overall status
// // //     }
// // //   }

// // //   checkPaymentStatus() {
// // //     if (this.month) {
// // //       this.maintenanceService.checkPaymentStatus(this.email).subscribe(
// // //         (response) => {
// // //           this.paymentStatus = response.status;
// // //           if (response.unpaidMonths) {
// // //             this.paymentStatus += `: ${response.unpaidMonths.join(', ')}`;
// // //           }
// // //           this.isPaymentDisabled = response.status === 'Maintenance already paid for this resident for the selected month' ||
// // //                                  response.status === 'All month maintenance paid' ||
// // //                                  response.status === 'Whole year maintenance paid' ||
// // //                                  response.status === 'Up to date';
// // //         },
// // //         (error: HttpErrorResponse) => {
// // //           console.error('Failed to check payment status:', error);
// // //           this.paymentStatus = 'Error checking status';
// // //         }
// // //       );
// // //     }
// // //   }

// // //   checkOverallStatus() {
// // //     if (this.userEmail) {
// // //       this.maintenanceService.checkPaymentStatus(this.userEmail).subscribe(
// // //         (response) => {
// // //           this.paymentStatus = response.status;
// // //           if (response.unpaidMonths) {
// // //             this.paymentStatus += `: ${response.unpaidMonths.join(', ')}`;
// // //           }
// // //           this.isPaymentDisabled = response.status === 'Maintenance already paid for this resident for the selected month' ||
// // //                                  response.status === 'All month maintenance paid' ||
// // //                                  response.status === 'Whole year maintenance paid' ||
// // //                                  response.status === 'Up to date';
// // //         },
// // //         (error: HttpErrorResponse) => {
// // //           console.error('Failed to check overall status:', error);
// // //           this.paymentStatus = 'Error checking status';
// // //         }
// // //       );
// // //     }
// // //   }

// // //   payMaintenance() {
// // //     if (!this.month && !this.payWholeYear) {
// // //       alert('Please select a month or choose to pay for the whole year.');
// // //       return;
// // //     }

// // //     const payment = {
// // //       residentName: this.residentName,
// // //       email: this.email,
// // //       apartment: this.apartment,
// // //       amount: this.amount,
// // //       month: this.payWholeYear ? 'Whole Year' : this.month,
// // //       paymentDate: new Date()
// // //     };

// // //     this.maintenanceService.submitPayment(payment).subscribe(
// // //       (response) => {
// // //         alert(response.message || `Payment of ${this.amount} for ${this.payWholeYear ? 'the whole year' : this.month} submitted successfully.`);
// // //         this.checkPaymentStatus(); // Update status after payment
// // //         this.month = ''; // Reset month selection
// // //         this.payWholeYear = false; // Reset whole year checkbox
// // //         this.amount = 5000; // Reset amount
// // //       },
// // //       (error: HttpErrorResponse) => {
// // //         console.error('Payment submission failed:', error);
// // //         alert(error.error.message || 'Payment submission failed. Please try again.');
// // //       }
// // //     );
// // //   }

// // //   logout() {
// // //     localStorage.removeItem('token');
// // //     localStorage.removeItem('email');
// // //     window.location.href = '/resident-login';
// // //   }
// // // }


// // //neww 1111
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
// //   amount: number = 5000; // Default amount per month
// //   month: string = '';
// //   name: string = '';
// //   userEmail: string | null = '';
// //   paymentStatus: string = '';
// //   isPaymentDisabled: boolean = false;
// //   payWholeYear: boolean = false; // New property for whole year payment

// //   constructor(
// //     private maintenanceService: MaintenanceService,
// //     private router: Router,
// //     private http: HttpClient
// //   ) {}

// //   ngOnInit() {
// //     this.userEmail = localStorage.getItem('email');
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

// //   updateAmount() {
// //     if (this.payWholeYear) {
// //       this.amount = 60000; // 12 months × 5000
// //       this.month = 'Whole Year'; // Set month to indicate whole year payment
// //       this.checkPaymentStatus(); // Check if whole year payment is already made
// //     } else {
// //       this.amount = 5000; // Reset to default monthly amount
// //       this.month = ''; // Reset month selection
// //       this.checkOverallStatus(); // Check overall status
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
// //                                  response.status === 'Whole year maintenance paid' ||
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
// //                                  response.status === 'Whole year maintenance paid' ||
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
// //     if (!this.month && !this.payWholeYear) {
// //       alert('Please select a month or choose to pay for the whole year.');
// //       return;
// //     }

// //     const payment = {
// //       residentName: this.residentName,
// //       email: this.email,
// //       apartment: this.apartment,
// //       amount: this.amount,
// //       month: this.payWholeYear ? 'Whole Year' : this.month,
// //       paymentDate: new Date()
// //     };

// //     this.maintenanceService.submitPayment(payment).subscribe(
// //       (response) => {
// //         alert(response.message || `Payment of ${this.amount} for ${this.payWholeYear ? 'the whole year' : this.month} submitted successfully.`);
// //         this.checkPaymentStatus(); // Update status after payment
// //         this.month = ''; // Reset month selection
// //         this.payWholeYear = false; // Reset whole year checkbox
// //         this.amount = 5000; // Reset amount
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
//   payWholeYear: boolean = false;
//   paidMonths: string[] = []; // Track paid months

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
//           this.checkOverallStatus();
//         },
//         (error: HttpErrorResponse) => {
//           console.error('Failed to fetch resident details:', error);
//           alert('Error fetching resident details. Please try again.');
//           this.router.navigate(['/resident-login']);
//         }
//       );
//     } else {
//       alert('Please log in to continue.');
//       this.router.navigate(['/resident-login']);
//     }
//   }

//   updateAmount() {
//     if (this.payWholeYear) {
//       // Calculate remaining months (12 - number of paid months)
//       const remainingMonths = 12 - this.paidMonths.length;
//       this.amount = remainingMonths * 5000; // Amount for remaining months
//       this.month = 'Whole Year';
//       this.checkPaymentStatus();
//     } else {
//       this.amount = 5000; // Reset to default monthly amount
//       this.month = '';
//       this.checkOverallStatus();
//     }
//   }

//   checkPaymentStatus() {
//     if (this.month || this.payWholeYear) {
//       this.maintenanceService.checkPaymentStatus(this.email).subscribe(
//         (response) => {
//           this.paymentStatus = response.status;
//           this.paidMonths = response.paidMonths || []; // Store paid months
//           if (response.unpaidMonths) {
//             this.paymentStatus += `: ${response.unpaidMonths.join(', ')}`;
//           }

//           // Enable button for whole-year payment if status is "Up to date" or unpaid months exist
//           this.isPaymentDisabled = 
//             (response.status === 'Maintenance already paid for this resident for the selected month' && !this.payWholeYear) ||
//             response.status === 'All month maintenance paid' ||
//             response.status === 'Whole year maintenance paid';

//           // If whole year is selected, ensure button is enabled unless whole year is already paid
//           if (this.payWholeYear && response.status !== 'Whole year maintenance paid') {
//             this.isPaymentDisabled = false;
//             this.updateAmount(); // Recalculate amount based on paid months
//           }
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
//           this.paidMonths = response.paidMonths || []; // Store paid months
//           if (response.unpaidMonths) {
//             this.paymentStatus += `: ${response.unpaidMonths.join(', ')}`;
//           }

//           this.isPaymentDisabled = 
//             (response.status === 'Maintenance already paid for this resident for the selected month' && !this.payWholeYear) ||
//             response.status === 'All month maintenance paid' ||
//             response.status === 'Whole year maintenance paid';

//           // Enable button for whole-year payment if status is "Up to date"
//           if (this.payWholeYear && response.status === 'Up to date') {
//             this.isPaymentDisabled = false;
//             this.updateAmount();
//           }
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
//         this.checkPaymentStatus();
//         this.month = '';
//         this.payWholeYear = false;
//         this.amount = 5000;
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


//payuemnt gateway
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MaintenanceService } from '../../services/maintenance.service';

@Component({
  selector: 'app-add-maintenance',
  templateUrl: './add-maintenance.component.html',
  styleUrls: ['./add-maintenance.component.css']
})
export class AddMaintenanceComponent implements OnInit, OnDestroy {
  residentName: string = '';
  email: string = '';
  apartment: string = '';
  amount: number = 5000; // Default amount per month
  month: string = '';
  name: string = '';
  userEmail: string | null = '';
  paymentStatus: string = '';
  isPaymentDisabled: boolean = false;
  payWholeYear: boolean = false;
  paidMonths: string[] = [];
  currentDateTime: string = '';
  private intervalId: any;

  // Payment method fields
  paymentMethod: string = '';
  cardNumber: string = '';
  cardExpiry: string = '';
  cardCvc: string = '';
  upiId: string = '';
  errorMessage: string = '';
  isProcessing: boolean = false;

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
          this.checkOverallStatus();
        },
        (error: HttpErrorResponse) => {
          console.error('Failed to fetch resident details:', error);
          alert('Error fetching resident details. Please try again.');
          this.router.navigate(['/resident-login']);
        }
      );
    } else {
      alert('Please log in to continue.');
      this.router.navigate(['/resident-login']);
    }

    this.setCurrentDateTime();
  }

  setCurrentDateTime() {
    const updateTime = () => {
      const now = new Date();
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      };
      const timeFormatter = new Intl.DateTimeFormat('en-US', timeOptions);
      const timeParts = timeFormatter.formatToParts(now);
      const time = `${timeParts.find(part => part.type === 'hour')?.value}:${timeParts.find(part => part.type === 'minute')?.value} ${timeParts.find(part => part.type === 'dayPeriod')?.value}`;

      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'Asia/Kolkata'
      };
      const dateFormatter = new Intl.DateTimeFormat('en-US', dateOptions);
      const date = dateFormatter.format(now);

      this.currentDateTime = `${time} IST on ${date}`;
    };

    updateTime();
    this.intervalId = setInterval(updateTime, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  updateAmount() {
    if (this.paymentStatus === 'Whole year maintenance paid') {
      return;
    }

    if (this.payWholeYear) {
      const remainingMonths = 12 - this.paidMonths.length;
      this.amount = remainingMonths * 5000;
      this.month = 'Whole Year';
      this.checkPaymentStatus();
    } else {
      this.amount = 5000;
      this.month = '';
      this.checkOverallStatus();
    }
  }

  checkPaymentStatus() {
    if (this.month || this.payWholeYear) {
      this.maintenanceService.checkPaymentStatus(this.email).subscribe(
        (response) => {
          this.paymentStatus = response.status;
          this.paidMonths = response.paidMonths || [];
          if (response.unpaidMonths) {
            this.paymentStatus += `: ${response.unpaidMonths.join(', ')}`;
          }

          this.isPaymentDisabled = 
            (response.status === 'Maintenance already paid for this resident for the selected month' && !this.payWholeYear) ||
            response.status === 'All month maintenance paid' ||
            response.status === 'Whole year maintenance paid';

          if (this.payWholeYear && response.status !== 'Whole year maintenance paid') {
            this.isPaymentDisabled = false;
            this.updateAmount();
          }
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
          this.paidMonths = response.paidMonths || [];
          if (response.unpaidMonths) {
            this.paymentStatus += `: ${response.unpaidMonths.join(', ')}`;
          }

          this.isPaymentDisabled = 
            (response.status === 'Maintenance already paid for this resident for the selected month' && !this.payWholeYear) ||
            response.status === 'All month maintenance paid' ||
            response.status === 'Whole year maintenance paid';

          if (this.payWholeYear && response.status === 'Up to date') {
            this.isPaymentDisabled = false;
            this.updateAmount();
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Failed to check overall status:', error);
          this.paymentStatus = 'Error checking status';
        }
      );
    }
  }

  onPaymentMethodChange() {
    // Reset payment fields when method changes
    this.cardNumber = '';
    this.cardExpiry = '';
    this.cardCvc = '';
    this.upiId = '';
    this.errorMessage = '';
  }

  cancelPayment() {
    // Reset payment fields and method
    this.paymentMethod = '';
    this.cardNumber = '';
    this.cardExpiry = '';
    this.cardCvc = '';
    this.upiId = '';
    this.errorMessage = '';
  }

  payMaintenance() {
    if (!this.month && !this.payWholeYear) {
      this.errorMessage = 'Please select a month or choose to pay for the whole year.';
      return;
    }

    if (!this.paymentMethod) {
      this.errorMessage = 'Please select a payment method.';
      return;
    }

    // Validate payment method inputs
    if (this.paymentMethod === 'card') {
      if (!this.cardNumber || !this.cardExpiry || !this.cardCvc) {
        this.errorMessage = 'Please fill in all card details.';
        return;
      }

      if (!/^\d{16}$/.test(this.cardNumber.replace(/\s/g, ''))) {
        this.errorMessage = 'Invalid card number (must be 16 digits).';
        return;
      }

      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(this.cardExpiry)) {
        this.errorMessage = 'Invalid expiry date (use MM/YY format).';
        return;
      }

      if (!/^\d{3,4}$/.test(this.cardCvc)) {
        this.errorMessage = 'Invalid CVC (must be 3 or 4 digits).';
        return;
      }
    } else if (this.paymentMethod === 'phonepe' || this.paymentMethod === 'googlepay' || this.paymentMethod === 'paytm') {
      if (!this.upiId) {
        this.errorMessage = 'Please enter your UPI ID.';
        return;
      }

      if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+$/.test(this.upiId)) {
        this.errorMessage = 'Invalid UPI ID (e.g., user@upi).';
        return;
      }
    }

    this.isProcessing = true;
    this.errorMessage = '';

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
        this.checkPaymentStatus();
        this.month = '';
        this.payWholeYear = false;
        this.amount = 5000;
        this.paymentMethod = '';
        this.cardNumber = '';
        this.cardExpiry = '';
        this.cardCvc = '';
        this.upiId = '';
        this.isProcessing = false;
      },
      (error: HttpErrorResponse) => {
        console.error('Payment submission failed:', error);
        this.errorMessage = error.error.message || 'Payment submission failed. Please try again.';
        this.isProcessing = false;
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.href = '/resident-login';
  }
}