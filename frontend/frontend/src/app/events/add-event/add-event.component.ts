import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  eventForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      eventDate: ['', Validators.required],
      eventTime: [''],
      location: [''],
      organizedBy: [''],
      contactInfo: [''],
      eventType: [''],
      registrationRequired: [false],
      maxParticipants: [null],
      status: ['Upcoming', Validators.required]
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const formData = new FormData();

      Object.keys(this.eventForm.value).forEach(key => {
        formData.append(key, this.eventForm.value[key]);
      });

      if (this.selectedFile) {
        formData.append('posterImage', this.selectedFile);
      }

      this.eventService.addEvent(formData).subscribe({
        next: () => {
          alert('Event added successfully!');
          this.router.navigate(['/events']);
        },
        error: (err) => {
          console.error('Error adding event:', err);
          alert('Failed to add event.');
        }
      });
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    window.location.href = '/admin-login';
  }
}