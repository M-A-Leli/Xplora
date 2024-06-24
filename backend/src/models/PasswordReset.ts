// models/PasswordReset.ts

class PasswordReset {
  private _reset_id: string;
  private _user_id: string;
  private _reset_code: string;
  private _is_valid: boolean;
  private _expiration_time: Date;
  private _created_at: Date;

  constructor(
    reset_id: string,
    user_id: string,
    reset_code: string,
    is_valid: boolean,
    expiration_time: Date,
    created_at: Date
  ) {
    this._reset_id = reset_id;
    this._user_id = user_id;
    this._reset_code = reset_code;
    this._is_valid = is_valid;
    this._expiration_time = expiration_time;
    this._created_at = created_at;
  }

  // Getters
  get reset_id(): string {
    return this._reset_id;
  }

  get user_id(): string {
    return this._user_id;
  }

  get reset_code(): string {
    return this._reset_code;
  }

  get is_valid(): boolean {
    return this._is_valid;
  }

  get expiration_time(): Date {
    return this._expiration_time;
  }

  get created_at(): Date {
    return this._created_at;
  }

  // Setters
  set reset_id(value: string) {
    this._reset_id = value;
  }

  set user_id(value: string) {
    this._user_id = value;
  }

  set reset_code(value: string) {
    this._reset_code = value;
  }

  set is_valid(value: boolean) {
    this._is_valid = value;
  }

  set expiration_time(value: Date) {
    this._expiration_time = value;
  }

  set created_at(value: Date) {
    this._created_at = value;
  }
}

export default PasswordReset;
