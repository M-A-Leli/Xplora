import { Component } from '@angular/core';
import { BookingService } from '../../../core/services/booking.service';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../../core/services/review.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  bookings: any[] = [];
  userId: string = '';
  showCancelModal: boolean = false;
  bookingToCancel: string | null = null;

  constructor(
    private bookingService: BookingService,
    private reviewService: ReviewService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId() as string;
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getBookingsByUserId(this.userId).subscribe({
      next: (data) => this.bookings = data,
      error: (err) =>  {
        console.error(err);
        // (document.getElementById('no-bookings-message') as HTMLParagraphElement).innerText = '' + err.error.error.status;
      }
    });
  }

  openCancelModal(bookingId: string): void {
    this.showCancelModal = true;
    this.bookingToCancel = bookingId;
  }

  closeCancelModal(): void {
    this.showCancelModal = false;
    this.bookingToCancel = null;
  }

  // reviewTour(tour_id: string): void {
  //   this.router.navigate(['/client/dashboard/bookings/review', tour_id]);
  // }

  cancelBooking(): void {
    if (this.bookingToCancel) {
      // this.bookingService.cancelBooking(this.bookingToCancel).subscribe({
      this.bookingService.deleteBooking(this.bookingToCancel).subscribe({
        next: () => {
          this.bookings = this.bookings.filter(booking => booking.booking_id !== this.bookingToCancel);
          this.closeCancelModal();
        },
        error: (err) => console.error(err)
      });
    }
  }
}
