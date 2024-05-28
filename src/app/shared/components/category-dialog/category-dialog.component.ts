import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialUiModule } from '@material-ui/material-ui.module';
import { Category } from '@models/category.model';
import { CategoryService } from '@services/category.service';
import { SnackbarService } from '@services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-category-dialog',
  standalone: true,
  imports: [MaterialUiModule, ReactiveFormsModule],
  templateUrl: './category-dialog.component.html',
  styleUrl: './category-dialog.component.scss',
})
export class CategoryDialogComponent implements OnInit {
  addCategoryEmitter = new EventEmitter();
  editCategoryEmitter = new EventEmitter();

  name = new FormControl('', Validators.required);
  categoryId = new FormControl<number | undefined>(
    undefined,
    Validators.required,
  );

  message: string = '';
  actionName: string = '';
  errorMessage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogData: { message: string; data: Category; action: string },
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    private categoryService: CategoryService,
    private ngxLoaderService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit() {
    if (this.dialogData) {
      this.message = this.dialogData.message;
      this.actionName = this.dialogData.action?.toLocaleUpperCase();
    }
    if (this.dialogData.action == 'edit') {
      this.name.patchValue(this.dialogData.data.name);
      this.categoryId.patchValue(this.dialogData.data.categoryId);
    }
  }

  submitHandler() {
    if (this.dialogData.action == 'edit') {
      this.editCategoryHandler();
    } else {
      this.addCategoryHandler();
    }
  }

  addCategoryHandler() {
    if (this.name.value) {
      this.ngxLoaderService.start();
      const data: Category = {
        name: this.name.value,
      };

      this.categoryService.addNewCategory(data).subscribe({
        next: (res) => {
          this.ngxLoaderService.stop();
          this.addCategoryEmitter.emit(res);
          this.snackbarService.openSnackBar(
            'New category added successfully.',
            '',
          );
        },
        error: (ex) => {
          this.ngxLoaderService.stop();
          this.snackbarService.openSnackBar(ex.error.message, 'error');
        },
      });
    }
  }

  editCategoryHandler() {
    if (this.name.value && this.categoryId.value) {
      this.ngxLoaderService.start();
      const data: Category = {
        name: this.name.value,
        categoryId: this.categoryId.value,
      };

      this.categoryService.updateCategory(data).subscribe({
        next: (res) => {
          this.ngxLoaderService.stop();
          this.editCategoryEmitter.emit(res);
          this.snackbarService.openSnackBar(
            'Category updated successfully.',
            '',
          );
        },
        error: (ex) => {
          this.ngxLoaderService.stop();
          this.snackbarService.openSnackBar(ex.error.message, 'error');
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
    if (this.name.hasError('required')) {
      return true;
    } else {
      return false;
    }
  }
}
