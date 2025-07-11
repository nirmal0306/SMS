// // // // // import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
// // // // // import { HttpClient } from '@angular/common/http';
// // // // // import { Router } from '@angular/router';

// // // // // @Component({
// // // // //   selector: 'app-visitor-login',
// // // // //   templateUrl: './visitor-login.component.html',
// // // // //   styleUrls: ['./visitor-login.component.css']
// // // // // })
// // // // // export class VisitorLoginComponent implements OnInit {
// // // // //   userData = { name: '', email: '' };
// // // // //   selectedFile: File | null = null;
// // // // //   capturedImageUrl: string = '';

// // // // //   @ViewChild('video') video!: ElementRef;
// // // // //   @ViewChild('canvas') canvas!: ElementRef;

// // // // //   constructor(private http: HttpClient, private router: Router) {}

// // // // //   ngOnInit() {
// // // // //     navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
// // // // //       this.video.nativeElement.srcObject = stream;
// // // // //     });
// // // // //   }

// // // // //   capture() {
// // // // //     const canvasEl = this.canvas.nativeElement;
// // // // //     const context = canvasEl.getContext('2d');

// // // // //     context.save();
// // // // //     context.translate(canvasEl.width, 0);
// // // // //     context.scale(-1, 1);
// // // // //     context.drawImage(this.video.nativeElement, 0, 0, canvasEl.width, canvasEl.height);
// // // // //     context.restore();

// // // // //     canvasEl.toBlob((blob: Blob) => {
// // // // //       this.selectedFile = new File([blob], 'login-photo.jpg', { type: 'image/jpeg' });

// // // // //       // Show preview
// // // // //       const reader = new FileReader();
// // // // //       reader.onload = () => {
// // // // //         this.capturedImageUrl = reader.result as string;
// // // // //       };
// // // // //       reader.readAsDataURL(this.selectedFile);
// // // // //     }, 'image/jpeg');
// // // // //   }

// // // // //   onLogin() {
// // // // //     if (!this.userData.name || !this.userData.email) {
// // // // //       alert('Please fill in all required fields.');
// // // // //       return;
// // // // //     }
// // // // //     if (!this.userData.email.includes('@') || !this.userData.email.includes('.')) {
// // // // //       alert('Please enter a valid email address.');
// // // // //       return;
// // // // //     }
// // // // //     if (!this.selectedFile) {
// // // // //       alert('Please capture a photo before logging in.');
// // // // //       return;
// // // // //     }
  
// // // // //     const formData = new FormData();
// // // // //     formData.append('name', this.userData.name);
// // // // //     formData.append('email', this.userData.email);
// // // // //     formData.append('image', this.selectedFile);
  
// // // // //     this.http.post<any>('http://localhost:5000/visitorLogin', formData).subscribe(
// // // // //       (response) => {
// // // // //         if (response.token) {
// // // // //           localStorage.setItem('token', response.token);
// // // // //           localStorage.setItem('name', this.userData.name);
// // // // //           this.router.navigate(['/visitor-home']);
// // // // //         } else {
// // // // //           alert('Login failed.');
// // // // //         }
// // // // //       },
// // // // //       error => {
// // // // //         console.error('Login error:', error);
// // // // //         alert('Login failed. Please check credentials or try again.');
// // // // //       }
// // // // //     );
// // // // //   }
// // // // // }


// // // // // import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
// // // // // import { HttpClient } from '@angular/common/http';
// // // // // import { Router } from '@angular/router';
// // // // // import * as faceapi from 'face-api.js';

// // // // // @Component({
// // // // //   selector: 'app-visitor-login',
// // // // //   templateUrl: './visitor-login.component.html',
// // // // //   styleUrls: ['./visitor-login.component.css']
// // // // // })
// // // // // export class VisitorLoginComponent implements OnInit {
// // // // //   userData = { name: '', email: '' };
// // // // //   selectedFile: File | null = null;
// // // // //   capturedImageUrl: string = '';
// // // // //   faceDetected: boolean = false;

// // // // //   @ViewChild('video') video!: ElementRef;
// // // // //   @ViewChild('canvas') canvas!: ElementRef;

// // // // //   constructor(private http: HttpClient, private router: Router) {}

// // // // //   async ngOnInit() {
// // // // //     await this.loadModels();
// // // // //     navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
// // // // //       this.video.nativeElement.srcObject = stream;
// // // // //     });
// // // // //   }

// // // // //   async loadModels() {
// // // // //     const MODEL_URL = '/assets/models';
// // // // //     await Promise.all([
// // // // //       faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
// // // // //       faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
// // // // //       faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
// // // // //     ]);
// // // // //   }

// // // // //   async capture() {
// // // // //     const canvasEl = this.canvas.nativeElement;
// // // // //     const context = canvasEl.getContext('2d');

// // // // //     context.save();
// // // // //     context.translate(canvasEl.width, 0);
// // // // //     context.scale(-1, 1);
// // // // //     context.drawImage(this.video.nativeElement, 0, 0, canvasEl.width, canvasEl.height);
// // // // //     context.restore();

// // // // //     const detection = await faceapi.detectSingleFace(canvasEl, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();

// // // // //     if (!detection) {
// // // // //       alert('No face detected. Please try again.');
// // // // //       this.faceDetected = false;
// // // // //       return;
// // // // //     }

// // // // //     this.faceDetected = true;

// // // // //     canvasEl.toBlob((blob: Blob) => {
// // // // //       this.selectedFile = new File([blob], 'login-photo.jpg', { type: 'image/jpeg' });

// // // // //       const reader = new FileReader();
// // // // //       reader.onload = () => {
// // // // //         this.capturedImageUrl = reader.result as string;
// // // // //       };
// // // // //       reader.readAsDataURL(this.selectedFile);
// // // // //     }, 'image/jpeg');
// // // // //   }

// // // // //   onLogin() {
// // // // //     if (!this.userData.name || !this.userData.email) {
// // // // //       alert('Please fill in all required fields.');
// // // // //       return;
// // // // //     }
// // // // //     if (!this.userData.email.includes('@') || !this.userData.email.includes('.')) {
// // // // //       alert('Please enter a valid email address.');
// // // // //       return;
// // // // //     }
// // // // //     if (!this.selectedFile) {
// // // // //       alert('Please capture a photo before logging in.');
// // // // //       return;
// // // // //     }
// // // // //     if (!this.faceDetected) {
// // // // //       alert('No face detected in the captured photo.');
// // // // //       return;
// // // // //     }

// // // // //     const formData = new FormData();
// // // // //     formData.append('name', this.userData.name);
// // // // //     formData.append('email', this.userData.email);
// // // // //     formData.append('image', this.selectedFile);

// // // // //     this.http.post<any>('http://localhost:5000/visitorLogin', formData).subscribe(
// // // // //       (response) => {
// // // // //         if (response.token) {
// // // // //           localStorage.setItem('token', response.token);
// // // // //           localStorage.setItem('name', this.userData.name);
// // // // //           this.router.navigate(['/visitor-home']);
// // // // //         } else {
// // // // //           alert('Login failed.');
// // // // //         }
// // // // //       },
// // // // //       error => {
// // // // //         console.error('Login error:', error);
// // // // //         alert('Login failed. Please check credentials or try again.');
// // // // //       }
// // // // //     );
// // // // //   }
// // // // // }


// // // // // import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
// // // // // import { HttpClient } from '@angular/common/http';
// // // // // import { Router } from '@angular/router';
// // // // // import * as faceapi from 'face-api.js';

// // // // // @Component({
// // // // //   selector: 'app-visitor-login',
// // // // //   templateUrl: './visitor-login.component.html',
// // // // //   styleUrls: ['./visitor-login.component.css']
// // // // // })
// // // // // export class VisitorLoginComponent implements OnInit {
// // // // //   userData = { name: '', email: '' };
// // // // //   selectedFile: File | null = null;
// // // // //   capturedImageUrl: string = '';
// // // // //   faceDetected: boolean = false;

// // // // //   @ViewChild('video') video!: ElementRef;
// // // // //   @ViewChild('canvas') canvas!: ElementRef;

// // // // //   constructor(private http: HttpClient, private router: Router) {}

// // // // //   async ngOnInit() {
// // // // //     await this.loadModels();
// // // // //     navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
// // // // //       this.video.nativeElement.srcObject = stream;
// // // // //     });
// // // // //   }

// // // // //   // Load the face-api.js models
// // // // //   async loadModels() {
// // // // //     const MODEL_URL = '/assets/models'; // Adjust to where your models are stored
// // // // //     await Promise.all([
// // // // //       faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
// // // // //       faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
// // // // //       faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
// // // // //     ]);
// // // // //   }

