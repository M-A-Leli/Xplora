import { Payment } from "./Payment";
import { Tour } from "./Tour";
import { User } from "./User";

export interface Booking {
  booking_id?: string;
  user_id: string;
  tour_id: string;
  booking_date: Date;
  status?: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

  User: User;
  Tour: Tour;
  Payments?: Payment[];
}
