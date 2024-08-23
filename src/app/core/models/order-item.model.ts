import { Product } from './product.model';

export class OrderItems {
  orderItemId?: number;
  product!: Product;
  quantity!: number;
}
