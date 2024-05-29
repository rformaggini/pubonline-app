import { Category } from "./category.model";

export class ProductCreate {
  productId?: number;
  name!: string;
  categoryId!: number;
  category?: Category;
  price!: number;
  description?: string | undefined | null;
}
