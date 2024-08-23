import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialUiModule } from '@material-ui/material-ui.module';
import { OrderItemsWrapper } from '@models/order-item-wrapper.model';
import { OrderItems } from '@models/order-item.model';
import { Order } from '@models/order.model';
import { Product } from '@models/product.model';
import { OrderService } from '@services/order.service';
import { ProductService } from '@services/product.service';
import { SnackbarService } from '@services/snackbar.service';
import { OrderDetailsComponent } from '@shared-components/order-details/order-details.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-add-order-item-dialog',
  standalone: true,
  imports: [MaterialUiModule, ReactiveFormsModule, OrderDetailsComponent],
  templateUrl: './add-order-item-dialog.component.html',
  styleUrl: './add-order-item-dialog.component.scss',
})
export class AddOrderItemDialogComponent implements OnInit {
  addProductsToOrderEmitter = new EventEmitter();

  productsList: Product[] = [];
  productsSelected: OrderItems[] = [];

  productId = new FormControl(undefined, [Validators.required]);
  quantity = new FormControl(undefined, [Validators.required]);

  actionName!: string;
  errorMessage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogData: { message: string; data: Order; action: string },
    public dialogRef: MatDialogRef<AddOrderItemDialogComponent>,
    private ngxLoaderService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
    private productService: ProductService,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.productsSelected = this.dialogData.data.orderItems;
    this.actionName = 'ADD NEW PRODUCTS';

    this.getProductsList();
  }

  private getProductsList() {
    this.productService.getAllProductsActive().subscribe({
      next: (res) => {
        this.productsList = res;
      },
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addProductToList() {
    if (this.quantity.valid && this.productId.valid) {
      const productToAdd = this.productsList.find(
        (p) => p.productId == this.productId.value,
      );

      if (this.quantity.value && productToAdd) {
        if (
          this.productsSelected.some(
            (p) => p.product.productId == productToAdd.productId,
          )
        ) {
          this.productsSelected.forEach((p) => {
            if (p.product.productId == productToAdd.productId) {
              p.quantity =
                (this.quantity.value ? this.quantity.value : 0) + p.quantity;
                this.saveProduct(p, false);
            }
          });
        } else {

          this.saveProduct({product: productToAdd, quantity: this.quantity.value }, true);
          
        }
        this.quantity.reset();
        this.productId.reset();
      }
    }
  }

  private saveProduct(productItem: OrderItems, isNewProduct: boolean){
    this.ngxLoaderService.start();

    let productToSave: OrderItemsWrapper;

    if (productItem.product.productId) {
      productToSave = {
        quantity: productItem.quantity,
        productId: productItem.product.productId,
        orderId: this.dialogData.data.orderId,
      };
    
    this.orderService.addProductToOrder(productToSave).subscribe({
      next: () => {
        this.ngxLoaderService.stop();
        if(isNewProduct){
          this.productsSelected.push(productItem);
        }
        this.snackbarService.openSnackBar(
          'Products updated successfully',
          '',
        );
        this.addProductsToOrderEmitter.emit();
      },
      error: () => {
        this.ngxLoaderService.stop();
        this.snackbarService.openSnackBar(
          'Somenthing went wrong tryig to update the order',
          'error',
        );
      },
    });
    }
  }

  deleteProductFromOrder(value: OrderItems, orderId: number) {
    this.ngxLoaderService.start();
    if(value.product?.productId) {
      this.orderService.deleteProductFromOrder(orderId, value.product.productId).subscribe({
        next: () => {
          this.ngxLoaderService.stop();
          this.productsSelected.splice(this.productsSelected.indexOf(value), 1)
          this.snackbarService.openSnackBar('Order deleted successfully', '');
          this.addProductsToOrderEmitter.emit();
        },
        error: () => {
          this.ngxLoaderService.stop();
          this.snackbarService.openSnackBar('Something went wrongtrying to delete', 'error');
        }
      });
    }
  }
}
