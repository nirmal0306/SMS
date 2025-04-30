import { Component, OnInit } from '@angular/core';
import { ParkingService } from 'src/app/services/parking.service';

@Component({
  selector: 'app-accepted-requests',
  templateUrl: './accepted-requests.component.html',
  styleUrls: ['./accepted-requests.component.css']
})
export class AcceptedRequestsComponent implements OnInit {
  acceptedRequests: any[] = [];

  constructor(private parkingService: ParkingService) {}

  ngOnInit(): void {
    this.loadAcceptedRequests();
  }

  loadAcceptedRequests() {
    this.parkingService.getAcceptedRequests().subscribe(
      (requests) => {
        this.acceptedRequests = requests;
      },
      (error) => {
        console.error('Error loading accepted requests', error);
      }
    );
  }
  logout(): void {
    localStorage.removeItem('token'); // Remove token from storage
    window.location.href = '/admin-login'; // Redirect to login
  }
  
}
