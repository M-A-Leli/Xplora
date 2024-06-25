import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../core/services/client.service';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  fullName: string = '';
  phoneNumber: string = '';
  generalError: string = '';
  showSuccessModal: boolean = false;

  constructor(private clientService: ClientService, private router: Router, private authService: AuthService) { }

  onSubmit() {
    this.clearErrors();

    if (!this.validateEmail(this.email)) {
      this.generalError = 'Invalid email address.';
      setTimeout(() => {
        this.generalError = '';
      }, 3000);
      return;
    }

    if (!this.validatePassword(this.password)) {
      this.generalError = 'Invalid password. It must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be between 8 and 16 characters.';
      setTimeout(() => {
        this.generalError = '';
      }, 3000);
      return;
    }

    if (!this.validateFullName(this.fullName)) {
      this.generalError = 'Invalid full name';
      setTimeout(() => {
        this.generalError = '';
      }, 3000);
      return;
    }

    if (!this.validatePhoneNumber(this.phoneNumber)) {
      this.generalError = 'Invalid phone number';
      setTimeout(() => {
        this.generalError = '';
      }, 3000);
      return;
    }

    const [firstName, lastName] = this.splitFullName(this.fullName);

    const newUser = {
      username: this.username,
      email: this.email,
      password: this.password,
      first_name: firstName,
      last_name: lastName,
      phone_number: this.phoneNumber
    }

    this.clientService.createClient(newUser).subscribe({
      next: data => {
        this.showSuccessModal = true;
        setTimeout(() => {
          this.showSuccessModal = false;
          this.router.navigateByUrl('/login');
        }, 3000);
      },
      error: err => {
        if (err.status === 409) {
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

  validateFullName(fullName: string): boolean {
    const fullNameRegex = /^[a-zA-Z]+\s[a-zA-Z]+$/;
    return fullNameRegex.test(fullName);
  }

  validatePhoneNumber(phoneNumber: string): boolean {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(phoneNumber);
  }

  splitFullName(fullName: string): [string, string] {
    const [firstName, lastName] = fullName.split(' ');
    return [firstName, lastName];
  }
}
