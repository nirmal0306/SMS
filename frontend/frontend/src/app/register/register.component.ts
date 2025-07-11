import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {}

  onSubmit() {
    if (this.user.password !== this.user.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    this.http.post('http://localhost:5000/register', this.user)
      .subscribe(response => {
        alert('Registration Successful');
        this.router.navigate(['/admin-login']);
      }, error => {
        alert('Registration Failed');
      });
  }
}
