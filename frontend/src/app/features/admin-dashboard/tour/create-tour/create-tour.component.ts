import { Component } from '@angular/core';
import { TourService } from '../../../../core/services/tour.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { CategoryService } from '../../../../core/services/category.service';
import { Tour } from '../../../../shared/models/Tour';

@Component({
  selector: 'app-create-tour',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.css']
})
export class CreateTourComponent {
  tour: any = {
    title: "",
    description: "",
    destination: "",
    price: 0,
    category_id: "",
    start_date: "",
    end_date: "",
    images: []
  };
  error: string = '';
  categories: any[] = [];
  selectedCategoryId: string = '';

  constructor(
    private tourService: TourService,
    private router: Router,
    private categoryService: CategoryService,
    private location: Location
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  createTour(): void {
    this.tourService.createTour(this.tour).subscribe({
      next: () => {
        this.router.navigate(['/admin/dashboard/tours']);
      },
      error: (err) => {
        if (err.status === 409 || err.status === 400) {
          this.error = err.error.error.message;
          setTimeout(() => {
            this.error = '';
          }, 3000);
        } else {
          this.error = 'An unexpected error occurred. Please try again.';
          setTimeout(() => {
            this.error = '';
          }, 3000);
        }
      }
    });
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        this.error = 'Error fetching categories';
        setTimeout(() => {
          this.error = '';
        }, 3000);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  onFileChange(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.tour.images[index] = file;
    }
  }
}