// // // // //   // Capture image from the video feed
// // // // //   async capture() {
// // // // //     const canvasEl = this.canvas.nativeElement;
// // // // //     const context = canvasEl.getContext('2d');

// // // // //     context.save();
// // // // //     context.translate(canvasEl.width, 0);
// // // // //     context.scale(-1, 1);
// // // // //     context.drawImage(this.video.nativeElement, 0, 0, canvasEl.width, canvasEl.height);
// // // // //     context.restore();

// // // // //     // Detect face from the canvas
// // // // //     const detection = await faceapi.detectSingleFace(canvasEl, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();

// // // // //     if (!detection) {
// // // // //       alert('No face detected. Please try again.');
// // // // //       this.faceDetected = false;
// // // // //       return;
// // // // //     }

// // // // //     this.faceDetected = true;

// // // // //     // Create the photo file and convert it to a base64 string
// // // // //     canvasEl.toBlob((blob: Blob) => {
// // // // //       this.selectedFile = new File([blob], 'login-photo.jpg', { type: 'image/jpeg' });

// // // // //       const reader = new FileReader();
// // // // //       reader.onload = () => {
// // // // //         this.capturedImageUrl = reader.result as string;
// // // // //       };
// // // // //       reader.readAsDataURL(this.selectedFile);
// // // // //     }, 'image/jpeg');
// // // // //   }

// // // // //   // Handle form submission (login)
// // // // //   // onLogin() {
// // // // //   //   if (!this.userData.name || !this.userData.email) {
// // // // //   //     alert('Please fill in all required fields.');
// // // // //   //     return;
// // // // //   //   }

// // // // //   //   if (!this.userData.email.includes('@') || !this.userData.email.includes('.')) {
// // // // //   //     alert('Please enter a valid email address.');
// // // // //   //     return;
// // // // //   //   }

// // // // //   //   if (!this.selectedFile) {
// // // // //   //     alert('Please capture a photo before logging in.');
// // // // //   //     return;
// // // // //   //   }

// // // // //   //   if (!this.faceDetected) {
// // // // //   //     alert('No face detected in the captured photo.');
// // // // //   //     return;
// // // // //   //   }

// // // // //   //   const formData = new FormData();
// // // // //   //   formData.append('name', this.userData.name);
// // // // //   //   formData.append('email', this.userData.email);
// // // // //   //   formData.append('image', this.selectedFile);

// // // // //   //   this.http.post<any>('http://localhost:5000/visitorLogin', formData).subscribe(
// // // // //   //     (response) => {
// // // // //   //       if (response.token) {
// // // // //   //         localStorage.setItem('token', response.token);
// // // // //   //         localStorage.setItem('name', this.userData.name);
// // // // //   //         this.router.navigate(['/visitor-home']);
// // // // //   //       } else {
// // // // //   //         alert('Login failed.');
// // // // //   //       }
// // // // //   //     },
// // // // //   //     error => {
// // // // //   //       console.error('Login error:', error);
// // // // //   //       alert('Login failed. Please check credentials or try again.');
// // // // //   //     }
// // // // //   //   );
// // // // //   // }
// // // // //   onLogin() {
// // // // //   if (!this.userData.name || !this.userData.email) {
// // // // //     alert('Please fill in all required fields.');
// // // // //     return;
// // // // //   }
// // // // //   if (!this.userData.email.includes('@') || !this.userData.email.includes('.')) {
// // // // //     alert('Please enter a valid email address.');
// // // // //     return;
// // // // //   }
// // // // //   if (!this.selectedFile) {
// // // // //     alert('Please capture a photo before logging in.');
// // // // //     return;
// // // // //   }
// // // // //   if (!this.faceDetected) {
// // // // //     alert('No face detected in the captured photo.');
// // // // //     return;
// // // // //   }

// // // // //   // Log the form data before sending to backend
// // // // //   console.log('Form Data:', this.userData, this.selectedFile);

// // // // //   const formData = new FormData();
// // // // //   formData.append('name', this.userData.name);
// // // // //   formData.append('email', this.userData.email);
// // // // //   formData.append('image', this.selectedFile);

// // // // //   this.http.post<any>('http://localhost:5000/visitorLogin', formData).subscribe(
// // // // //     (response) => {
// // // // //       if (response.token) {
// // // // //         localStorage.setItem('token', response.token);
// // // // //         localStorage.setItem('name', this.userData.name);
// // // // //         this.router.navigate(['/visitor-home']);
// // // // //       } else {
// // // // //         alert('Login failed.');
// // // // //       }
// // // // //     },
// // // // //     error => {
// // // // //       console.error('Login error:', error);
// // // // //       alert('Login failed. Please check credentials or try again.');
// // // // //     }
// // // // //   );
// // // // // }

// // // // // }



// // // // import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
// // // // import { HttpClient } from '@angular/common/http';
// // // // import { Router } from '@angular/router';
// // // // import * as faceapi from 'face-api.js';

// // // // @Component({
// // // //   selector: 'app-visitor-login',
// // // //   templateUrl: './visitor-login.component.html',
// // // //   styleUrls: ['./visitor-login.component.css']
// // // // })
// // // // export class VisitorLoginComponent implements OnInit {
// // // //   userData = { name: '', email: '' };
// // // //   selectedFile: File | null = null;
// // // //   capturedImageUrl: string = '';
// // // //   faceDetected: boolean = false;

// // // //   @ViewChild('video') video!: ElementRef;
// // // //   @ViewChild('canvas') canvas!: ElementRef;

// // // //   constructor(private http: HttpClient, private router: Router) {}

// // // //   async ngOnInit() {
// // // //     await this.loadModels();
// // // //     navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
// // // //       this.video.nativeElement.srcObject = stream;
// // // //     });
// // // //   }

// // // //   // Load the face-api.js models
// // // //   async loadModels() {
// // // //     const MODEL_URL = '/assets/models'; // Adjust to where your models are stored
// // // //     await Promise.all([
// // // //       faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
// // // //       faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
// // // //       faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
// // // //     ]).catch((err) => {
// // // //       console.error('Error loading models:', err);
// // // //       alert('Error loading face detection models. Please try again later.');
// // // //     });
// // // //   }

// // // //   // Capture image from the video feed
// // // //   async capture() {
// // // //     const canvasEl = this.canvas.nativeElement;
// // // //     const context = canvasEl.getContext('2d');

// // // //     // Set canvas size to match video size
// // // //     canvasEl.width = this.video.nativeElement.videoWidth;
// // // //     canvasEl.height = this.video.nativeElement.videoHeight;

// // // //     // Draw the mirrored video frame to the canvas
// // // //     context.save();
// // // //     context.translate(canvasEl.width, 0);
// // // //     context.scale(-1, 1);
// // // //     context.drawImage(this.video.nativeElement, 0, 0, canvasEl.width, canvasEl.height);
// // // //     context.restore();

// // // //     // Detect face from the canvas
// // // //     const detection = await faceapi.detectSingleFace(canvasEl, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();

// // // //     if (!detection) {
// // // //       alert('No face detected. Please try again.');
// // // //       this.faceDetected = false;
// // // //       return;
// // // //     }

// // // //     this.faceDetected = true;

// // // //     // Create the photo file and convert it to a base64 string
// // // //     canvasEl.toBlob((blob: Blob) => {
// // // //       this.selectedFile = new File([blob], 'login-photo.jpg', { type: 'image/jpeg' });

// // // //       const reader = new FileReader();
// // // //       reader.onload = () => {
// // // //         this.capturedImageUrl = reader.result as string;
// // // //       };
// // // //       reader.readAsDataURL(this.selectedFile);
// // // //     }, 'image/jpeg');
// // // //   }

// // // //   // Handle form submission (login)
// // // //   onLogin() {
// // // //     if (!this.userData.name || !this.userData.email) {
// // // //       alert('Please fill in all required fields.');
// // // //       return;
// // // //     }
// // // //     if (!this.userData.email.includes('@') || !this.userData.email.includes('.')) {
// // // //       alert('Please enter a valid email address.');
// // // //       return;
// // // //     }
// // // //     if (!this.selectedFile) {
// // // //       alert('Please capture a photo before logging in.');
// // // //       return;
// // // //     }
// // // //     if (!this.faceDetected) {
// // // //       alert('No face detected in the captured photo.');
// // // //       return;
// // // //     }

// // // //     const formData = new FormData();
// // // //     formData.append('name', this.userData.name);
// // // //     formData.append('email', this.userData.email);
// // // //     formData.append('image', this.selectedFile);

