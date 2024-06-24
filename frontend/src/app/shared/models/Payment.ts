import { Booking } from "./Booking";

export interface Payment {
  payment_id?: string;
  booking_id: string;
  amount: number;
  payment_method: string;
  payment_status?: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  transaction_date: Date;

  Booking: Booking;
}
