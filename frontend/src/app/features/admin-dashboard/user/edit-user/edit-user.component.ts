import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  user: any = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    phone_number: ''
  };
  error: string = '';
  success: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.getUser(userId);
    }
  }

  getUser(id: string): void {
    this.userService.getUserById(id).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        this.error = 'Failed to load user. Please try again later.';
        console.error(err);
      }
    });
  }

  updateUser(): void {
    this.userService.updateUser(this.user.id, this.user).subscribe({
      next: () => {
        this.success = 'User updated successfully!';
        setTimeout(() => {
          this.router.navigate(['/admin/dashboard/users']);
        }, 2000);
      },
      error: (err) => {
        this.error = 'Failed to update user. Please try again later.';
        console.error(err);
      }
    });
  }
}
