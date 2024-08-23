import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialUiModule } from '@material-ui/material-ui.module';
import { BillCreate } from '@models/bill-create.model';
import { Order } from '@models/order.model';
import { BillService } from '@services/bill.service';

@Component({
  selector: 'app-add-bill-details-dialog',
  standalone: true,
  imports: [MaterialUiModule, ReactiveFormsModule],
  templateUrl: './add-bill-details-dialog.component.html',
  styleUrl: './add-bill-details-dialog.component.css',
})
export class AddBillDetailsDialogComponent implements OnInit {
  addBillDetailsEmitter = new EventEmitter();

  actionName: string = '';
  errorMessage: string = '';
  order!: Order;

  name = new FormControl('', Validators.required);
  contactNumber = new FormControl<string>('');
  email = new FormControl<string>('');

  constructor(
    public dialogRef: MatDialogRef<AddBillDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public dialogData: { data: Order; action: string },
    private billService: BillService,
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    if (this.dialogData) {
      this.order = this.dialogData.data;
      this.actionName = this.dialogData.action?.toLocaleUpperCase();
    }
  }

  submitHandler() {
    let billDetails = new BillCreate();

    billDetails = {
      name: this.name.value ? this.name.value : '',
      contactNumber: this.contactNumber.value ? this.contactNumber.value : '',
      email: this.email.value ? this.email.value : '',
      orderId: this.order.orderId
    };

    if (!this.validateDataRequired()) {
      this.billService.openBill(billDetails).subscribe({
        next: () => {
          this.addBillDetailsEmitter.emit();
        },
        error: () => {
        },
      });
    }
  }

  updateErrorMessage() {
    if (this.validateDataRequired()) {
      this.errorMessage = 'You must enter a value';
    }
  }

  private validateDataRequired(): boolean {
    if (this.name.hasError('required')) {
      return true;
    } else {
      return false;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
