import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  signup() {
    
    const userData = { username: this.username, email: this.email, password: this.password };
    this.http.post('http://localhost:3000/auth/signup', userData)
      .subscribe(
        (response) => {
          console.log('Signup successful', response);
        },
        (error) => {
          console.error('Signup error', error);
        }
      );
  }
}

