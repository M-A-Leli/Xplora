import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordResetService } from '../../core/services/password-reset.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  email: string = '';
  code: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  generalError: string = '';

  constructor(private passwordResetService: PasswordResetService, private router: Router) {}

  onSubmit() {
    this.clearErrors();

    if (!this.validatePassword(this.newPassword, this.confirmNewPassword)) {
      return; // Validation handled in template with ngModel and required attribute
    }

    this.passwordResetService.resetPassword(this.email, this.code, this.newPassword).subscribe({
      next: () => {
        // Password reset successfully, redirect to login
        this.router.navigateByUrl('/login');
      },
      error: () => {
        this.generalError = 'An unexpected error occurred. Please try again.';
      }
    });
  }

  clearErrors() {
    this.generalError = '';
  }

  validatePassword(newPassword: string, confirmNewPassword: string): boolean {
    // Example: Validate password meets criteria (could be more specific depending on requirements)
    return newPassword.length >= 8 && newPassword === confirmNewPassword;
  }
}
