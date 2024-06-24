import { Component } from '@angular/core';
import { TourService } from '../../../../core/services/tour.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../../core/services/category.service';

@Component({
  selector: 'app-create-tour',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-tour.component.html',
  styleUrl: './create-tour.component.css'
})
export class CreateTourComponent {
  tour = {
    title: "",
    description: "",
    destination: "",
    price: 0, //!
    category_id: "",
    start_date: "",
    end_date: "",
    images: []
  }
  error: string = '';

  categories: any[] = [];

  selectedCategoryId: string = '';

  constructor(private tourService: TourService, private router: Router, private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  createTour(): void {
    this.tour.category_id = this.selectedCategoryId; //!

    this.tourService.createTour(this.tour).subscribe({
      next: () => {
        this.router.navigate(['/admin/dashboard/tours']);
      },
      error: (err) => {
        this.error = 'Failed to create tour. Please try again later.';
        console.error(err);
      }
    });
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
        // Handle error as needed
      }
    );
  }
}
