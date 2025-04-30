import { Component, OnInit } from '@angular/core';
import { ParkingService } from 'src/app/services/parking.service';

@Component({
  selector: 'app-parking-slots',
  templateUrl: './parking-slots.component.html',
  styleUrls: ['./parking-slots.component.css']
})
export class ParkingSlotsComponent implements OnInit {
  parkingRequests: any[] = [];

  constructor(private parkingService: ParkingService) {}

  ngOnInit(): void {
    this.loadParkingRequests();
  }

  loadParkingRequests() {
    this.parkingService.getAllRequests().subscribe(
      (requests) => {
        this.parkingRequests = requests;
      },
      (error) => {
        console.error('Error loading parking requests', error);
      }
    );
  }

  approveRequest(id: string) {
    this.parkingService.approveRequest(id).subscribe(() => {
      alert('Parking request approved and moved to approved table.');
      this.loadParkingRequests();
    });
  }
  
  rejectRequest(id: string) {
    this.parkingService.rejectRequest(id).subscribe(() => {
      alert('Parking request rejected and moved to rejected table.');
      this.loadParkingRequests();
    });
  }
  
  logout(): void {
    localStorage.removeItem('token');
    window.location.href = '/resident-login';
  }
}
