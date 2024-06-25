import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-choose-us.component.html',
  styleUrl: './why-choose-us.component.css'
})
export class WhyChooseUsComponent {
  // Static data for "Why Choose Us" section
  reasons = [
    {
      icon: '/reason1.svg',
      title: 'Expert Guides',
      description: 'Our tours are led by knowledgeable guides who ensure an enriching experience.'
    },
    {
      icon: '/reason2.svg',
      title: 'Unique Experiences',
      description: 'Discover hidden gems and authentic cultural experiences across Kenya.'
    },
    {
      icon: '/reason3.svg',
      title: 'Customized Trips',
      description: 'Tailor your trip according to your preferences and interests.'
    },
    {
      icon: '/reason4.svg',
      title: 'Safety First',
      description: 'We prioritize your safety and adhere to high standards of travel safety.'
    }
  ];
}
