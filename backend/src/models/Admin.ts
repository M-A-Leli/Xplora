// models/Admin.ts

import User from "./User";

class Admin extends User {
  private _admin_id: string;

  constructor(
    admin_id: string,
    user_id: string,
    username: string,
    email: string,
    password_hash: string,
    password_salt: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    created_at: Date,
    updated_at: Date
  ) {
    super(
      user_id,
      username,
      email,
      password_hash,
      password_salt,
      first_name,
      last_name,
      phone_number,
      created_at,
      updated_at
    );
    this._admin_id = admin_id;
  }

  // Getters
  get admin_id(): string {
    return this._admin_id;
  }

  // Setters
  set admin_id(value: string) {
    this._admin_id = value;
  }
}

export default Admin;
