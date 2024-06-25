import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../../core/services/client.service';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-single-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-client.component.html',
  styleUrl: './single-client.component.css'
})
export class SingleClientComponent {
  client: any;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
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
      next: (data) => {
        this.client = data;
      },
      error: (err) => {
        this.error = 'Failed to load client. Please try again later.';
        console.error(err);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
