// models/Category.ts

class Category {
  private _category_id: string;
  private _category_name: string;

  constructor(category_id: string, category_name: string) {
    this._category_id = category_id;
    this._category_name = category_name;
  }

  // Getters
  get category_id(): string {
    return this._category_id;
  }

  get category_name(): string {
    return this._category_name;
  }

  // Setters
  set category_id(value: string) {
    this._category_id = value;
  }

  set category_name(value: string) {
    this._category_name = value;
  }
}

export default Category;
