import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MaterialUiModule } from '@material-ui/material-ui.module';
import { ResponseModel } from '@models/response-model';
import { CategoryService } from '@services/category.service';
import { SnackbarService } from '@services/snackbar.service';
import { CategoryDialogComponent } from '@shared-components/category-dialog/category-dialog.component';
import { DialogConfirmationComponent } from '@shared-components/dialog-confirmation/dialog-confirmation.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MaterialUiModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['categoryId', 'name', 'actions'];
  dataSource!: any;
  message!: string;

  constructor(
    private categoryService: CategoryService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getTableData();
  }

  getTableData() {
    this.ngxService.start();
    this.categoryService.getAllCategories().subscribe({
      next: (categories: any) => {
        this.dataSource = new MatTableDataSource(categories);
        this.ngxService.stop();
      },
      error: (ex) => {
        this.ngxService.stop();
        this.snackbarService.openSnackBar(ex.message, 'error');
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addCategoryHandler() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'add',
    };
    dialogConfig.width = '450px';
    const dialogRef = this.dialog.open(CategoryDialogComponent, dialogConfig);
    dialogRef.componentInstance.addCategoryEmitter.subscribe(() => {
      this.getTableData();
      dialogRef.close();
    });
  }
  editCategoryHandler(value: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'edit',
      data: value,
    };
    dialogConfig.width = '450px';
    const dialogRef = this.dialog.open(CategoryDialogComponent, dialogConfig);
    dialogRef.componentInstance.editCategoryEmitter.subscribe(() => {
      this.getTableData();
      dialogRef.close();
    });
  }

  deleteCategoryHandler(value: any) {
    this.ngxService.start();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: `delete Category Id: ${value.categoryId}`,
    };

    const dialogRef = this.dialog.open(
      DialogConfirmationComponent,
      dialogConfig,
    );
    dialogRef.componentInstance.isConfirmedEmitter.subscribe({
      next: (isConfirmed: boolean) => {
        if (isConfirmed) {
          this.categoryService.deleteCategory(value.categoryId).subscribe({
            next: (res: Partial<ResponseModel>) => {
              if (res.message) {
                dialogRef.close();
                this.getTableData();
                this.snackbarService.openSnackBar(res.message, '');
              }
              this.ngxService.stop();
            },
            error: (err) => {
              this.snackbarService.openSnackBar(err.error.message, 'error');
              this.ngxService.stop();
            },
          });
        } else {
          dialogRef.close();
          this.ngxService.stop();
        }
      },
    });
  }
}
