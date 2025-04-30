// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-sign-in',
//   templateUrl: './sign-in.component.html',
//   styleUrls: ['./sign-in.component.css']
// })
// export class SignInComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit(): void {
//   }
//
// }
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  ucredentials = {
    email: '',
    password: ''  // Ensure this is a string, not an event object
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Initialization logic if needed
  }

  login(): void {
    console.log(this.ucredentials);  // Verify the contents of ucredentials
    this.authService.login(this.ucredentials).subscribe((res) => {
      console.log(res);  // Handle the response
      // Navigate or handle login success
    });
  }
}
