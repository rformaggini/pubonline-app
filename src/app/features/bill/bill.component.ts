import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentStatus } from '@enums/payment-status';
import { MaterialUiModule } from '@material-ui/material-ui.module';
import { Bill } from '@models/bill.model';
import { Order } from '@models/order.model';
import { Payment } from '@models/payment.model';
import { BillService } from '@services/bill.service';
import { SnackbarService } from '@services/snackbar.service';
import { ConfirmPaymentDialogComponent } from '@shared-components/confirm-payment-dialog/confirm-payment-dialog.component';
import { DialogConfirmationComponent } from '@shared-components/dialog-confirmation/dialog-confirmation.component';
import { jsPDF } from 'jspdf';
import { NgxUiLoaderService } from 'ngx-ui-loader';
('');

@Component({
  selector: 'app-bill',
  standalone: true,
  imports: [MaterialUiModule],
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.scss',
})
export class BillComponent implements OnInit {
  dataSource = new MatTableDataSource<Bill>();
  displayedColumns: string[] = [
    'orderId',
    'costumer',
    'status',
    'total',
    'actions',
  ];

  constructor(
    private billService: BillService,
    public dialog: MatDialog,
    private ngxLoaderService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.getAllBills();
  }

  getAllBills() {
    this.billService.getBillOpened().subscribe({
      next: (bills) => {
        this.dataSource = new MatTableDataSource(bills);
        console.log(bills);
      },
    });
  }

  sumTotalBill(element: Order) {
    return element.orderItems.reduce(
      (sum, current) => sum + current?.quantity * current?.product?.price,
      0,
    );
  }

  paybill(bill: Bill) {
    const payment: Payment = { billId: bill.id, method: bill.paymentMethod };
    const dialogRef = this.dialog.open(ConfirmPaymentDialogComponent, {
      data: payment,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ngxLoaderService.start();
        payment.method = result;
        this.billService.payBill(payment).subscribe({
          next: () => {
            this.snackbarService.openSnackBar('Bill paid with success.', '');
            this.ngxLoaderService.stop();
            this.getAllBills();
          },
          error: () => {
            this.snackbarService.openSnackBar(
              'Something went wrong trying to paid.',
              'error',
            );
            this.ngxLoaderService.stop();
          },
        });
      }
    });
  }

  cancelBill(billId: number) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { message: `cancel the bill with Id: ${billId}` },
    });

    dialogRef.componentInstance.isConfirmedEmitter.subscribe({
      next: (isConfirmed: boolean) => {
        if (isConfirmed) {
          this.ngxLoaderService.start();
          this.billService.cancelBill(billId).subscribe({
            next: () => {
              this.snackbarService.openSnackBar(
                'Bill cancelled with success.',
                '',
              );
              this.ngxLoaderService.stop();
              this.getAllBills();
              dialogRef.close();
            },
            error: () => {
              this.snackbarService.openSnackBar(
                'Something went wrong trying to cancel the bill.',
                'error',
              );
              this.ngxLoaderService.stop();
              dialogRef.close();
            },
          });
        } else {
          dialogRef.close();
          this.ngxLoaderService.stop();
        }
      },
    });
  }

  disabledByStatus(status: PaymentStatus): boolean {
    switch (status) {
      case PaymentStatus.OPENED:
        return false;
      case PaymentStatus.CLOSED:
        return true;
      case PaymentStatus.PAID:
        return true;
      default:
        return true;
    }
  }

  getColor(element: string) {
    if (element === 'OPENED') {
      return 'green';
    }
    return 'red';
  }

  generatePdf(bill: Bill) {
    console.log(bill);
    const pdf = new jsPDF();

    pdf.setFontSize(20);
    pdf.text('Bill - ', 65, 15);
    pdf.text('0001', 80, 15);

    pdf.setFillColor(50, 50, 50);
    pdf.rect(10, 20, 30, 8, 'FD');
    pdf.rect(10, 28, 30, 8, 'FD');
    pdf.rect(10, 36, 30, 8, 'FD');
    pdf.rect(40, 20, 160, 8, 'S');
    pdf.rect(40, 28, 160, 8, 'S');
    pdf.rect(40, 36, 160, 8, 'S');

    pdf.setFontSize(12);
    pdf.setTextColor(255, 255, 255);
    pdf.text('Name:', 12, 25);
    pdf.text('Contact Number:', 12, 33);
    pdf.text('Email:', 12, 41);
    pdf.text('Payment Method:', 12, 49);

    pdf.setTextColor(0, 0, 0);
    pdf.text('001', 42, 25);
    pdf.text("Notebook 14' i7 8GB 1TB", 42, 33);
    pdf.text('R$ 2400,00', 42, 41);
    pdf.text('R$ 2400,00', 42, 49);

    pdf.save('a4.pdf');
  }
}
