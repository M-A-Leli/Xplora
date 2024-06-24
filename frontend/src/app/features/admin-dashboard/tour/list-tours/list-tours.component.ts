import { Component } from '@angular/core';
import { TourService } from '../../../../core/services/tour.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-tours',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-tours.component.html',
  styleUrl: './list-tours.component.css'
})
export class ListToursComponent {
  tours: any[] = [];
  error: string = '';

  constructor(private tourService: TourService, private router: Router) {}

  ngOnInit(): void {
    this.getTours();
  }

  getTours(): void {
    this.tourService.getAllTours().subscribe({
      next: (data) => {
        this.tours = data;
      },
      error: (err) => {
        this.error = 'Failed to load tours. Please try again later.';
        console.error(err);
      }
    });
  }

  viewTour(id: string): void {
    this.router.navigate(['/admin/dashboard/tours', id]);
  }

  editTour(id: string): void {
    this.router.navigate(['/admin/dashboard/tours/edit', id]);
  }

  deleteTour(id: string): void {
    this.router.navigate(['/admin/dashboard/tours/delete', id]);
  }
}
