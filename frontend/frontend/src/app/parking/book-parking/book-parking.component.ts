import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParkingService } from 'src/app/services/parking.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-parking',
  templateUrl: './book-parking.component.html',
  styleUrls: ['./book-parking.component.css']
})
export class BookParkingComponent implements OnInit {
  residentName: string = '';
  block: string = '';
  flatNo: string = '';
  apartment: string = '';
  email: string = '';
  image:string = '';;

  name: string = '';
  userEmail: string | null = '';

  blocks: string[] = [];     
  flatNos: string[] = [];    

  constructor(private parkingService: ParkingService, private router: Router, private http: HttpClient) {
    this.generateOptions();
  }

  requestStatus: string = '';
  parkingNumber: string = '';
  showForm: boolean = true;
  isRejected: boolean = false;
  rejectionCount: number = 0;
  showTooltip = false;



    ngOnInit(): void {
      this.userEmail = localStorage.getItem('email');
      if (this.userEmail) {
        this.http.get<any>(`http://localhost:5000/resident/${this.userEmail}`).subscribe(
          (residentData) => {
            this.name = residentData.name;
            this.residentName = residentData.name;
            this.email = residentData.email;
            this.apartment = residentData.apartment;
            this.image = residentData.image;
    
            const apartmentParts = residentData.apartment ? residentData.apartment.split('-') : [];
            if (apartmentParts.length === 2) {
              this.block = apartmentParts[0];
              this.flatNo = apartmentParts[1];
            }
    
            // ✅ Check if request is approved
            this.http.get<any>(`http://localhost:5000/parking/accepted/${this.userEmail}`).subscribe(
              (parkingData) => {
                if (parkingData && parkingData.parkingNumber) {
                  this.requestStatus = 'Accepted';
                  this.parkingNumber = parkingData.parkingNumber;
                  this.showForm = false;
                } else {
                  this.requestStatus = 'Pending or Rejected';
                  this.showForm = true;
                }
              },
              (error) => {
                this.requestStatus = 'Pending or Rejected';
                this.showForm = true;
                console.error('Error fetching accepted parking data:', error);
              }
            );
    
            // ✅ Fetch count of rejected requests
            this.http.get<any>(`http://localhost:5000/parking/rejected/${this.userEmail}`).subscribe(
              (rejections) => {
                this.rejectionCount = rejections.length;
                this.isRejected = this.rejectionCount > 1;
                console.log('Rejected Requests:', rejections);  // Debugging line to check response
                // this.isRejected = true;
                // alert("rejected");
              },
              (error) => {
                console.error('Error fetching rejected requests:', error);
                this.isRejected = false;
              }
            );
          },
          (error) => {
            console.error('Error fetching resident data:', error);
          }
        );
      }
    }
    
  
  generateOptions() {
    this.blocks = Array.from({ length: 10 }, (_, i) => String.fromCharCode(65 + i)); // A to J
    for (let floor = 1; floor <= 5; floor++) {
      for (let unit = 1; unit <= 6; unit++) {
        this.flatNos.push(`${floor}0${unit}`);
      }
    }
  }

  bookParking() {
    this.apartment = `Block: ${this.block}, Flat No: ${this.flatNo}`;

    const request = {
      residentName: this.residentName,
      apartment: this.apartment,
      email: this.email
    };

    this.parkingService.submitRequest(request).subscribe(() => {
      alert('Parking request sent to admin.');
      this.residentName = '';
      this.block = '';
      this.flatNo = '';
      this.apartment = '';
      this.email = '';
      this.router.navigate(['/after-login']);
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    window.location.href = '/resident-login';
  }
}