// // // //     this.http.post<any>('http://localhost:5000/visitorLogin', formData).subscribe(
// // // //       (response) => {
// // // //         if (response.token) {
// // // //           localStorage.setItem('token', response.token);
// // // //           localStorage.setItem('name', this.userData.name);
// // // //           this.router.navigate(['/visitor-home']);
// // // //         } else {
// // // //           alert('Login failed.');
// // // //         }
// // // //       },
// // // //       error => {
// // // //         console.error('Login error:', error);
// // // //         alert('Login failed. Please check credentials or try again.');
// // // //       }
// // // //     );
// // // //   }
// // // // }



// // // // import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
// // // // import { HttpClient } from '@angular/common/http';
// // // // import { Router } from '@angular/router';
// // // // import * as faceapi from 'face-api.js';

// // // // @Component({
// // // //   selector: 'app-visitor-login',
// // // //   templateUrl: './visitor-login.component.html',
// // // //   styleUrls: ['./visitor-login.component.css']
// // // // })
// // // // export class VisitorLoginComponent implements OnInit {
// // // //   userData = { name: '', email: '' };
// // // //   selectedFile: File | null = null;
// // // //   capturedImageUrl: string = '';
// // // //   faceDetected: boolean = false;

// // // //   @ViewChild('video') video!: ElementRef;
// // // //   @ViewChild('canvas') canvas!: ElementRef;

// // // //   constructor(private http: HttpClient, private router: Router) {}

// // // //   async ngOnInit() {
// // // //     await this.loadModels();
// // // //     navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
// // // //       this.video.nativeElement.srcObject = stream;
// // // //     });
// // // //   }

// // // //   // Load the face-api.js models
// // // //   async loadModels() {
// // // //     const MODEL_URL = '/assets/models'; // Ensure models are in the correct path
// // // //     // await Promise.all([
// // // //     //   faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
// // // //     //   faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
// // // //     //   faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
// // // //     // ]);
// // // //     await Promise.all([
// // // //   faceapi.nets.tinyFaceDetector.loadFromUri('/assets/models'),
// // // //   faceapi.nets.faceRecognitionNet.loadFromUri('/assets/models'),
// // // //   faceapi.nets.faceLandmark68Net.loadFromUri('/assets/models')
// // // // ]);

// // // //     console.log("Models loaded successfully");
// // // //     alert("Models loaded successfully");
// // // //   }

// // // //   // Capture image from the video feed
// // // //   async capture() {
// // // //     const canvasEl = this.canvas.nativeElement;
// // // //     const context = canvasEl.getContext('2d');

// // // //     if (!context) {
// // // //       alert('Failed to get canvas context.');
// // // //       return;
// // // //     }

// // // //     // Save the current canvas state
// // // //     context.save();
// // // //     context.translate(canvasEl.width, 0);
// // // //     context.scale(-1, 1); // Flip horizontally for mirror effect
// // // //     context.drawImage(this.video.nativeElement, 0, 0, canvasEl.width, canvasEl.height);
// // // //     context.restore();

// // // //     // Detect face from the canvas
// // // //     const detection = await faceapi.detectSingleFace(canvasEl, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();

// // // //     if (!detection) {
// // // //       alert('No face detected. Please try again.');
// // // //       this.faceDetected = false;
// // // //       return;
// // // //     }

// // // //     this.faceDetected = true;

// // // //     // Create the photo file and convert it to a base64 string
// // // //     canvasEl.toBlob((blob: Blob) => {
// // // //       this.selectedFile = new File([blob], 'login-photo.jpg', { type: 'image/jpeg' });

// // // //       const reader = new FileReader();
// // // //       reader.onload = () => {
// // // //         this.capturedImageUrl = reader.result as string;
// // // //       };
// // // //       reader.readAsDataURL(this.selectedFile);
// // // //     }, 'image/jpeg');
// // // //   }

// // // //   // Handle form submission (login)
// // // //   onLogin() {
// // // //     if (!this.userData.name || !this.userData.email) {
// // // //       alert('Please fill in all required fields.');
// // // //       return;
// // // //     }

// // // //     if (!this.userData.email.includes('@') || !this.userData.email.includes('.')) {
// // // //       alert('Please enter a valid email address.');
// // // //       return;
// // // //     }

// // // //     if (!this.selectedFile) {
// // // //       alert('Please capture a photo before logging in.');
// // // //       return;
// // // //     }

// // // //     if (!this.faceDetected) {
// // // //       alert('No face detected in the captured photo.');
// // // //       return;
// // // //     }

// // // //     // Log the form data before sending to backend
// // // //     console.log('Form Data:', this.userData, this.selectedFile);

// // // //     const formData = new FormData();
// // // //     formData.append('name', this.userData.name);
// // // //     formData.append('email', this.userData.email);
// // // //     formData.append('image', this.selectedFile);
// // // //     console.log(this.userData.name);
// // // //     console.log(this.userData.email);
// // // //     console.log(this.capturedImageUrl);
// // // //     alert(this.userData.name);
// // // //     alert(this.userData.email);
// // // //     alert(this.selectedFile);


// // // //     this.http.post<any>('http://localhost:5000/visitorLogin', formData).subscribe(
// // // //       (response) => {
// // // //         if (response.token) {
// // // //           localStorage.setItem('token', response.token);
// // // //           localStorage.setItem('name', this.userData.name);
// // // //           this.router.navigate(['/visitor-home']);
// // // //         } else {
// // // //           alert('Login failed.');
// // // //         }
// // // //       },
// // // //       error => {
// // // //         console.error('Login error:', error);
// // // //         alert('Login failed. Please check credentials or try again.');
// // // //       }
// // // //     );
// // // //   }
// // // // }


// // // import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
// // // import { HttpClient } from '@angular/common/http';
// // // import { Router } from '@angular/router';
// // // import * as faceapi from 'face-api.js';

// // // @Component({
// // //   selector: 'app-visitor-login',
// // //   templateUrl: './visitor-login.component.html',
// // //   styleUrls: ['./visitor-login.component.css']
// // // })
// // // export class VisitorLoginComponent implements OnInit {
// // //   userData = { name: '', email: '' };
// // //   selectedFile: File | null = null;
// // //   capturedImageUrl: string = '';
// // //   faceDetected: boolean = false;

// // //   @ViewChild('video') video!: ElementRef;
// // //   @ViewChild('canvas') canvas!: ElementRef;

// // //   constructor(private http: HttpClient, private router: Router) {}

// // //   async ngOnInit() {
// // //     await this.loadModels();
// // //     navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
// // //       this.video.nativeElement.srcObject = stream;
// // //     });
// // //   }

// // //   async loadModels() {
// // //     const MODEL_URL = '/assets/models';
// // //     await Promise.all([
// // //       faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
// // //       faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
// // //       faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
// // //     ]);
// // //     console.log("Models loaded successfully");
// // //     alert("Models loaded successfully");
// // //   }

// // //   async capture() {
// // //     const canvasEl = this.canvas.nativeElement;
// // //     const context = canvasEl.getContext('2d');

// // //     if (!context) {
// // //       alert('Failed to get canvas context.');
// // //       return;
// // //     }

// // //     // Set canvas size to match video dimensions
// // //     canvasEl.width = this.video.nativeElement.videoWidth;
// // //     canvasEl.height = this.video.nativeElement.videoHeight;

// // //     // Mirror the video and draw on canvas
// // //     context.save();
// // //     context.translate(canvasEl.width, 0);
// // //     context.scale(-1, 1); 
// // //     context.drawImage(this.video.nativeElement, 0, 0, canvasEl.width, canvasEl.height);
// // //     context.restore();

// // //     // Detect face
// // //     const detection = await faceapi
// // //       .detectSingleFace(canvasEl, new faceapi.TinyFaceDetectorOptions())
// // //       .withFaceLandmarks()
// // //       .withFaceDescriptor();

// // //     if (!detection) {
// // //       alert('No face detected. Please try again.');
// // //       this.faceDetected = false;
// // //       return;
// // //     }

// // //     this.faceDetected = true;

// // //     // Convert canvas to blob and prepare image
// // //     canvasEl.toBlob((blob: Blob) => {
// // //       this.selectedFile = new File([blob], 'login-photo.jpg', { type: 'image/jpeg' });

// // //       const reader = new FileReader();
// // //       reader.onload = () => {
// // //         this.capturedImageUrl = reader.result as string;
// // //         this.logImageToConsole(this.capturedImageUrl); // Show image in console
// // //       };
// // //       reader.readAsDataURL(this.selectedFile);
// // //     }, 'image/jpeg');
// // //   }

