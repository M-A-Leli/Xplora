import { Component } from '@angular/core';
import { TourService } from '../../../../core/services/tour.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { CategoryService } from '../../../../core/services/category.service';

@Component({
  selector: 'app-edit-tour',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-tour.component.html',
  styleUrl: './edit-tour.component.css'
})
export class EditTourComponent {
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

  categories: any[] = [];

  selectedCategoryId: string = '';

  error: string = '';
  success: string = '';

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService,
    private router: Router,
    private categoryService: CategoryService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadCategories();
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

  updateTour(): void {
    console.log(this.tour)
    this.tourService.updateTour(this.tour.id, this.tour).subscribe({
      next: () => {
        this.success = 'Tour updated successfully!';
        setTimeout(() => {
          this.router.navigate(['/admin/dashboard/tours']);
        }, 2000);
      },
      error: (err) => {
        if (err.status === 409 || err.status === 400) {
          this.error = err.error.error.message;
          setTimeout(() => {
            this.error = '';
          }, 3000);
        } else {
          this.error = 'Failed to update tour. Please try again later.';
          setTimeout(() => {
            this.error = '';
          }, 3000);
        }
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
