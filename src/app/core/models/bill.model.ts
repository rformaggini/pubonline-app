import { PaymentMethod } from '@enums/payment-method';
import { Order } from './order.model';
import { PaymentStatus } from '@enums/payment-status';

export class Bill {
  name!: string;
  contactNumber!: string;
  email!: string;
  paymentMethod!: PaymentMethod;
  status!: PaymentStatus;
  order!: Order
}
