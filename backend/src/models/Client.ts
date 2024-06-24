// models/Client.ts

import User from './User';

class Client extends User {
  private _client_id: string;

  constructor(
    client_id: string,
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
    this._client_id = client_id;
  }

  // Getters
  get client_id(): string {
    return this._client_id;
  }

  // Setters
  set client_id(value: string) {
    this._client_id = value;
  }
}

export default Client;
