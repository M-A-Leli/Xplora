import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tour-card',
  standalone: true,
  imports: [],
  templateUrl: './tour-card.component.html',
  styleUrl: './tour-card.component.css'
})
export class TourCardComponent {
  @Input() tour: any;

  bookTour() {
    // Implement booking functionality, e.g., navigate to booking page
    console.log('Book tour:', this.tour.title);
  }
}
