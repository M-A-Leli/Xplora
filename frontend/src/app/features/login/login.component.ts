import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  emailError: string = '';
  passwordError: string = '';
  generalError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.clearErrors();

    if (!this.validateEmail(this.email)) {
      this.emailError = 'Invalid email address.';
      setTimeout(() => {
        this.emailError = '';
      }, 3000);
      return;
    }

    if (!this.validatePassword(this.password)) {
      this.passwordError = 'Invalid password. It must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be between 8 and 16 characters.';
      setTimeout(() => {
        this.passwordError = '';
      }, 3000);
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: data => {
        this.authService.setToken(data.token);
        this.router.navigateByUrl(data.redirectUrl);
      },
      error: err => {
        if (err.status === 401) {
          this.generalError = err.error.error.message;
          setTimeout(() => {
            this.generalError = '';
          }, 3000);
        } else {
          this.generalError = 'An unexpected error occurred. Please try again.';
          setTimeout(() => {
            this.generalError = '';
          }, 3000);
        }
      }
    });
  }

  clearErrors() {
    this.emailError = '';
    this.passwordError = '';
    this.generalError = '';
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,16}$/;
    return passwordRegex.test(password);
  }
}
