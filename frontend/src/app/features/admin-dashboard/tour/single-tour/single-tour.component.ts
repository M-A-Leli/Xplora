import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TourService } from '../../../../core/services/tour.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-tour',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-tour.component.html',
  styleUrl: './single-tour.component.css'
})
export class SingleTourComponent {
  tour: any;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService,
    private location: Location
  ) {}

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

  goBack(): void {
    this.location.back();
  }
}
