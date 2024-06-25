import { Component } from '@angular/core';
import { ClientService } from '../../../../core/services/client.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.css'
})
export class ListClientsComponent {
  clients: any[] = [];
  error: string = '';

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: (err) => {
        this.error = 'Failed to load clients. Please try again later.';
        console.error(err);
      }
    });
  }

  viewClient(id: string): void {
    this.router.navigate(['/admin/dashboard/clients', id]);
  }

  editClient(id: string): void {
    this.router.navigate(['/admin/dashboard/clients/edit', id]);
  }

  deleteClient(id: string): void {
    this.router.navigate(['/admin/dashboard/clients/delete', id]);
  }

  createClient() {
    this.router.navigate(['/admin/dashboard/clients/create']);
  }
}
