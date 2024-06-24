import { Component } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent {
  users: any[] = [];
  error: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        this.error = 'Failed to load users. Please try again later.';
        console.error(err);
      }
    });
  }

  viewUser(id: string): void {
    this.router.navigate(['/admin/dashboard/users', id]);
  }

  editUser(id: string): void {
    this.router.navigate(['/admin/dashboard/users/edit', id]);
  }

  deleteUser(id: string): void {
    this.router.navigate(['/admin/dashboard/users/delete', id]);
  }
}
