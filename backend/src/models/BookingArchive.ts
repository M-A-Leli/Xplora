// models/BookingArchive.ts

import Booking, { BookingStatus } from "./Booking";

class BookingArchive extends Booking {
  private _deleted_at: Date;

  constructor(
    booking_id: string,
    user_id: string,
    tour_id: string,
    booking_date: Date,
    status: BookingStatus,
    created_at: Date,
    deleted_at: Date
  ) {
    super(
      booking_id,
      user_id,
      tour_id,
      booking_date,
      status,
      created_at,
      new Date() // Pass a placeholder date for updated_at
    );
    this._deleted_at = deleted_at;
  }

  // Getters
  get deleted_at(): Date {
    return this._deleted_at;
  }

  // Setters
  set deleted_at(value: Date) {
    this._deleted_at = value;
  }
}

export default BookingArchive;
