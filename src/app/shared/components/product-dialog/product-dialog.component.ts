import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialUiModule } from '@material-ui/material-ui.module';
import { Category } from '@models/category.model';
import { ProductCreate } from '@models/product-create.model';
import { CategoryService } from '@services/category.service';
import { ProductService } from '@services/product.service';
import { SnackbarService } from '@services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [MaterialUiModule, ReactiveFormsModule],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.scss',
})
export class ProductDialogComponent implements OnInit {
  addProductEmitter = new EventEmitter();
  editProductEmitter = new EventEmitter();

  productId = new FormControl<number | undefined>(
    undefined,
    Validators.required,
  );
  name = new FormControl('', Validators.required);
  categoryId = new FormControl<number | null>(null, 
    [Validators.required]
  );
  description = new FormControl<string | undefined | null>('');
  price = new FormControl<number>(0, [
    Validators.required
  ]);

  message: string = '';
  actionName: string = '';
  errorMessage: string = '';

  categories: Category[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogData: { message: string; data: ProductCreate; action: string },
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    private productService: ProductService,
    private categoryService: CategoryService,
    private ngxLoaderService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (ex) => {
        this.snackbarService.openSnackBar(
          'Something went wrong while loading categories',
          'error',
        );
        console.log(ex.error?.message);
      },
    });
    if (this.dialogData) {
      this.message = this.dialogData.message;
      this.actionName = this.dialogData.action?.toLocaleUpperCase();
    }
    if (this.dialogData.action == 'edit') {
      this.productId.patchValue(
        this.dialogData.data.productId
          ? this.dialogData.data.productId
          : undefined,
      );
      this.name.patchValue(this.dialogData.data.name);
      this.categoryId.patchValue(
        this.dialogData.data?.category?.categoryId
          ? this.dialogData.data?.category.categoryId
          : this.dialogData.data.categoryId,
      );
      this.description.patchValue(
        this.dialogData.data.description
          ? this.dialogData.data.description
          : '',
      );
      this.price.patchValue(this.dialogData.data.price);
    }
  }

  submitHandler() {
    if (this.dialogData.action == 'edit') {
      this.editProductHandler();
    } else {
      this.addProductHandler();
    }
  }

  addProductHandler() {
    if (this.name.value && this.categoryId.value && this.price.value) {
      this.ngxLoaderService.start();
      const data = {
        name: this.name.value,
        categoryId: this.categoryId.value,
        price: this.price.value,
        description: this.description.value,
      };
      this.productService.addNewProduct(data).subscribe({
        next: () => {
          this.dialogRef.close();
          this.ngxLoaderService.stop();
          this.addProductEmitter.emit();
          this.snackbarService.openSnackBar(
            'New product added successfully.',
            '',
          );
        },
        error: (ex) => {
          this.dialogRef.close();
          this.ngxLoaderService.stop();
          this.snackbarService.openSnackBar(ex.error?.message, 'error');
        },
      });
    }
  }

  editProductHandler() {
    if (
      this.name.value &&
      this.categoryId.value &&
      this.price.value &&
      this.productId.value
    ) {
      this.ngxLoaderService.start();
      const data = {
        productId: this.productId.value,
        name: this.name.value,
        categoryId: this.categoryId.value,
        price: this.price.value,
        description: this.description.value,
      };
      this.productService.updateProduct(data).subscribe({
        next: () => {
          this.dialogRef.close();
          this.ngxLoaderService.stop();
          this.editProductEmitter.emit();
          this.snackbarService.openSnackBar('Product edited successfully.', '');
        },
        error: (ex) => {
          this.dialogRef.close();
          this.ngxLoaderService.stop();
          this.snackbarService.openSnackBar(ex.error?.message, 'error');
        },
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  updateErrorMessage() {
    if (this.validateDataRequired()) {
      this.errorMessage = 'You must enter a value';
    }
  }

  private validateDataRequired(): boolean {
    if (
      this.name.hasError('required') ||
      this.price.hasError('required') ||
      this.productId.hasError('required')
    ) {
      return true;
    } else {
      return false;
    }
  }
}
