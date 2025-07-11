// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { EventService, EventModel } from 'src/app/services/event.service';
// import { DatePipe } from '@angular/common';

// @Component({
//   selector: 'app-event-details',
//   templateUrl: './event-details.component.html',
//   styleUrls: ['./event-details.component.css'],
//   providers: [DatePipe]
// })
// export class EventDetailsComponent implements OnInit {
//   eventId!: string;
//   event: EventModel = { title: '', eventDate: new Date() };
//   eventForm: FormGroup;
//   updatedData: EventModel = { title: '', eventDate: new Date(), status: 'Upcoming' };
//   selectedFile: File | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private route: ActivatedRoute,
//     private eventService: EventService,
//     private router: Router,
//     private datePipe: DatePipe 
//   ) {
//     this.eventForm = this.fb.group({
//       title: ['', Validators.required],
//       description: [''],
//       eventDate: ['', Validators.required],
//       eventTime: [''],
//       location: [''],
//       organizedBy: [''],
//       contactInfo: [''],
//       eventType: [''],
//       registrationRequired: [false],
//       maxParticipants: [null],
//       posterImage: [''],
//       status: ['Upcoming', Validators.required]
//     });
//   }
//   ngOnInit() {
//     this.eventId = this.route.snapshot.params['id'];
//     this.eventService.getEventById(this.eventId).subscribe(event => {
//       if (event) {
//         this.event = event;
//         const validStatus: 'Upcoming' | 'Ongoing' | 'Completed' | undefined = 
//           event.status && ['Upcoming', 'Ongoing', 'Completed'].includes(event.status) 
//             ? event.status 
//             : 'Upcoming';
//         this.updatedData = { ...event, status: validStatus };
  
//         // Format the event date here
//         this.updatedData.eventDate = this.datePipe.transform(event.eventDate, 'yyyy-MM-dd') || '';
  
//         this.eventForm.patchValue(this.updatedData);
//       }
//     });
//   }
//   // ngOnInit() {
//   //   this.eventId = this.route.snapshot.params['id'];
//   //   this.eventService.getEventById(this.eventId).subscribe(event => {
//   //     if (event) {
//   //       this.event = event;
//   //       const validStatus: 'Upcoming' | 'Ongoing' | 'Completed' | undefined = 
//   //         event.status && ['Upcoming', 'Ongoing', 'Completed'].includes(event.status) 
//   //           ? event.status 
//   //           : 'Upcoming';
//   //       this.updatedData = { ...event, status: validStatus };
//   //       this.eventForm.patchValue(this.updatedData);
//   //     }
//   //   });
//   // }

//   onFileSelected(event: any) {
//     this.selectedFile = event.target.files[0];
//   }

//   updateEvent() {
//     if (this.eventForm.valid) {
//       const formData = new FormData();
//       Object.keys(this.eventForm.value).forEach(key => {
//         formData.append(key, this.eventForm.value[key]);
//       });
//       if (this.selectedFile) {
//         formData.append('posterImage', this.selectedFile);
//       }

//       this.eventService.updateEvent(this.eventId, formData).subscribe({
//         next: (response) => {
//           alert('Event updated successfully!');
//           this.router.navigate(['/events']);
//         },
//         error: (err) => {
//           console.error('Error updating event:', err);
//           alert('Something went wrong!');
//         }
//       });
//     }
//   }

//   deleteEvent() {
//     if (confirm('Are you sure you want to delete this event?')) {
//       this.eventService.deleteEvent(this.eventId).subscribe({
//         next: () => {
//           alert('Event deleted successfully!');
//           this.router.navigate(['/events-list']);
//         },
//         error: (err) => {
//           console.error('Error deleting event:', err);
//           alert('Something went wrong!');
//         }
//       });
//     }
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     window.location.href = '/admin-login';
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService, EventModel } from 'src/app/services/event.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
  providers: [DatePipe]
})
export class EventDetailsComponent implements OnInit {
  eventId!: string;
  event: EventModel = { title: '', eventDate: new Date() };
  eventForm: FormGroup;
  updatedData: EventModel = { title: '', eventDate: new Date(), status: 'Upcoming' };
  selectedFile: File | null = null;
  eventDateString: string = ''; // New property for the formatted date
  filePath: string | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private datePipe: DatePipe 
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      eventDate: ['', Validators.required],  // Event date should be a string here
      eventTime: [''],
      location: [''],
      organizedBy: [''],
      contactInfo: [''],
      eventType: [''],
      registrationRequired: [false],
      maxParticipants: [null],
      posterImage: [''],
      status: ['Upcoming', Validators.required]
    });
  }

  ngOnInit() {
    this.eventId = this.route.snapshot.params['id'];
    this.eventService.getEventById(this.eventId).subscribe(event => {
      if (event) {
        this.event = event;
        const validStatus: 'Upcoming' | 'Ongoing' | 'Completed' | undefined = 
          event.status && ['Upcoming', 'Ongoing', 'Completed'].includes(event.status) 
            ? event.status 
            : 'Upcoming';
        this.updatedData = { ...event, status: validStatus };

        // Format the event date here for input binding
        this.eventDateString = this.datePipe.transform(event.eventDate, 'yyyy-MM-dd') || '';

        // Patch the form with updated data
        this.eventForm.patchValue({
          ...this.updatedData,
          eventDate: this.eventDateString // Bind the formatted string to the form control
        });
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const file = event.target.files[0];
    if (file) {
      this.filePath = file.name; // This will hold the file name
      // If you need to use file path (only filename allowed in browser)
      console.log('File selected:', this.filePath);
    }
  }

  updateEvent() {
    if (this.eventForm.valid) {
      // Convert the event date string back to a Date object before submitting
      this.updatedData.eventDate = new Date(this.eventDateString);

      const formData = new FormData();
      Object.keys(this.eventForm.value).forEach(key => {
        formData.append(key, this.eventForm.value[key]);
      });
      if (this.selectedFile) {
        formData.append('posterImage', this.selectedFile);
      }

      this.eventService.updateEvent(this.eventId, formData).subscribe({
        next: (response) => {
          alert('Event updated successfully!');
          this.router.navigate(['/events']);
        },
        error: (err) => {
          console.error('Error updating event:', err);
          alert('Something went wrong!');
        }
      });
    }
  }

  deleteEvent() {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(this.eventId).subscribe({
        next: () => {
          alert('Event deleted successfully!');
          this.router.navigate(['/events']);
        },
        error: (err) => {
          console.error('Error deleting event:', err);
          alert('Something went wrong!');
        }
      });
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    window.location.href = '/admin-login';
  }
}
