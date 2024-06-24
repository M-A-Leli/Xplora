import { Admin } from "./Admin";
import { Booking } from "./Booking";
import { Client } from "./Client";
import { PasswordReset } from "./PasswordReset";
import { Review } from "./Review";

export interface User {
  user_id?: string;
  username: string;
  email: string;
  password: string;
  salt: string;
  first_name: string;
  last_name: string;
  phone_number: string;

  Client?: Client;
  Admin?: Admin;
  Bookings?: Booking[];
  Reviews?: Review[];
  PasswordResets?: PasswordReset[];
}
