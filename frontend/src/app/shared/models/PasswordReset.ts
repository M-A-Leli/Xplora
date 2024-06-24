// !
import { User } from "./User";

export interface PasswordReset {
  reset_id?: string;
  user_id: string;
  reset_code: string;
  expiration_time: Date;
  is_valid: boolean;

  User: User;
}
