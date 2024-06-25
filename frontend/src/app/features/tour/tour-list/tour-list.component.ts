import { ChangeDetectorRef, Component } from '@angular/core';
import { TourService } from '../../../core/services/tour.service';
import { CommonModule } from '@angular/common';
import { TourCardComponent } from '../tour-card/tour-card.component';
import { CategoryService } from '../../../core/services/category.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { BookingService } from '../../../core/services/booking.service';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tour-list',
  standalone: true,
  imports: [CommonModule, TourCardComponent, FormsModule, HeaderComponent],
  templateUrl: './tour-list.component.html',
  styleUrl: './tour-list.component.css'
})
export class TourListComponent {

  tours: any[] = [];
  filteredTours: any[] = [];
  categories: any[] = [];

  user_id: string = '';

  selectedCategoryId: string = '';

  searchQuery: string = '';

  errorMsg: string = '';

  showErrorModal: boolean = false;
  showSuccessModal: boolean = false;

  constructor(private tourService: TourService, private categoryService: CategoryService, private authService: AuthService, private bookingService: BookingService, private router: Router) { }

  ngOnInit() {
    this.loadTours();
    this.loadCategories();
  }

  loadTours() {
    this.tourService.getAllTours().subscribe(
      (data) => {
        this.tours = data;
        this.filteredTours = this.tours;
      },
      (error) => {
        console.error('Error fetching tours:', error);
        // Handle error as needed
      }
    );
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

  filterByCategory() {
    if (this.selectedCategoryId) {
      this.tourService.getToursByCategoryId(this.selectedCategoryId).subscribe(
        (data) => {
          this.filteredTours = data;
        },
        (error) => {
          console.error('Error fetching tours by category:', error);
          // Handle error as needed
        }
      );
    } else {
      this.filteredTours = this.tours;
    }
  }

  search() {
    this.filteredTours = this.tours.filter((tour) =>
      tour.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    // Apply category filter if category is selected
    this.filterByCategory();
  }

  bookTour(tour: any) {
    const token = this.authService.getToken() as string;
    if (!token) {
      this.router.navigateByUrl('/login');
    } else {
      this.user_id = this.authService.getUserId() as string;

      const newBooking = {
        user_id: this.user_id,
        tour_id: tour.tour_id
      }

      this.bookingService.createBooking(newBooking).subscribe({
        next: data => {
          this.showSuccessModal = true;
          setTimeout(() => {
            this.showSuccessModal = false;
          }, 3000);
        },
        error: err => {
          if (err.status === 409) {
            this.errorMsg = err.error.error.message;
            this.showErrorModal = true;
            setTimeout(() => {
              this.showErrorModal = false;
            }, 3000);
          } else if (err.status === 404) {
            this.errorMsg = err.error.error.message;
            this.showErrorModal = true;
            setTimeout(() => {
              this.showErrorModal = false;
            }, 3000);
          } else {
            this.errorMsg = 'An unexpected error occurred. Please try again.';
            this.showErrorModal = true;
            setTimeout(() => {
              this.showErrorModal = false;
            }, 3000);
          }
        }
      });
    }
  }
}
