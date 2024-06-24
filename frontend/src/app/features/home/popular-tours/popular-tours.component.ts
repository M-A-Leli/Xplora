import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-popular-tours',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popular-tours.component.html',
  styleUrl: './popular-tours.component.css'
})
export class PopularToursComponent {
  tours = [
    {
      id: 1,
      image: 'assets/tour1.jpg',
      title: 'Nairobi National Park Tour',
      description: 'Explore the wildlife and nature of Nairobi National Park.',
    },
    {
      id: 2,
      image: 'assets/tour2.jpg',
      title: 'Maasai Mara Safari',
      description: 'Experience the famous Maasai Mara with our guided safari.',
    },
    {
      id: 3,
      image: 'assets/tour3.jpg',
      title: 'Mount Kenya Hike',
      description: 'Challenge yourself with a hike up Mount Kenya.',
    }
  ];

  learnMore(tourId: number) {
    // Navigate to the tour details page
    console.log('Navigate to tour details for tour ID:', tourId);
  }
}
