import { PaymentMethod } from '@enums/payment-method';

export class Payment {
  billId!: number;
  method!: PaymentMethod;
}
