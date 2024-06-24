import { Component } from '@angular/core';
import { PasswordResetService } from '../../core/services/password-reset.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password-verify',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-password-verify.component.html',
  styleUrl: './reset-password-verify.component.css'
})
export class ResetPasswordVerifyComponent {
  email: string = '';
  code: string = '';
  generalError: string = '';

  constructor(private passwordResetService: PasswordResetService, private router: Router) {}

  onSubmit() {
    this.clearErrors();

    if (!this.validateCode(this.code)) {
      return; // Validation handled in template with ngModel and required attribute
    }

    this.passwordResetService.verifyPasswordResetCode(this.email, this.code).subscribe({
      next: () => {
        this.router.navigateByUrl('/reset-password');
      },
      error: err => {
        if (err.status === 404) {
          this.generalError = 'Invalid code. Please check and try again.';
        } else {
          this.generalError = 'An unexpected error occurred. Please try again.';
        }
      }
    });
  }

  clearErrors() {
    this.generalError = '';
  }

  validateCode(code: string): boolean {
    // Example: Validate code format (could be more specific depending on backend)
    return code.length === 6; // Assuming 6-digit code for simplicity
  }
}