// // // onLogin() {
// // //     if (!this.userData.name || !this.userData.email) {
// // //       alert('Please fill in all required fields.');
// // //       return;
// // //     }

// // //     if (!this.userData.email.includes('@') || !this.userData.email.includes('.')) {
// // //       alert('Please enter a valid email address.');
// // //       return;
// // //     }

// // //     if (!this.selectedFile) {
// // //       alert('Please capture a photo before logging in.');
// // //       return;
// // //     }

// // //     if (!this.faceDetected) {
// // //       alert('No face detected in the captured photo.');
// // //       return;
// // //     }

// // //     console.log('Form Data:', this.userData, this.selectedFile);

// // //     const formData = new FormData();
// // //     formData.append('name', this.userData.name);
// // //     formData.append('email', this.userData.email);
// // //     formData.append('image', this.selectedFile);  // Sending captured image

// // //     this.http.post<any>('http://localhost:5000/visitorLogin', formData).subscribe(
// // //       (response) => {
// // //         if (response.token) {
// // //           localStorage.setItem('token', response.token);
// // //           localStorage.setItem('name', this.userData.name);
// // //           this.router.navigate(['/visitor-home']);
// // //         } else {
// // //           alert('Login failed.');
// // //         }
// // //       },
// // //       error => {
// // //         console.error('Login error:', error);
// // //         alert('Login failed. Please check credentials or try again.');
// // //       }
// // //     );
// // //   }

// // //   // onLogin() {
// // //   //   if (!this.userData.name || !this.userData.email) {
// // //   //     alert('Please fill in all required fields.');
// // //   //     return;
// // //   //   }

// // //   //   if (!this.userData.email.includes('@') || !this.userData.email.includes('.')) {
// // //   //     alert('Please enter a valid email address.');
// // //   //     return;
// // //   //   }

// // //   //   if (!this.selectedFile) {
// // //   //     alert('Please capture a photo before logging in.');
// // //   //     return;
// // //   //   }

// // //   //   if (!this.faceDetected) {
// // //   //     alert('No face detected in the captured photo.');
// // //   //     return;
// // //   //   }

// // //   //   console.log('Form Data:', this.userData, this.selectedFile);

// // //   //   const formData = new FormData();
// // //   //   formData.append('name', this.userData.name);
// // //   //   formData.append('email', this.userData.email);
// // //   //   formData.append('image', this.selectedFile);
// // //   //   console.log(this.userData.name);
// // //   //   console.log(this.userData.email);

// // //   //   this.http.post<any>('http://localhost:5000/visitorLogin', formData).subscribe(
// // //   //     (response) => {
// // //   //       if (response.token) {
// // //   //         localStorage.setItem('token', response.token);
// // //   //         localStorage.setItem('name', this.userData.name);
// // //   //         this.router.navigate(['/visitor-home']);
// // //   //       } else {
// // //   //         alert('Login failed.');
// // //   //       }
// // //   //     },
// // //   //     error => {
// // //   //       console.error('Login error:', error);
// // //   //       alert('Login failed. Please check credentials or try again.');
// // //   //     }
// // //   //   );
// // //   // }
// // //   logImageToConsole(base64Image: string) {
// // //     const style = [
// // //       'font-size: 1px;',
// // //       'padding: 100px 200px;',
// // //       `background: url(${base64Image}) no-repeat center center;`,
// // //       'background-size: contain;',
// // //       'color: transparent;'
// // //     ].join(' ');

// // //     console.log('%c     ', style);
// // //   }
// // // }



// // //newww
// // // import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
// // // import { HttpClient } from '@angular/common/http';
// // // import { Router } from '@angular/router';
// // // import * as faceapi from 'face-api.js';

// // // @Component({
// // //   selector: 'app-visitor-login',
// // //   templateUrl: './visitor-login.component.html',
// // //   styleUrls: ['./visitor-login.component.css']
// // // })
// // // export class VisitorLoginComponent implements OnInit {
// // //   userData = { name: '', email: '' };
// // //   selectedFile: File | null = null;
// // //   capturedImageUrl: string = '';
// // //   faceDetected: boolean = false;

// // //   @ViewChild('video') video!: ElementRef;
// // //   @ViewChild('canvas') canvas!: ElementRef;

// // //   constructor(private http: HttpClient, private router: Router) {}

// // //   async ngOnInit() {
// // //     await this.loadModels();
// // //     navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
// // //       this.video.nativeElement.srcObject = stream;
// // //     });
// // //   }

// // //   async loadModels() {
// // //     const MODEL_URL = '/assets/models';
// // //     await Promise.all([
// // //       faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
// // //       faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
// // //       faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
// // //     ]);
// // //     console.log("Models loaded successfully");
// // //   }

// // //   async capture() {
// // //     const canvasEl = this.canvas.nativeElement;
// // //     const context = canvasEl.getContext('2d');

// // //     if (!context) {
// // //       alert('Failed to get canvas context.');
// // //       return;
// // //     }

// // //     // Set canvas size to match video dimensions
// // //     canvasEl.width = this.video.nativeElement.videoWidth;
// // //     canvasEl.height = this.video.nativeElement.videoHeight;

// // //     // Mirror the video and draw on canvas
// // //     context.save();
// // //     context.translate(canvasEl.width, 0);
// // //     context.scale(-1, 1); 
// // //     context.drawImage(this.video.nativeElement, 0, 0, canvasEl.width, canvasEl.height);
// // //     context.restore();

// // //     // Detect face
// // //     const detection = await faceapi
// // //       .detectSingleFace(canvasEl, new faceapi.TinyFaceDetectorOptions())
// // //       .withFaceLandmarks()
// // //       .withFaceDescriptor();

// // //     if (!detection) {
// // //       alert('No face detected. Please try again.');
// // //       this.faceDetected = false;
// // //       return;
// // //     }

// // //     this.faceDetected = true;

// // //     // Convert canvas to blob and prepare image
// // //     canvasEl.toBlob((blob: Blob) => {
// // //       this.selectedFile = new File([blob], 'login-photo.jpg', { type: 'image/jpeg' });

// // //       const reader = new FileReader();
// // //       reader.onload = () => {
// // //         this.capturedImageUrl = reader.result as string;
// // //         this.logImageToConsole(this.capturedImageUrl); // Show image in console
// // //       };
// // //       reader.readAsDataURL(this.selectedFile);
// // //     }, 'image/jpeg');
// // //   }

// // //   onLogin() {
// // //     if (!this.userData.name || !this.userData.email) {
// // //       alert('Please fill in all required fields.');
// // //       return;
// // //     }

// // //     if (!this.userData.email.includes('@') || !this.userData.email.includes('.')) {
// // //       alert('Please enter a valid email address.');
// // //       return;
// // //     }

// // //     if (!this.selectedFile) {
// // //       alert('Please capture a photo before logging in.');
// // //       return;
// // //     }

// // //     if (!this.faceDetected) {
// // //       alert('No face detected in the captured photo.');
// // //       return;
// // //     }

// // //     console.log('Form Data:', this.userData, this.selectedFile);

// // //     // Fetch the visitor details by email from the backend
// // //     this.http.get<any>(`http://localhost:5000/visitor/${this.userData.email}`).subscribe(
// // //       (visitorData) => {
// // //         // alert('hyy');
// // //         if (visitorData) {
// // //           console.log('Fetched Visitor Data:', visitorData);
// // //           // Compare the images
// // //           this.compareImages(visitorData.image, this.capturedImageUrl);
// // //         } else {
// // //           alert('Visitor not found.');
// // //         }
// // //       },
// // //       (error) => {
// // //         console.error('Error fetching visitor data:', error);
// // //         alert('Error fetching visitor data.');
// // //       }
// // //     );
// // //   }

// // //   // Function to compare the images
// // //   compareImages(storedImageUrl: string, capturedImageUrl: string) {
// // //     if (storedImageUrl === capturedImageUrl) {
// // //       console.log('Images match!');
// // //       alert('Login successful!');
// // //       // Proceed with login logic (e.g., generate token, redirect, etc.)
// // //     } else {
// // //       console.log('Images do not match!');
// // //       alert('Login failed. Image mismatch.');
// // //     }
// // //   }

// // //   logImageToConsole(base64Image: string) {
// // //     const style = [
// // //       'font-size: 1px;',
// // //       'padding: 100px 200px;',
// // //       `background: url(${base64Image}) no-repeat center center;`,
// // //       'background-size: contain;',
// // //       'color: transparent;',
// // //     ].join(' ');

// // //     console.log('%c     ', style);
// // //   }
// // // }



