import { OrderItems } from './order-item.model';

export class Order {
  orderId!: number;
  orderItems!: OrderItems[];
}
