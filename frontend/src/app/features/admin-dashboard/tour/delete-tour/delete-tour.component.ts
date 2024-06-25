import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from '../../../../core/services/tour.service';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-delete-tour',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-tour.component.html',
  styleUrl: './delete-tour.component.css'
})
export class DeleteTourComponent {

  tour: any;
  error: string = '';
  success: string = '';

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    const tourId = this.route.snapshot.paramMap.get('id');
    if (tourId) {
      this.getTour(tourId);
    }
  }

  getTour(id: string): void {
    this.tourService.getTourById(id).subscribe({
      next: (data) => {
        this.tour = data;
      },
      error: (err) => {
        this.error = 'Failed to load tour. Please try again later.';
        console.error(err);
      }
    });
  }

  deleteTour(): void {
    if (confirm('Are you sure you want to delete this tour?')) {
      this.tourService.deleteTour(this.tour.id).subscribe({
        next: () => {
          this.success = 'Tour deleted successfully!';
          setTimeout(() => {
            this.router.navigate(['/admin/dashboard/tours']);
          }, 2000);
        },
        error: (err) => {
          this.error = 'Failed to delete tour. Please try again later.';
          console.error(err);
        }
      });
    }
  }

  cancel(): void {
    this.location.back();
  }
}
