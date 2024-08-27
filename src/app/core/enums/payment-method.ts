export enum PaymentMethod {
  DEBIT_CARD = 'DEBIT_CARD',
  CREDIT_CARD = 'CREDIT_CARD',
  CASH = 'CASH',
}

export const PaymentMethodLabelMapping: Record<PaymentMethod, string> = {
  [PaymentMethod.CASH]: 'CASH',
  [PaymentMethod.CREDIT_CARD]: 'CREDIT CARD',
  [PaymentMethod.DEBIT_CARD]: 'DEBIT CARD',
};
