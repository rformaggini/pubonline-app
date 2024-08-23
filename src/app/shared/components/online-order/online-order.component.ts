import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MaterialUiModule } from '@material-ui/material-ui.module';
import { OrderItems } from '@models/order-item.model';
import { Order } from '@models/order.model';
import { OrderService } from '@services/order.service';
import { SnackbarService } from '@services/snackbar.service';
import { AddBillDetailsDialogComponent } from '@shared-components/add-bill-details-dialog/add-bill-details-dialog.component';
import { AddOrderItemDialogComponent } from '@shared-components/add-order-item-dialog/add-order-item-dialog.component';
import { BriefOrderComponent } from '@shared-components/brief-order/brief-order.component';
import { OrderDetailsComponent } from '@shared-components/order-details/order-details.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-online-order',
  standalone: true,
  imports: [MaterialUiModule, BriefOrderComponent, OrderDetailsComponent],
  templateUrl: './online-order.component.html',
  styleUrl: './online-order.component.scss',
})
export class OnlineOrderComponent implements OnInit {
  listOrderOnline: Order[] = [];
  listOrderItems!: Order;

  constructor(
    private orderService: OrderService,
    private ngxLoaderService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private dialogData: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getTableData();
  }

  getTableData() {
    this.orderService.getAllOrders().subscribe({
      next: (listOrders) => {
        this.listOrderOnline = listOrders;
        console.log(listOrders);
      },
    });
  }

  sendProductsDetails(event: any) {
    this.listOrderItems = event;
  }

  addOrderHandler() {
    this.ngxLoaderService.start();
    this.orderService.createOrder().subscribe({
      next:(order: Order) => {
        this.ngxLoaderService.stop();
        
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          data: order,
          actionName: 'ADD'
        };
        dialogConfig.width = '500px';
        const dialogRef = this.dialogData.open(
          AddBillDetailsDialogComponent,
          dialogConfig,
        );
        dialogRef.componentInstance.addBillDetailsEmitter.subscribe(() => {
          this.snackbarService.openSnackBar('Order created successfully', '');
          dialogRef.close();
          this.getTableData();
        });
      }
      ,error: () => {
        this.ngxLoaderService.stop();
        this.snackbarService.openSnackBar('Something went wrong trying to create order', 'error');
      }
    })
  }

  deleteOrder(value: number) {
      this.ngxLoaderService.start();
    this.orderService.deleteOrder(value).subscribe({
      next: () => {
        this.ngxLoaderService.stop();
        this.snackbarService.openSnackBar('Order deleted successfully', '');
        this.getTableData();
      },
      error: () => {
        this.ngxLoaderService.stop();
        this.snackbarService.openSnackBar('Something went wrongtrying to delete', 'error');
      }
    });
  }

  addProductsHandler() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      data: this.listOrderItems,
    };
    dialogConfig.width = '800px';
    const dialogRef = this.dialog.open(
      AddOrderItemDialogComponent,
      dialogConfig,
    );
    dialogRef.componentInstance.addProductsToOrderEmitter.subscribe(() => {
      this.getTableData();
    });

  }

  deleteProductFromOrder(value: OrderItems, orderId: number) {
    this.ngxLoaderService.start();
    if(value.product?.productId) {
      this.orderService.deleteProductFromOrder(orderId, value.product.productId).subscribe({
        next: () => {
          this.ngxLoaderService.stop();
          this.listOrderItems.orderItems.splice(this.listOrderItems.orderItems.indexOf(value), 1)
          this.snackbarService.openSnackBar('Order deleted successfully', '');
          this.getTableData();
        },
        error: () => {
          this.ngxLoaderService.stop();
          this.snackbarService.openSnackBar('Something went wrong trying to delete', 'error');
        }
      });
    }
  }
}
