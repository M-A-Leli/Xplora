import { ChangeDetectorRef, Component } from '@angular/core';
import { TourService } from '../../../core/services/tour.service';
import { CommonModule } from '@angular/common';
import { TourCardComponent } from '../tour-card/tour-card.component';
import { CategoryService } from '../../../core/services/category.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { BookingService } from '../../../core/services/booking.service';

@Component({
  selector: 'app-tour-list',
  standalone: true,
  imports: [CommonModule, TourCardComponent, FormsModule],
  templateUrl: './tour-list.component.html',
  styleUrl: './tour-list.component.css'
})
export class TourListComponent {

  tours: any[] = []; // Assuming this holds all tours initially
  filteredTours: any[] = []; // Holds tours after filtering by category
  categories: any[] = []; // Assuming this holds all categories

  selectedCategoryId: string = ''; // Initialize selected category ID

  searchQuery: string = '';

  constructor(private tourService: TourService, private categoryService: CategoryService, private authService: AuthService, private bookingService: BookingService) { }

  ngOnInit() {
    this.loadTours(); // Initial load of all tours
    this.loadCategories(); // Load categories for dropdown
  }

  loadTours() {
    this.tourService.getAllTours().subscribe(
      (data) => {
        this.tours = data;
        this.filteredTours = this.tours; // Initialize filteredTours with all tours
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
          this.filteredTours = data; // Update filtered tours based on selected category
        },
        (error) => {
          console.error('Error fetching tours by category:', error);
          // Handle error as needed
        }
      );
    } else {
      this.filteredTours = this.tours; // Reset to all tours if no category selected
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
    const token = this.authService.getToken(); // Assuming getCurrentUser() returns user details
    if (!token) {
      console.error('User not authenticated.'); // Handle case where user is not authenticated
      return;
    }

    const bookingData = {
      user_id: '', //! Assuming user_id is accessible from user object
      tour_id: tour.tour_id
    };

    this.bookingService.createBooking(bookingData).subscribe(
      (response) => {
        console.log('Booking successful:', response);
        // Show success message to the user
        alert('Booking successful!');
        // Optionally update UI or navigate to booking details page
      },
      (error) => {
        console.error('Error booking tour:', error);
        // Show error message to the user
        alert('Failed to book tour. Please try again.');
      }
    );
  }
}
