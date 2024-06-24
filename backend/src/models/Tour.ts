// models/Tour.ts

class Tour {
  private _tour_id: string;
  private _title: string;
  private _description: string;
  private _destination: string;
  private _price: number;
  private _category_id: string;
  private _start_date: Date;
  private _end_date: Date;
  private _created_at: Date;
  private _updated_at: Date;

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
    updated_at: Date
  ) {
    this._tour_id = tour_id;
    this._title = title;
    this._description = description;
    this._destination = destination;
    this._price = price;
    this._category_id = category_id;
    this._start_date = start_date;
    this._end_date = end_date;
    this._created_at = created_at;
    this._updated_at = updated_at;
  }

  // Getters
  get tour_id(): string {
    return this._tour_id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get destination(): string {
    return this._destination;
  }

  get price(): number {
    return this._price;
  }

  get category_id(): string {
    return this._category_id;
  }

  get start_date(): Date {
    return this._start_date;
  }

  get end_date(): Date {
    return this._end_date;
  }

  get created_at(): Date {
    return this._created_at;
  }

  get updated_at(): Date {
    return this._updated_at;
  }

  // Setters
  set tour_id(value: string) {
    this._tour_id = value;
  }

  set title(value: string) {
    this._title = value;
  }

  set description(value: string) {
    this._description = value;
  }

  set destination(value: string) {
    this._destination = value;
  }

  set price(value: number) {
    this._price = value;
  }

  set category_id(value: string) {
    this._category_id = value;
  }

  set start_date(value: Date) {
    this._start_date = value;
  }

  set end_date(value: Date) {
    this._end_date = value;
  }

  set created_at(value: Date) {
    this._created_at = value;
  }

  set updated_at(value: Date) {
    this._updated_at = value;
  }
}

export default Tour;
