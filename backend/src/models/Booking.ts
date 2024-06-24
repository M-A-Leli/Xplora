// models/Booking.ts

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

class Booking {
  private _booking_id: string;
  private _user_id: string;
  private _tour_id: string;
  private _booking_date: Date;
  private _status: BookingStatus;
  private _created_at: Date;
  private _updated_at: Date;

  constructor(
    booking_id: string,
    user_id: string,
    tour_id: string,
    booking_date: Date,
    status: BookingStatus,
    created_at: Date,
    updated_at: Date
  ) {
    this._booking_id = booking_id;
    this._user_id = user_id;
    this._tour_id = tour_id;
    this._booking_date = booking_date;
    this._status = status;
    this._created_at = created_at;
    this._updated_at = updated_at;
  }

  // Getters
  get booking_id(): string {
    return this._booking_id;
  }

  get user_id(): string {
    return this._user_id;
  }

  get tour_id(): string {
    return this._tour_id;
  }

  get booking_date(): Date {
    return this._booking_date;
  }

  get status(): BookingStatus {
    return this._status;
  }

  get created_at(): Date {
    return this._created_at;
  }

  get updated_at(): Date {
    return this._updated_at;
  }

  // Setters
  set booking_id(value: string) {
    this._booking_id = value;
  }

  set user_id(value: string) {
    this._user_id = value;
  }

  set tour_id(value: string) {
    this._tour_id = value;
  }

  set booking_date(value: Date) {
    this._booking_date = value;
  }

  set status(value: BookingStatus) {
    this._status = value;
  }

  set created_at(value: Date) {
    this._created_at = value;
  }

  set updated_at(value: Date) {
    this._updated_at = value;
  }
}

export default Booking;
