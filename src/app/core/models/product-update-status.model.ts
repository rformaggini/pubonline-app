import { ProductStatus } from '@enums/product-status';

export class ProductUpdateStatus {
  productId?: number;
  status!: ProductStatus;
}
