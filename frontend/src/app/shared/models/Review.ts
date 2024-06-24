import { Tour } from "./Tour";
import { User } from "./User";

export interface Review {
  review_id?: string;
  user_id: string;
  tour_id: string;
  rating: number;
  comment: string;
  created_at?: Date;

  User: User;
  Tour: Tour;
}
