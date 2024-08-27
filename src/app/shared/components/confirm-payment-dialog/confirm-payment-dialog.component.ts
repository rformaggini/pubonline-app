import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  PaymentMethod,
  PaymentMethodLabelMapping,
} from '@enums/payment-method';
import { MaterialUiModule } from '@material-ui/material-ui.module';
import { Payment } from '@models/payment.model';

@Component({
  selector: 'app-confirm-payment-dialog',
  standalone: true,
  imports: [MaterialUiModule, FormsModule],
  templateUrl: './confirm-payment-dialog.component.html',
  styleUrl: './confirm-payment-dialog.component.css',
})
export class ConfirmPaymentDialogComponent implements OnInit{
  paymentMethodLabelMapping = PaymentMethodLabelMapping;
  paymentMethodTypes: PaymentMethod[] = Object.values(PaymentMethod);

  constructor(
    public dialogRef: MatDialogRef<ConfirmPaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Payment,
  ) {}

  ngOnInit() {
    console.log('DATA', this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