// // //newwww111
// // import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { Router } from '@angular/router';
// // import * as faceapi from 'face-api.js';

// // @Component({
// //   selector: 'app-visitor-login',
// //   templateUrl: './visitor-login.component.html',
// //   styleUrls: ['./visitor-login.component.css']
// // })
// // export class VisitorLoginComponent implements OnInit {
// //   userData = { name: '', email: '' };
// //   selectedFile: File | null = null;
// //   capturedImageUrl: string = '';
// //   faceDetected: boolean = false;
// //   fetchedImageUrl: string = ''; // To store the image URL from the database

// //   @ViewChild('video') video!: ElementRef;
// //   @ViewChild('canvas') canvas!: ElementRef;

// //   constructor(private http: HttpClient, private router: Router) {}

// //   async ngOnInit() {
// //     await this.loadModels();
// //     navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
// //       this.video.nativeElement.srcObject = stream;
// //     });
// //   }

// //   async loadModels() {
// //     const MODEL_URL = '/assets/models';
// //     await Promise.all([
// //       faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
// //       faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
// //       faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
// //     ]);
// //     console.log("Models loaded successfully");
// //   }

// //   async capture() {
// //     const canvasEl = this.canvas.nativeElement;
// //     const context = canvasEl.getContext('2d');

// //     if (!context) {
// //       alert('Failed to get canvas context.');
// //       return;
// //     }

// //     // Set canvas size to match video dimensions
// //     canvasEl.width = this.video.nativeElement.videoWidth;
// //     canvasEl.height = this.video.nativeElement.videoHeight;

// //     // Mirror the video and draw on canvas
// //     context.save();
// //     context.translate(canvasEl.width, 0);
// //     context.scale(-1, 1); 
// //     context.drawImage(this.video.nativeElement, 0, 0, canvasEl.width, canvasEl.height);
// //     context.restore();

// //     // Detect face
// //     const detection = await faceapi
// //       .detectSingleFace(canvasEl, new faceapi.TinyFaceDetectorOptions())
// //       .withFaceLandmarks()
// //       .withFaceDescriptor();

// //     if (!detection) {
// //       alert('No face detected. Please try again.');
// //       this.faceDetected = false;
// //       return;
// //     }

// //     this.faceDetected = true;

// //     // Convert canvas to blob and prepare image
// //     canvasEl.toBlob((blob: Blob) => {
// //       this.selectedFile = new File([blob], 'login-photo.jpg', { type: 'image/jpeg' });

// //       const reader = new FileReader();
// //       reader.onload = () => {
// //         this.capturedImageUrl = reader.result as string;
// //         this.logImageToConsole(this.capturedImageUrl); // Show image in console
// //       };
// //       reader.readAsDataURL(this.selectedFile);
// //     }, 'image/jpeg');
// //   }

// //   onLogin() {
// //     if (!this.userData.name || !this.userData.email) {
// //       alert('Please fill in all required fields.');
// //       return;
// //     }

// //     if (!this.userData.email.includes('@') || !this.userData.email.includes('.')) {
// //       alert('Please enter a valid email address.');
// //       return;
// //     }

// //     if (!this.selectedFile) {
// //       alert('Please capture a photo before logging in.');
// //       return;
// //     }

// //     if (!this.faceDetected) {
// //       alert('No face detected in the captured photo.');
// //       return;
// //     }

// //     console.log('Form Data:', this.userData, this.selectedFile);

// //     // Fetch the visitor details by email from the backend
// //     this.http.get<any>(`http://localhost:5000/visitor/${this.userData.email}`).subscribe(
// //       (visitorData) => {
// //         alert('hyy');
// //         if (visitorData) {
// //           console.log('Fetched Visitor Data:', visitorData);

// //           // Set the fetched image URL from the database
// //           this.fetchedImageUrl = visitorData.image; // Assuming the image URL is returned here

// //           // Log the fetched image URL to the console and display it
// //           console.log('Fetched Image URL:', this.fetchedImageUrl);

// //           // Call compareImages function
// //           this.compareImages(visitorData.image, this.capturedImageUrl);

// //           // Optionally, you can display the fetched image on the frontend
// //           this.displayFetchedImage(visitorData.image);
// //         } else {
// //           alert('Visitor not found.');
// //         }
// //       },
// //       (error) => {
// //         console.error('Error fetching visitor data:', error);
// //         alert('Error fetching visitor data.');
// //       }
// //     );
// //   }

// //   // Function to compare the images
// //   compareImages(storedImageUrl: string, capturedImageUrl: string) {
// //     if (storedImageUrl === capturedImageUrl) {
// //       console.log('Images match!');
// //       alert('Login successful!');
// //       // Proceed with login logic (e.g., generate token, redirect, etc.)
// //     } else {
// //       console.log('Images do not match!');
// //       alert('Login failed. Image mismatch.');
// //     }
// //   }

// //   // Function to display the fetched image on the page
// //   displayFetchedImage(imageUrl: string) {
// //     const imageElement = document.getElementById('fetched-image') as HTMLImageElement;
// //     if (imageElement) {
// //       imageElement.src = imageUrl; // Set the fetched image URL as the source of an img tag
// //     }
// //   }

// //   logImageToConsole(base64Image: string) {
// //     const style = [
// //       'font-size: 1px;',
// //       'padding: 100px 200px;',
// //       `background: url(${base64Image}) no-repeat center center;`,
// //       'background-size: contain;',
// //       'color: transparent;',
// //     ].join(' ');

// //     console.log('%c     ', style);
// //   }
// // }



// //emnem

// // import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { Router } from '@angular/router';
// // import * as faceapi from 'face-api.js';

// // @Component({
// //   selector: 'app-visitor-login',
// //   templateUrl: './visitor-login.component.html',
// //   styleUrls: ['./visitor-login.component.css']
// // })
// // export class VisitorLoginComponent implements OnInit {
// //   userData = { name: '', email: '' };
// //   selectedFile: File | null = null;
// //   capturedImageUrl: string = '';
// //   faceDetected: boolean = false;
// //   fetchedImageUrl: string = ''; // To store the image URL or base64 from the database

// //   @ViewChild('video') video!: ElementRef;
// //   @ViewChild('canvas') canvas!: ElementRef;

// //   constructor(private http: HttpClient, private router: Router) {}

// //   async ngOnInit() {
// //     await this.loadModels();
// //     navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
// //       this.video.nativeElement.srcObject = stream;
// //     });
// //   }

// //   async loadModels() {
// //     const MODEL_URL = '/assets/models';
// //     await Promise.all([
// //       faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
// //       faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
// //       faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
// //     ]);
// //     console.log("Models loaded successfully");
// //   }

// //   async capture() {
// //     const canvasEl = this.canvas.nativeElement;
// //     const context = canvasEl.getContext('2d');

// //     if (!context) {
// //       alert('Failed to get canvas context.');
// //       return;
// //     }

// //     // Set canvas size to match video dimensions
// //     canvasEl.width = this.video.nativeElement.videoWidth;
// //     canvasEl.height = this.video.nativeElement.videoHeight;

// //     // Mirror the video and draw on canvas
// //     context.save();
// //     context.translate(canvasEl.width, 0);
// //     context.scale(-1, 1); 
// //     context.drawImage(this.video.nativeElement, 0, 0, canvasEl.width, canvasEl.height);
// //     context.restore();

// //     // Detect face
// //     const detection = await faceapi
// //       .detectSingleFace(canvasEl, new faceapi.TinyFaceDetectorOptions())
// //       .withFaceLandmarks()
// //       .withFaceDescriptor();

// //     if (!detection) {
// //       alert('No face detected. Please try again.');
// //       this.faceDetected = false;
// //       return;
// //     }

// //     this.faceDetected = true;

// //     // Convert canvas to blob and prepare image
// //     canvasEl.toBlob((blob: Blob) => {
// //       this.selectedFile = new File([blob], 'login-photo.jpg', { type: 'image/jpeg' });

// //       const reader = new FileReader();
// //       reader.onload = () => {
// //         this.capturedImageUrl = reader.result as string;
// //         this.logImageToConsole(this.capturedImageUrl); // Show image in console
// //       };
// //       reader.readAsDataURL(this.selectedFile);
// //     }, 'image/jpeg');
// //   }

// //   onLogin() {
// //     if (!this.userData.name || !this.userData.email) {
// //       alert('Please fill in all required fields.');
// //       return;
// //     }

// //     if (!this.userData.email.includes('@') || !this.userData.email.includes('.')) {
// //       alert('Please enter a valid email address.');
// //       return;
// //     }

