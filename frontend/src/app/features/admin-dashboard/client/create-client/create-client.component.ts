import { Component } from '@angular/core';
import { ClientService } from '../../../../core/services/client.service';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-client.component.html',
  styleUrl: './create-client.component.css'
})
export class CreateClientComponent {
  client = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    phone_number: ''
  };
  error: string = '';

  constructor(private clientService: ClientService, private router: Router, private location: Location) { }

  createClient(): void {
    this.clientService.createClient(this.client).subscribe({
      next: () => {
        this.router.navigate(['/admin/dashboard/clients']);
      },
      error: (err) => {
        if (err.status === 409 || err.status === 400) {
          this.error = err.error.error.message;
          setTimeout(() => {
            this.error = '';
          }, 3000);
        } else {
          this.error = 'An unexpected error occurred. Please try again.';
          setTimeout(() => {
            this.error = '';
          }, 3000);
        }
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
