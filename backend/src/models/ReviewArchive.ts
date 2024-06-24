// models/ReviewArchive.ts

import Review from "./Review";

class ReviewArchive extends Review {
  private _deleted_at: Date;

  constructor(
    review_id: string,
    user_id: string,
    tour_id: string,
    rating: number,
    comment: string,
    created_at: Date,
    deleted_at: Date
  ) {
    super(
      review_id,
      user_id,
      tour_id,
      rating,
      comment,
      created_at
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

export default ReviewArchive;
