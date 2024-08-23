import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialUiModule } from '@material-ui/material-ui.module';
import { Bill } from '@models/bill.model';
import { Order } from '@models/order.model';
import { BillService } from '@services/bill.service';
import { OrderService } from '@services/order.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-bill',
  standalone: true,
  imports: [MaterialUiModule],
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.scss',
})
export class BillComponent implements OnInit {
  dataSource = new MatTableDataSource<Bill>();
  displayedColumns: string[] = ['orderId' , 'costumer', 'status', 'total', 'actions' ];

  constructor(
    private billService: BillService,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.getAllBills();
  }

  getAllBills() {
    this.billService.getBillOpened().subscribe({
      next: (bills) => {
      this.dataSource = new MatTableDataSource(bills);
      console.log(bills)
      },
    });
  }

  sumTotalBill(element: Order){
    return element.orderItems.reduce((sum, current) => sum + ( current?.quantity * current?.product?.price), 0);
  }
  

  generatePdf() {
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
