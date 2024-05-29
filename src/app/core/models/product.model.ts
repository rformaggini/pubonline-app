import { ProductStatus } from '@enums/product-status';
import { Category } from './category.model';

export class Product {
  productId?: number;
  name!: string;
  category!: Category;
  description?: string;
  price!: number
  status?: ProductStatus
}
