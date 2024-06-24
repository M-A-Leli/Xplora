// models/Review.ts

class Review {
  private _review_id: string;
  private _user_id: string;
  private _tour_id: string;
  private _rating: number;
  private _comment: string;
  private _created_at: Date;

  constructor(
    review_id: string,
    user_id: string,
    tour_id: string,
    rating: number,
    comment: string,
    created_at: Date
  ) {
    this._review_id = review_id;
    this._user_id = user_id;
    this._tour_id = tour_id;
    this._rating = rating;
    this._comment = comment;
    this._created_at = created_at;
  }

  // Getters
  get review_id(): string {
    return this._review_id;
  }

  get user_id(): string {
    return this._user_id;
  }

  get tour_id(): string {
    return this._tour_id;
  }

  get rating(): number {
    return this._rating;
  }

  get comment(): string {
    return this._comment;
  }

  get created_at(): Date {
    return this._created_at;
  }

  // Setters
  set review_id(value: string) {
    this._review_id = value;
  }

  set user_id(value: string) {
    this._user_id = value;
  }

  set tour_id(value: string) {
    this._tour_id = value;
  }

  set rating(value: number) {
    this._rating = value;
  }

  set comment(value: string) {
    this._comment = value;
  }

  set created_at(value: Date) {
    this._created_at = value;
  }
}

export default Review;
