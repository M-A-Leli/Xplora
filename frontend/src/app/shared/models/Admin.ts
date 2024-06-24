import { User } from "./User";

export interface Admin {
  admin_id?: string;
  user_id: string;

  User: User;
}
