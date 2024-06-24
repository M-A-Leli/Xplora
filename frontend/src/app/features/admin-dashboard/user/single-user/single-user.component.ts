import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-single-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-user.component.html',
  styleUrl: './single-user.component.css'
})
export class SingleUserComponent {
  user: any;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
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
}
