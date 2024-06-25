import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../../core/services/client.service';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-delete-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-client.component.html',
  styleUrl: './delete-client.component.css'
})
export class DeleteClientComponent {
  client: any;
  error: string = '';
  success: string = '';

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    const clientId = this.route.snapshot.paramMap.get('id');
    if (clientId) {
      this.getClient(clientId);
    }
  }

  getClient(id: string): void {
    this.clientService.getClientById(id).subscribe({
      next: (data) => {
        this.client = data;
      },
      error: (err) => {
        this.error = 'Failed to load client. Please try again later.';
        console.error(err);
      }
    });
  }

  deleteClient(): void {
    this.clientService.deleteClient(this.client.id).subscribe({
      next: () => {
        this.success = 'Client deleted successfully!';
        setTimeout(() => {
          this.router.navigate(['/admin/dashboard/clients']);
        }, 2000);
      },
      error: (err) => {
        this.error = 'Failed to delete client. Please try again later.';
        console.error(err);
      }
    });
  }

  cancel(): void {
    this.location.back();
  }
}
