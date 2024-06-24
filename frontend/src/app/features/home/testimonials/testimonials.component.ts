import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent {
  testimonials = [
    {
      photo: 'assets/user1.jpg',
      name: 'John Doe',
      feedback: 'Xplora made my trip to Kenya unforgettable. The tours were well organized and the guides were fantastic!'
    },
    {
      photo: 'assets/user2.jpg',
      name: 'Jane Smith',
      feedback: 'I loved the cultural excursions offered by Xplora. It was a great way to experience the local culture and traditions.'
    },
    {
      photo: 'assets/user3.jpg',
      name: 'Samuel Lee',
      feedback: 'The weekend getaways were perfect for a quick escape from the city. Highly recommended!'
    }
  ];
}
