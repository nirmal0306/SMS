import { Component, OnInit } from '@angular/core';
import { ParkingService } from 'src/app/services/parking.service';

@Component({
  selector: 'app-rejected-requests',
  templateUrl: './rejected-requests.component.html',
  styleUrls: ['./rejected-requests.component.css']
})
export class RejectedRequestsComponent implements OnInit {
  rejectedRequests: any[] = [];

  constructor(private parkingService: ParkingService) {}

  ngOnInit(): void {
    this.loadRejectedRequests();
  }

  loadRejectedRequests() {
    this.parkingService.getRejectedRequests().subscribe(
      (requests) => {
        this.rejectedRequests = requests;
      },
      (error) => {
        console.error('Error loading rejected requests', error);
      }
    );
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove token from storage
    window.location.href = '/admin-login'; // Redirect to login
  }
  
}
