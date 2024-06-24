import { Booking } from "./Booking";
import { Category } from "./Category";
import { Review } from "./Review";
import { TourImage } from "./TourImage";

export interface Tour {
  tour_id?: string;
  title: string;
  description: string;
  destination: string;
  price: number;
  category_id: string;
  start_date: Date;
  end_date: Date;

  Category: Category;
  Bookings?: Booking[];
  Reviews?: Review[];
  TourImages?: TourImage[];
}
