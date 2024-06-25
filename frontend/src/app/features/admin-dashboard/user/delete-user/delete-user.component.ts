import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css'
})
export class DeleteUserComponent {
  user: any;
  error: string = '';
  success: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private location: Location
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

  deleteUser(): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(this.user.id).subscribe({
        next: () => {
          this.success = 'User deleted successfully!';
          setTimeout(() => {
            this.router.navigate(['/admin/dashboard/users']);
          }, 2000);
        },
        error: (err) => {
          this.error = 'Failed to delete user. Please try again later.';
          console.error(err);
        }
      });
    }
  }

  cancel(): void {
    this.location.back();
  }
}
