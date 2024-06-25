import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent implements OnDestroy {
  slides = [
    {
      image: '/tour.jpg',
      title: 'Explore the Beauty of Kenya',
      description: 'Discover breathtaking landscapes and diverse wildlife.'
    },
    {
      image: '/tour.jpg',
      title: 'Experience the Culture',
      description: 'Immerse yourself in rich traditions and vibrant communities.'
    },
    {
      image: '/tour.jpg',
      title: 'Adventure Awaits',
      description: 'Join us for thrilling outdoor activities and unforgettable experiences.'
    }
  ];
  currentSlide = 0;
  private intervalId: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.startCarousel();
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
      this.cdr.markForCheck();  // Explicitly mark for check to update the view
    }, 5000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