// //     if (!this.selectedFile) {
// //       alert('Please capture a photo before logging in.');
// //       return;
// //     }

// //     if (!this.faceDetected) {
// //       alert('No face detected in the captured photo.');
// //       return;
// //     }

// //     console.log('Form Data:', this.userData, this.selectedFile);

// //     // Fetch the visitor details by email from the backend
// //     this.http.get<any>(`http://localhost:5000/visitor/${this.userData.email}`).subscribe(
// //       (visitorData) => {
// //         if (visitorData) {
// //           console.log('Fetched Visitor Data:', visitorData);

// //           // Assuming `visitorData.image` is the URL or base64 of the image
// //           this.fetchedImageUrl = visitorData.image; // This will be a URL or base64 string

// //           // Log the fetched image URL to the console and display it
// //           console.log('Fetched Image URL/Base64:', this.fetchedImageUrl);

// //           // Compare images
// //           this.compareImages(visitorData.image, this.capturedImageUrl);
// //         } else {
// //           alert('Visitor not found.');
// //         }
// //       },
// //       (error) => {
// //         console.error('Error fetching visitor data:', error);
// //         alert('Error fetching visitor data.');
// //       }
// //     );
// //   }

// //   // Function to compare the images
// //   compareImages(storedImageUrl: string, capturedImageUrl: string) {
// //     if (storedImageUrl === capturedImageUrl) {
// //       console.log('Images match!');
// //       alert('Login successful!');
// //       // Proceed with login logic (e.g., generate token, redirect, etc.)
// //     } else {
// //       console.log('Images do not match!');
// //       alert('Login failed. Image mismatch.');
// //     }
// //   }
// //   isBase64(str: string): boolean {
// //   return str.startsWith('data:image');
// // }


// //   logImageToConsole(base64Image: string) {
// //     const style = [
// //       'font-size: 1px;',
// //       'padding: 100px 200px;',
// //       `background: url(${base64Image}) no-repeat center center;`,
// //       'background-size: contain;',
// //       'color: transparent;',
// //     ].join(' ');

// //     console.log('%c     ', style);
// //   }

// //   logImagesToConsole(capturedImage: string, storedImageUrl: string) {
// //   // For captured image
// //   const capturedStyle = [
// //     'font-size: 1px;',
// //     'padding: 100px 200px;',
// //     `background: url(${capturedImage}) no-repeat center center;`,
// //     'background-size: contain;',
// //     'color: transparent;',
// //   ].join(' ');

// //   // For fetched image
// //   const fetchedStyle = [
// //     'font-size: 1px;',
// //     'padding: 100px 200px;',
// //     `background: url(${storedImageUrl}) no-repeat center center;`,
// //     'background-size: contain;',
// //     'color: transparent;',
// //   ].join(' ');

// //   // Log both images to console
// //   console.log('%c     ', capturedStyle); // Captured image
// //   console.log('%c     ', fetchedStyle);  // Fetched image
// // }
// // }




// // import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { Router } from '@angular/router';
// // import * as faceapi from 'face-api.js';

// // @Component({
// //   selector: 'app-visitor-login',
// //   templateUrl: './visitor-login.component.html',
// //   styleUrls: ['./visitor-login.component.css']
// // })
// // export class VisitorLoginComponent implements OnInit {
// //   userData = { name: '', email: '' };
// //   selectedFile: File | null = null;
// //   capturedImageUrl: string = '';
// //   faceDetected: boolean = false;
// //   fetchedImageUrl: string = ''; // To store the image URL or base64 from the database

// //   @ViewChild('video') video!: ElementRef;
// //   @ViewChild('canvas') canvas!: ElementRef;

// //   constructor(private http: HttpClient, private router: Router) {}

// //   async ngOnInit() {
// //     await this.loadModels();
// //     navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
// //       this.video.nativeElement.srcObject = stream;
// //     });
// //   }

// //   async loadModels() {
// //     const MODEL_URL = '/assets/models';
// //     await Promise.all([
// //       faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
// //       faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
// //       faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
// //     ]);
// //     console.log("Models loaded successfully");
// //   }

// //   // Logic for capturing image from webcam
// //   async capture() {
// //     const canvasEl = this.canvas.nativeElement;
// //     const context = canvasEl.getContext('2d');

// //     if (!context) {
// //       alert('Failed to get canvas context.');
// //       return;
// //     }

// //     // Set canvas size to match video dimensions
// //     canvasEl.width = this.video.nativeElement.videoWidth;
// //     canvasEl.height = this.video.nativeElement.videoHeight;

// //     // Mirror the video and draw on canvas
// //     context.save();
// //     context.translate(canvasEl.width, 0);
// //     context.scale(-1, 1); 
// //     context.drawImage(this.video.nativeElement, 0, 0, canvasEl.width, canvasEl.height);
// //     context.restore();

// //     // Detect face
// //     const detection = await faceapi
// //       .detectSingleFace(canvasEl, new faceapi.TinyFaceDetectorOptions())
// //       .withFaceLandmarks()
// //       .withFaceDescriptor();

// //     if (!detection) {
// //       alert('No face detected. Please try again.');
// //       this.faceDetected = false;
// //       return;
// //     }

// //     this.faceDetected = true;

// //     // Convert canvas to blob and prepare image
// //     canvasEl.toBlob((blob: Blob) => {
// //       this.selectedFile = new File([blob], 'login-photo.jpg', { type: 'image/jpeg' });

// //       const reader = new FileReader();
// //       reader.onload = () => {
// //         this.capturedImageUrl = reader.result as string;
// //         this.logImageToConsole(this.capturedImageUrl); // Show image in console
// //       };
// //       reader.readAsDataURL(this.selectedFile);
// //     }, 'image/jpeg');
// //   }

// //   // Logic to open file and load image to console (from ImageConsoleComponent)
// //   onFileSelected(event: any) {
// //     const file: File = event.target.files[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onload = (e: any) => {
// //         this.capturedImageUrl = e.target.result;
// //         this.logImageToConsole(this.capturedImageUrl); // Show selected image in console
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   }

// //   // Handle login logic
// //   onLogin() {
// //     if (!this.userData.name || !this.userData.email) {
// //       alert('Please fill in all required fields.');
// //       return;
// //     }

// //     if (!this.userData.email.includes('@') || !this.userData.email.includes('.')) {
// //       alert('Please enter a valid email address.');
// //       return;
// //     }

// //     if (!this.selectedFile) {
// //       alert('Please capture a photo before logging in.');
// //       return;
// //     }

// //     if (!this.faceDetected) {
// //       alert('No face detected in the captured photo.');
// //       return;
// //     }

// //     console.log('Form Data:', this.userData, this.selectedFile);

// //     // Fetch the visitor details by email from the backend
// //     this.http.get<any>(`http://localhost:5000/visitor/${this.userData.email}`).subscribe(
// //       (visitorData) => {
// //         if (visitorData) {
// //           console.log('Fetched Visitor Data:', visitorData);

// //           // Assuming visitorData.image is the URL or base64 of the image
// //           // this.fetchedImageUrl = visitorData.image; // This will be a URL or base64 string
// //               this.fetchedImageUrl = `http://localhost:5000/${visitorData.image}`;
// //           // Log the fetched image URL to the console and display it
// //           console.log('Fetched Image URL/Base64:', this.fetchedImageUrl);

// //           // Compare images
// //           this.compareImages(visitorData.image, this.capturedImageUrl);
// //         } else {
// //           alert('Visitor not found.');
// //         }
// //       },
// //       (error) => {
// //         console.error('Error fetching visitor data:', error);
// //         alert('Error fetching visitor data.');
// //       }
// //     );
// //   }

// //   // Function to compare the images
// //   compareImages(fetchedImageUrl: string, capturedImageUrl: string) {
// //     if (fetchedImageUrl === capturedImageUrl) {
// //       console.log('Images match!');
// //       alert('Login successful!');
// //       // Proceed with login logic (e.g., generate token, redirect, etc.)
// //     } else {
// //       console.log('Images do not match!');
// //       alert('Login failed. Image mismatch.');
// //     }
// //   }

// //   // Helper to check if the string is a valid base64 image
// //   isBase64(str: string): boolean {
// //     return str.startsWith('data:image');
// //   }

// //   // Function to log image to the console with custom styling
// //   logImageToConsole(base64Image: string) {
// //     const style = [
// //       'font-size: 1px;',
// //       'padding: 100px 200px;',
// //       `background: url(${base64Image}) no-repeat center center;`,
// //       'background-size: contain;',
// //       'color: transparent;',
// //     ].join(' ');

// //     console.log('%c     ', style);
// //   }
// // }


