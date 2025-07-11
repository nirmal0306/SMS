import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-maintenance-list',
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.css']
})
export class MaintenanceListComponent implements OnInit {
  payments: any[] = [];
  totalAmount: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPayments();
  }

  fetchPayments() {
    this.http.get<any[]>('http://localhost:5000/maintenance/payments').subscribe(
      (data) => {
        this.payments = data;
        this.calculateTotal(); // Recalculate total after fetching
      },
      (error: HttpErrorResponse) => {
        console.error('Failed to fetch maintenance payments:', error);
        alert('Error fetching maintenance payments. Please try again.');
      }
    );
  }

  calculateTotal() {
    this.totalAmount = this.payments.reduce((sum, payment) => sum + (payment.amount || 0), 0);
  }

  deletePayment(payment: any) {
    if (confirm(`Are you sure you want to delete the payment for ${payment.residentName} for ${payment.month}?`)) {
      this.http.delete(`http://localhost:5000/maintenance/payment/${payment._id}`).subscribe(
        () => {
          this.payments = this.payments.filter(p => p._id !== payment._id);
          this.calculateTotal(); // Update total after deletion
          alert('Payment deleted successfully.');
        },
        (error: HttpErrorResponse) => {
          console.error('Failed to delete payment:', error);
          alert('Error deleting payment. Please try again.');
        }
      );
    }
  }

  logout() {
    window.location.href = '/admin-login';
  }
}
