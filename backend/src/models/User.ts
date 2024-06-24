// models/User.ts

class User {
    private _user_id: string;
    private _username: string;
    private _email: string;
    private _password_hash: string;
    private _password_salt: string;
    private _first_name: string;
    private _last_name: string;
    private _phone_number: string;
    private _created_at: Date;
    private _updated_at: Date;

    constructor(
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
        this._user_id = user_id;
        this._username = username;
        this._email = email;
        this._password_hash = password_hash;
        this._password_salt = password_salt;
        this._first_name = first_name;
        this._last_name = last_name;
        this._phone_number = phone_number;
        this._created_at = created_at;
        this._updated_at = updated_at;
    }

    // Getters
    get user_id(): string {
        return this._user_id;
    }

    get username(): string {
        return this._username;
    }

    get email(): string {
        return this._email;
    }

    get password_hash(): string {
        return this._password_hash;
    }

    get password_salt(): string {
        return this._password_salt;
    }

    get first_name(): string {
        return this._first_name;
    }

    get last_name(): string {
        return this._last_name;
    }

    get phone_number(): string {
        return this._phone_number;
    }

    get created_at(): Date {
        return this._created_at;
    }

    get updated_at(): Date {
        return this._updated_at;
    }

    // Setters
    set user_id(value: string) {
        this._user_id = value;
    }

    set username(value: string) {
        this._username = value;
    }

    set email(value: string) {
        this._email = value;
    }

    set password_hash(value: string) {
        this._password_hash = value;
    }

    set password_salt(value: string) {
        this._password_salt = value;
    }

    set first_name(value: string) {
        this._first_name = value;
    }

    set last_name(value: string) {
        this._last_name = value;
    }

    set phone_number(value: string) {
        this._phone_number = value;
    }

    set created_at(value: Date) {
        this._created_at = value;
    }

    set updated_at(value: Date) {
        this._updated_at = value;
    }
}

export default User;
