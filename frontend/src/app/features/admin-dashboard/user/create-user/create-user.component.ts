import { Component } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  user = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    phone_number: ''
  };
  error: string = '';

  constructor(private userService: UserService, private router: Router) {}

  createUser(): void {
    this.userService.createUser(this.user).subscribe({
      next: () => {
        this.router.navigate(['/admin/dashboard/users']);
      },
      error: (err) => {
        this.error = 'Failed to create user. Please try again later.';
        console.error(err);
      }
    });
  }
}
