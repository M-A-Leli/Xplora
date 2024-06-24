import { User } from "./User";

export interface Client {
  client_id?: string;
  user_id: string;

  User: User;
}
