// models/TourArchive.ts

import Tour from "./Tour";

class TourArchive extends Tour {
  private _deleted_at: Date;

  constructor(
    tour_id: string,
    title: string,
    description: string,
    destination: string,
    price: number,
    category_id: string,
    start_date: Date,
    end_date: Date,
    created_at: Date,
    deleted_at: Date
  ) {
    super(
      tour_id,
      title,
      description,
      destination,
      price,
      category_id,
      start_date,
      end_date,
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

export default TourArchive;
