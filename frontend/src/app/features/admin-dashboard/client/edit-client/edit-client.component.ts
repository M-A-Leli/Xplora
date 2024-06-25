import { Component } from '@angular/core';
import { ClientService } from '../../../../core/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Client {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.css'
})
export class EditClientComponent {
  client: Client = {
    id: '',
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
    private clientService: ClientService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const clientId = this.route.snapshot.paramMap.get('id');
    if (clientId) {
      this.getClient(clientId);
    }
  }

  getClient(id: string): void {
    this.clientService.getClientById(id).subscribe({
      next: (data: Client) => {
        this.client = data;
      },
      error: (err) => {
        this.error = 'Failed to load client. Please try again later.';
        console.error(err);
      }
    });
  }

  updateClient(): void {
    this.clientService.updateClient(this.client.id, this.client).subscribe({
      next: () => {
        this.success = 'Client updated successfully!';
        setTimeout(() => {
          this.router.navigate(['/admin/dashboard/clients']);
        }, 2000);
      },
      error: (err) => {
        this.error = 'Failed to update client. Please try again later.';
        console.error(err);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
