import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductStatus } from '@enums/product-status';
import { MaterialUiModule } from '@material-ui/material-ui.module';
import { ResponseModel } from '@models/response-model';
import { ProductService } from '@services/product.service';
import { SnackbarService } from '@services/snackbar.service';
import { DialogConfirmationComponent } from '@shared-components/dialog-confirmation/dialog-confirmation.component';
import { ProductDialogComponent } from '@shared-components/product-dialog/product-dialog.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MaterialUiModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = [
    'productId',
    'name',
    'categoryName',
    'description',
    'price',
    'actions',
  ];
  dataSource: any;
  message!: string;

  constructor(
    private snackbarService: SnackbarService,
    private ngxLoaderService: NgxUiLoaderService,
    private productService: ProductService,
    private dialogData: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getTableData();
  }

  getTableData() {
    this.ngxLoaderService.start();
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.ngxLoaderService.stop();
        const data = res.map(product => { 
         return {...product, status: product.status == ProductStatus.ACTIVE ? true : false}

        })
        this.dataSource = new MatTableDataSource(data);
      },
      error: (ex) => {
        this.ngxLoaderService.stop();
        this.snackbarService.openSnackBar(ex.error?.message, 'error');
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addProductHandler() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'add',
    };
    dialogConfig.width = '450px';
    const dialogRef = this.dialogData.open(
      ProductDialogComponent,
      dialogConfig,
    );
    dialogRef.componentInstance.addProductEmitter.subscribe(() => {
      this.getTableData();
      dialogRef.close();
    });
  }

  onChangeStatus(event: boolean, productId: number) {
    this.ngxLoaderService.start();
    const data = {
      productId: productId,
      status: event ? ProductStatus.ACTIVE : ProductStatus.INACTIVE,
    };

    this.productService.updateStatusProduct(data).subscribe({
      next: () => {
        this.snackbarService.openSnackBar(
          `Product id: ${productId} status updated successfully`,
          '',
        );
        this.ngxLoaderService.stop();
      },
      error: (err) => {
        if(err.error?.message){
          this.snackbarService.openSnackBar(
            err.error?.message,
            'error',
          );
        } else {
          this.snackbarService.openSnackBar(
            `Something went wrong`,
            'error',
          );
        }
        this.ngxLoaderService.stop();
      }
    });
  }

  editProductHandler(value: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'edit',
      data: value,
    };
    dialogConfig.width = '450px';
    const dialogRef = this.dialogData.open(
      ProductDialogComponent,
      dialogConfig,
    );
    dialogRef.componentInstance.editProductEmitter.subscribe(() => {
      this.getTableData();
      dialogRef.close();
    });
  }

  deleteProductHandler(value: any) {
    this.ngxLoaderService.start();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: `delete Product Id: ${value.productId}`,
    };

    const dialogRef = this.dialogData.open(
      DialogConfirmationComponent,
      dialogConfig,
    );

    dialogRef.componentInstance.isConfirmedEmitter.subscribe({
      next: (isConfirmed: boolean) => {
        if (isConfirmed) {
          this.productService.deleteProduct(value.productId).subscribe({
            next: (res: Partial<ResponseModel>) => {
              if (res.message) {
                dialogRef.close();
                this.getTableData();
                this.snackbarService.openSnackBar(res.message, '');
              }
              this.ngxLoaderService.stop();
            },
            error: (err) => {
              console.log(err);
              if (err.error?.message) {
                this.snackbarService.openSnackBar(err.error.message, 'error');
              } else if (err.message) {
                this.snackbarService.openSnackBar(err.message, 'error');
              }
              dialogRef.close();
              this.ngxLoaderService.stop();
            },
          });
        } else {
          dialogRef.close();
          this.ngxLoaderService.stop();
        }
      },
    });
  }
}
