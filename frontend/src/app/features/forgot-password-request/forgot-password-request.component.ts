import { Component } from '@angular/core';
import { PasswordResetService } from '../../core/services/password-reset.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-request',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgot-password-request.component.html',
  styleUrl: './forgot-password-request.component.css'
})
export class ForgotPasswordRequestComponent {
  email: string = '';
  emailError: string = '';
  generalError: string = '';

  constructor(private passwordResetService: PasswordResetService, private router: Router) {}

  onSubmit() {
    this.clearErrors();

    if (!this.validateEmail(this.email)) {
      this.emailError = 'Invalid email address.';
      setTimeout(() => {
        this.emailError = '';
      }, 3000);
      return;
    }

    this.passwordResetService.sendPasswordResetCode(this.email).subscribe({
      next: () => {
        this.router.navigateByUrl('/reset-password/verify');
      },
      error: err => {
        if (err.status === 404) {
          // this.generalError = 'Email address not found. Please enter a valid email.';
          this.generalError = err.error.message;
        } else {
          this.generalError = 'An unexpected error occurred. Please try again.';
        }
      }
    });
  }

  clearErrors() {
    this.emailError = '';
    this.generalError = '';
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
