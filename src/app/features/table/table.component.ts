import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialUiModule } from '@material-ui/material-ui.module';
import { Table } from '@models/table.model';
import { SnackbarService } from '@services/snackbar.service';
import { TableService } from '@services/table.service';
import { DialogConfirmationComponent } from '@shared-components/dialog-confirmation/dialog-confirmation.component';
import { TableDialogComponent } from '@shared-components/table-dialog/table-dialog.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MaterialUiModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  dataSource!: any;
  displayedColumns: string[] = ['number', 'description', 'actions'];

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private snackbarService: SnackbarService,
    private tableService: TableService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getTableData();
  }

  addTableHandler() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'add',
    };
    dialogConfig.width = '450px';
    const dialogRef = this.dialog.open(TableDialogComponent, dialogConfig);
    dialogRef.componentInstance.addTableEmitter.subscribe(() => {
      this.getTableData();
      dialogRef.close();
    });
  }

  deleteTableHandler(data: Table) {
    this.ngxLoader.start();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: `delete table with number: ${data.number}`,
    };

    const dialogRef = this.dialog.open(
      DialogConfirmationComponent,
      dialogConfig,
    );

    dialogRef.componentInstance.isConfirmedEmitter.subscribe({
      next: (isConfirmed: boolean) => {
        if (isConfirmed) {
          this.tableService.deleteTables(data.id).subscribe({
            next: () => {
              dialogRef.close();
              this.getTableData();
              this.snackbarService.openSnackBar(
                'Table delete with success.',
                '',
              );
            },
            error: (err) => {
              console.log(err);
              if (err.error?.message) {
                this.snackbarService.openSnackBar(err.error.message, 'error');
              } else if (err.message) {
                this.snackbarService.openSnackBar(err.message, 'error');
              }
              dialogRef.close();
              this.ngxLoader.stop();
            },
          });
        } else {
          dialogRef.close();
          this.ngxLoader.stop();
        }
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTableData() {
    this.ngxLoader.start();
    this.tableService.getAllTables().subscribe({
      next: (tables) => {
        this.dataSource = new MatTableDataSource(tables);
        this.ngxLoader.stop();
      },
      error: (ex) => {
        this.ngxLoader.stop();
        this.snackbarService.openSnackBar(ex.message, 'error');
      },
    });
  }
}