// import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import * as faceapi from 'face-api.js';
// import { waitForAsync } from '@angular/core/testing';

// @Component({
//   selector: 'app-visitor-login',
//   templateUrl: './visitor-login.component.html',
//   styleUrls: ['./visitor-login.component.css']
// })
// export class VisitorLoginComponent implements OnInit {
//   private responseDelay = 300;
//   userData = { name: '', email: '' };
//   selectedFile: File | null = null;
//   capturedImageUrl: string = '';
//   faceDetected: boolean = false;
//   fetchedImageUrl: string = ''; // To store the image URL or base64 from the database

//   @ViewChild('video') video!: ElementRef;
//   @ViewChild('canvas') canvas!: ElementRef;

//   constructor(private http: HttpClient, private router: Router) {}

//   async ngOnInit() {
//     await this.loadModels();
//     navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
//       this.video.nativeElement.srcObject = stream;
//     });
//   }

//   async loadModels() {
//     const MODEL_URL = '/assets/models';
//     await Promise.all([
//       faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
//       faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
//       faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
//     ]);
//     console.log("Models loaded successfully");
//   }

//   // Logic for capturing image from webcam
//   async capture() {
//     const canvasEl = this.canvas.nativeElement;
//     const context = canvasEl.getContext('2d');

//     if (!context) {
//       alert('Failed to get canvas context.');
//       return;
//     }

//     // Set canvas size to match video dimensions
//     canvasEl.width = this.video.nativeElement.videoWidth;
//     canvasEl.height = this.video.nativeElement.videoHeight;

//     // Mirror the video and draw on canvas
//     context.save();
//     context.translate(canvasEl.width, 0);
//     context.scale(-1, 1); 
//     context.drawImage(this.video.nativeElement, 0, 0, canvasEl.width, canvasEl.height);
//     context.restore();

//     // Detect face
//     const detection = await faceapi
//       .detectSingleFace(canvasEl, new faceapi.TinyFaceDetectorOptions())
//       .withFaceLandmarks()
//       .withFaceDescriptor();

//     if (!detection) {
//       alert('No face detected. Please try again.');
//       this.faceDetected = false;
//       return;
//     }

//     this.faceDetected = true;

//     // Convert canvas to blob and prepare image
//     canvasEl.toBlob((blob: Blob) => {
//       this.selectedFile = new File([blob], 'login-photo.jpg', { type: 'image/jpeg' });

//       const reader = new FileReader();
//       reader.onload = () => {
//         this.capturedImageUrl = reader.result as string;
//         this.logImageToConsole(this.capturedImageUrl); // Show image in console
//       };
//       reader.readAsDataURL(this.selectedFile);
//     }, 'image/jpeg');
//   }

//   // Logic to open file and load image to console (from ImageConsoleComponent)
//   onFileSelected(event: any) {
//     const file: File = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         this.capturedImageUrl = e.target.result;
//         this.logImageToConsole(this.capturedImageUrl); // Show selected image in console
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   // Handle login logic
//   onLogin() {
//     if (!this.userData.name || !this.userData.email) {
//       alert('Please fill in all required fields.');
//       return;
//     }

//     if (!this.userData.email.includes('@') || !this.userData.email.includes('.')) {
//       alert('Please enter a valid email address.');
//       return;
//     }

//     if (!this.selectedFile) {
//       alert('Please capture a photo before logging in.');
//       return;
//     }

//     if (!this.faceDetected) {
//       alert('No face detected in the captured photo.');
//       return;
//     }

//     console.log('Form Data:', this.userData, this.selectedFile);

//     // Fetch the visitor details by email from the backend
//     this.http.get<any>(`http://localhost:5000/visitor/${this.userData.email}`).subscribe(
//       (visitorData) => {
//         if (visitorData) {
//           console.log('Fetched Visitor Data:', visitorData);

//           // Assuming visitorData.image is the URL or base64 of the image
//           this.fetchedImageUrl = `http://localhost:5000${visitorData.image}`;
          
//           // Log the fetched image URL to the console and display it
//           console.log('Fetched Image URL/Base64:', this.fetchedImageUrl);

//           // Log the fetched image URL (either as URL or base64)
//           this.logImageToConsole(this.fetchedImageUrl);
//           localStorage.setItem('name', visitorData.name);
//           localStorage.setItem('email', visitorData.email);
          
//           // Compare images
//           this.compareImages(visitorData.image, this.capturedImageUrl);
//           setTimeout(() => {
//         this.router.navigate(['/visitor-home']);
//       }, this.responseDelay);
          
//         } else {
//           alert('Visitor not found.');
//         }
//       },
//       (error) => {
//         console.error('Error fetching visitor data:', error);
//         alert('Error fetching visitor data.');
//       }
//     );
//   }

//   // Function to compare the images
//   // compareImages(fetchedImageUrl: string, capturedImageUrl: string) {
//   //   if (fetchedImageUrl === capturedImageUrl) {
//   //     console.log('Images match!');
//   //     alert('Login successful!');
//   //     // Proceed with login logic (e.g., generate token, redirect, etc.)
//   //   } else {
//   //     console.log('Images do not match!');
//   //     alert('Login failed. Image mismatch.');
//   //   }
//   // }
// async compareImages(fetchedImageUrl: string, capturedImageUrl: string) {
//   const image1 = await faceapi.fetchImage(`http://localhost:5000${fetchedImageUrl}`);
//   const image2 = await faceapi.fetchImage(capturedImageUrl);

//   const detections1 = await faceapi.detectSingleFace(image1).withFaceLandmarks().withFaceDescriptor();
//   const detections2 = await faceapi.detectSingleFace(image2).withFaceLandmarks().withFaceDescriptor();

//   if (!detections1 || !detections2) {
//     alert('Could not detect faces.');
//     return;
//   }

//   const distance = faceapi.euclideanDistance(detections1.descriptor, detections2.descriptor);
//   if (distance < 0.6) {
//     console.log('Images match!');
//     alert('Login successful!');
//   } else {
//     console.log('Images do not match!');
//     alert('Login failed. Image mismatch.');
//   }
// }

//   // Helper to check if the string is a valid base64 image
//   isBase64(str: string): boolean {
//     return str.startsWith('data:image');
//   }
//   // Function to log image to the console with custom styling
//   logImageToConsole(image: string) {
//     const style = [
//       'font-size: 1px;',
//       'padding: 100px 200px;',
//       `background: url(${image}) no-repeat center center;`,
//       'background-size: contain;',
//       'color: transparent;',
//     ].join(' ');

//     console.log('%c     ', style);
//   }
// }

// //working
// // import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { Router } from '@angular/router';
// // import * as faceapi from 'face-api.js';

// // @Component({
// //   selector: 'app-visitor-login',
// //   templateUrl: './visitor-login.component.html',
// //   styleUrls: ['./visitor-login.component.css']
// // })
// // export class VisitorLoginComponent implements OnInit {
// //   userData = { name: '', email: '' };
// //   selectedFile: File | null = null;
// //   capturedImageUrl: string = '';
// //   faceDetected: boolean = false;
// //   fetchedImageUrl: string = '';

// //   @ViewChild('video') video!: ElementRef;
// //   @ViewChild('canvas') canvas!: ElementRef;

// //   constructor(private http: HttpClient, private router: Router) {}

// //   async ngOnInit() {
// //     await this.loadModels();
// //     navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
// //       this.video.nativeElement.srcObject = stream;
// //     });
// //   }

// //   async loadModels() {
// //     const MODEL_URL = '/assets/models';
// //     await Promise.all([
// //       faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
// //       faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
// //       faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
// //       faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL) // <-- Required for detectSingleFace()
// //     ]);
// //     console.log("Models loaded successfully");
// //   }

// //   async capture() {
// //     const canvasEl = this.canvas.nativeElement;
// //     const context = canvasEl.getContext('2d');

// //     if (!context) {
// //       alert('Failed to get canvas context.');
// //       return;
// //     }

// //     canvasEl.width = this.video.nativeElement.videoWidth;
// //     canvasEl.height = this.video.nativeElement.videoHeight;

// //     context.save();
// //     context.translate(canvasEl.width, 0);
// //     context.scale(-1, 1); 
// //     context.drawImage(this.video.nativeElement, 0, 0, canvasEl.width, canvasEl.height);
// //     context.restore();

// //     const detection = await faceapi
// //       .detectSingleFace(canvasEl)
// //       .withFaceLandmarks()
// //       .withFaceDescriptor();

// //     if (!detection) {
// //       alert('No face detected. Please try again.');
// //       this.faceDetected = false;
// //       return;
// //     }

