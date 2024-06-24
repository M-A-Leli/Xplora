import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.css'
})
export class HowItWorksComponent {
  // Static data for "How It Works" section
  steps = [
    {
      number: 1,
      title: 'Browse Tours',
      description: 'Explore our curated list of tours and travel experiences.'
    },
    {
      number: 2,
      title: 'Book Your Adventure',
      description: 'Select your preferred tour, choose dates, and book instantly.'
    },
    {
      number: 3,
      title: 'Enjoy Your Trip',
      description: 'Embark on your journey and immerse yourself in the beauty of Kenya.'
    }
  ];
}
