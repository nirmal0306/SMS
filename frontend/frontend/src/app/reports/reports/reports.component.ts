import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
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


  // Export to Excel functionality
  // exportToExcel(): void {
  //   const worksheet = XLSX.utils.json_to_sheet(this.payments);
  //   const workbook = { Sheets: { 'Payments': worksheet }, SheetNames: ['Payments'] };
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   this.saveAsExcelFile(excelBuffer, 'Maintenance_Report');
  // }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  exportToExcel(): void {
    // Clone the payments array to avoid mutating the original data
    const paymentsWithTotal = [...this.payments];
  
    // Add a summary row
    paymentsWithTotal.push({
      residentName: 'Total Maintenance Collected',
      email: '',
      apartment: '',
      amount: this.totalAmount,
      month: '',
      paymentDate: ''
    });
  
    const worksheet = XLSX.utils.json_to_sheet(paymentsWithTotal);
    const workbook = { Sheets: { 'Payments': worksheet }, SheetNames: ['Payments'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'Maintenance_Report');
  }
  

  logout() {
    window.location.href = '/admin-login';
  }
}

// Constants for Excel file type and extension
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

  