// //     this.faceDetected = true;

// //     canvasEl.toBlob((blob: Blob) => {
// //       this.selectedFile = new File([blob], 'login-photo.jpg', { type: 'image/jpeg' });

// //       const reader = new FileReader();
// //       reader.onload = () => {
// //         this.capturedImageUrl = reader.result as string;
// //         this.logImageToConsole(this.capturedImageUrl);
// //       };
// //       reader.readAsDataURL(this.selectedFile);
// //     }, 'image/jpeg');
// //   }

// //   onFileSelected(event: any) {
// //     const file: File = event.target.files[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onload = (e: any) => {
// //         this.capturedImageUrl = e.target.result;
// //         this.logImageToConsole(this.capturedImageUrl);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   }

// //   onLogin() {
// //     if (!this.userData.name || !this.userData.email) {
// //       alert('Please fill in all required fields.');
// //       return;
// //     }

// //     if (!this.userData.email.includes('@') || !this.userData.email.includes('.')) {
// //       alert('Please enter a valid email address.');
// //       return;
// //     }

// //     if (!this.selectedFile) {
// //       alert('Please capture a photo before logging in.');
// //       return;
// //     }

// //     if (!this.faceDetected) {
// //       alert('No face detected in the captured photo.');
// //       return;
// //     }

// //     console.log('Form Data:', this.userData, this.selectedFile);

// //     this.http.get<any>(`http://localhost:5000/visitor/${this.userData.email}`).subscribe(

// //       (visitorData) => {
// //         if (visitorData) {
// //           console.log('Fetched Visitor Data:', visitorData);

// //           this.fetchedImageUrl = `http://localhost:5000${visitorData.image}`;
// //           console.log('Fetched Image URL/Base64:', this.fetchedImageUrl);
// //           this.logImageToConsole(this.fetchedImageUrl);
// //           this.compareImages(visitorData.image, this.capturedImageUrl);
// //           //localStorage.setItem('token', response.token);
// //           localStorage.setItem('name', visitorData.name);
// //           localStorage.setItem('email', visitorData.email);
// //           this.router.navigate(['/visitor-home']);
// //         } else {
// //           alert('Visitor not found.');
// //         }
// //       },
// //       (error) => {
// //         console.error('Error fetching visitor data:', error);
// //         alert('Error fetching visitor data.');
// //       }
// //     );
// //   }

// //   async compareImages(fetchedImageUrl: string, capturedImageUrl: string) {
// //     const image1 = await faceapi.fetchImage(`http://localhost:5000${fetchedImageUrl}`);
// //     const image2 = await faceapi.fetchImage(capturedImageUrl);

// //     const detections1 = await faceapi.detectSingleFace(image1).withFaceLandmarks().withFaceDescriptor();
// //     const detections2 = await faceapi.detectSingleFace(image2).withFaceLandmarks().withFaceDescriptor();

// //     if (!detections1 || !detections2) {
// //       alert('Could not detect faces.');
// //       return;
// //     }

// //     const distance = faceapi.euclideanDistance(detections1.descriptor, detections2.descriptor);
// //     if (distance < 0.6) {
// //       console.log('Images match!');
// //       // alert('Login successful!');
// //     } else {
// //       console.log('Images do not match!');
// //       alert('Login failed. Image mismatch.');
// //     }
// //   }

// //   isBase64(str: string): boolean {
// //     return str.startsWith('data:image');
// //   }

// //   logImageToConsole(image: string) {
// //     const style = [
// //       'font-size: 1px;',
// //       'padding: 100px 200px;',
// //       `background: url(${image}) no-repeat center center;`,
// //       'background-size: contain;',
// //       'color: transparent;',
// //     ].join(' ');
// //     console.log('%c     ', style);
// //   }
// // }



// only for you
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as faceapi from 'face-api.js';

@Component({
  selector: 'app-visitor-login',
  templateUrl: './visitor-login.component.html',
  styleUrls: ['./visitor-login.component.css']
})
export class VisitorLoginComponent implements OnInit {
  userData = { name: '', email: '' };
  selectedFile: File | null = null;
  capturedImageUrl: string = '';
  faceDetected: boolean = false;
  fetchedImageUrl: string = '';

  @ViewChild('video') video!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;

  constructor(private http: HttpClient, private router: Router) {}

  async ngOnInit() {
    await this.loadModels();
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      this.video.nativeElement.srcObject = stream;
    });
  }

  async loadModels() {
    const MODEL_URL = '/assets/models';
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL)
    ]);
    console.log("Models loaded successfully");
  }

  async capture() {
    const canvasEl = this.canvas.nativeElement;
    const context = canvasEl.getContext('2d');

    if (!context) {
      alert('Failed to get canvas context.');
      return;
    }

    canvasEl.width = this.video.nativeElement.videoWidth;
    canvasEl.height = this.video.nativeElement.videoHeight;

    context.save();
    context.translate(canvasEl.width, 0);
    context.scale(-1, 1); // Mirror the video
    context.drawImage(this.video.nativeElement, 0, 0, canvasEl.width, canvasEl.height);
    context.restore();

    const detection = await faceapi
      .detectSingleFace(canvasEl)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      alert('No face detected. Please try again.');
      this.faceDetected = false;
      return;
    }

    this.faceDetected = true;

    canvasEl.toBlob((blob: Blob) => {
      this.selectedFile = new File([blob], 'login-photo.jpg', { type: 'image/jpeg' });

      const reader = new FileReader();
      reader.onload = () => {
        this.capturedImageUrl = reader.result as string;
        this.logImageToConsole(this.capturedImageUrl);
      };
      reader.readAsDataURL(this.selectedFile);
    }, 'image/jpeg');
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.capturedImageUrl = e.target.result;
        this.logImageToConsole(this.capturedImageUrl);
      };
      reader.readAsDataURL(file);
    }
  }

  async onLogin() {
  if (!this.userData.name || !this.userData.email) {
    alert('Please fill in all required fields.');
    return;
  }

  if (!this.userData.email.includes('@') || !this.userData.email.includes('.')) {
    alert('Please enter a valid email address.');
    return;
  }

  if (!this.selectedFile) {
    alert('Please capture a photo before logging in.');
    return;
  }

  if (!this.faceDetected) {
    alert('No face detected in the captured photo.');
    return;
  }

  try {
    const visitorData = await this.http.get<any>(`http://localhost:5000/visitor/${this.userData.email}`).toPromise();

    if (!visitorData) {
      alert('Visitor not found.');
      return;
    }

    console.log('Fetched Visitor Data:', visitorData);
    const fetchedImageUrl = `http://localhost:5000${visitorData.image}`;
    const match = await this.compareImages(visitorData.image, this.capturedImageUrl);

    if (match) {
      localStorage.setItem('name', visitorData.name);
      localStorage.setItem('email', visitorData.email);
      this.router.navigate(['/visitor-home']); // ✅ navigate only on successful face match
    } else {
      alert('Face does not match. Please try again.');
    }

  } catch (error) {
    console.error('Login error:', error);
    alert('Error during login.');
  }
}

  async compareImages(fetchedImageUrl: string, capturedImageUrl: string): Promise<boolean> {
    try {
      console.log('Fetching images for comparison...');
      const image1 = await faceapi.fetchImage(`http://localhost:5000${fetchedImageUrl}`);
      const image2 = await faceapi.fetchImage(capturedImageUrl);

      const detections1 = await faceapi.detectSingleFace(image1).withFaceLandmarks().withFaceDescriptor();
      const detections2 = await faceapi.detectSingleFace(image2).withFaceLandmarks().withFaceDescriptor();

      if (!detections1 || !detections2) {
        console.error('Face not detected in one or both images.');
        return false;
      }

      const distance = faceapi.euclideanDistance(detections1.descriptor, detections2.descriptor);
      console.log('Face descriptor distance:', distance);

      if (isNaN(distance)) {
        console.error('Distance is NaN — face descriptor may be invalid.');
        return false;
      }

      // Lower threshold for better matching
      const isMatch = distance < 0.5; // Change threshold to 0.5
      console.log(isMatch ? 'Images match!' : 'Images do not match!');
      return isMatch;
    } catch (err) {
      console.error('Error comparing faces:', err);
      return false;
    }
  }

  isBase64(str: string): boolean {
    return str.startsWith('data:image');
  }

  logImageToConsole(image: string) {
    const style = [
      'font-size: 1px;',
      'padding: 100px 200px;',
      `background: url(${image}) no-repeat center center;`,
      'background-size: contain;',
      'color: transparent;',
    ].join(' ');
    console.log('%c     ', style);
  }
}
