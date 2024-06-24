// models/userArchive.ts

import User from "./User";

class UserArchive extends User {
    private _deleted_at: Date;

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
        deleted_at: Date
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
            new Date() // Pass a placeholder date for updated_at
        );
        this._deleted_at = deleted_at;
    }

    // Getters
    get deleted_at(): Date {
        return this._deleted_at;
    }

    // Setters
    set deleted_at(value: Date) {
        this._deleted_at = value;
    }
}

export default UserArchive;
