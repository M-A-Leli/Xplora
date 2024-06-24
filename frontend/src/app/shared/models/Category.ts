import { Tour } from "./Tour";

export interface Category {
  category_id?: string;
  category_name: string;

  Tours?: Tour[];
}
