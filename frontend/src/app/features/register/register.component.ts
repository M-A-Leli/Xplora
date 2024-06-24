import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  generalError: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.clearErrors();

    const newUser = {
      username: this.username,
      email: this.email,
      first_name: this.firstName,
      last_name: this.lastName,
      phone_number: this.phoneNumber
    };

    this.userService.createUser(newUser).subscribe({
      next: () => {
        this.router.navigateByUrl('/login');
      },
      error: err => {
        this.generalError = 'An error occurred. Please try again.'; // Generic error message for simplicity
        console.error(err);
      }
    });
  }

  clearErrors() {
    this.generalError = '';
  }

  // You can add more specific validation methods if required
}
