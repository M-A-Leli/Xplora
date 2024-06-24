import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  slides = [
    {
      image: 'assets/tour.jpg',
      title: 'Explore the Beauty of Kenya',
      description: 'Discover breathtaking landscapes and diverse wildlife.'
    },
    {
      image: 'assets/tour.jpg',
      title: 'Experience the Culture',
      description: 'Immerse yourself in rich traditions and vibrant communities.'
    },
    {
      image: 'assets/tour.jpg',
      title: 'Adventure Awaits',
      description: 'Join us for thrilling outdoor activities and unforgettable experiences.'
    }
  ];
  currentSlide = 0;

  ngOnInit() {
    this.startCarousel();
  }

  startCarousel() {
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
}
