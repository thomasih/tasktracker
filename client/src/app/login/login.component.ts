import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isRegisterMode: boolean = false;

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {}

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.errorMessage = '';
  }

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    const loginData = { email: this.email, password: this.password };
    
    this.http.post<{ success: boolean, userId: number }>('http://localhost:5220/User/login', loginData)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.userService.setUserId(response.userId);
            this.router.navigate(['/events']);
          } else {
            this.errorMessage = 'Invalid login credentials.';
          }
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.errorMessage = 'Invalid login credentials. Please try again.';
          } else {
            this.errorMessage = 'An error occurred during login. Please try again later.';
          }
        }
      });
  }

  register() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password to register.';
      return;
    }

    const newUser = { email: this.email, password: this.password };

    this.userService.addUser(newUser).subscribe({
      next: (createdUser) => {
        this.userService.setUserId(createdUser.id!);
        this.router.navigate(['/events']);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = 'An error occurred during registration. Please try again.';
      }
    });
  }

  handleSubmit() {
    if (this.isRegisterMode) { this.register(); } 
    else                     { this.login();    }
  }
}