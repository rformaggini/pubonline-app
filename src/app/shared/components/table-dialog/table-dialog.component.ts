import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialUiModule } from '@material-ui/material-ui.module';
import { TableCreate } from '@models/table-create.model';
import { SnackbarService } from '@services/snackbar.service';
import { TableService } from '@services/table.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-table-dialog',
  standalone: true,
  imports: [MaterialUiModule, ReactiveFormsModule],
  templateUrl: './table-dialog.component.html',
  styleUrl: './table-dialog.component.css',
})
export class TableDialogComponent implements OnInit {
  addTableEmitter = new EventEmitter();

  actionName: string = '';
  errorMessage: string = '';

  description = new FormControl<string>('');
  number = new FormControl<number | undefined>(undefined, Validators.required);

  constructor(
    public dialogRef: MatDialogRef<TableDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public dialogData: { action: string },
    private ngxLoaderService: NgxUiLoaderService,
    private tableService: TableService,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit() {
    if (this.dialogData) {
      this.actionName = this.dialogData.action?.toLocaleUpperCase();
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

  addTableHandler() {
    if (this.number.value) {
      this.ngxLoaderService.start();
      const data: TableCreate = {
        number: this.number?.value,
        description: this.description.value ? this.description.value : '',
      };

      this.tableService.createTable(data).subscribe({
        next: () => {
          this.ngxLoaderService.stop();
          this.addTableEmitter.emit();
        },
        error: (ex) => {
          this.ngxLoaderService.stop();
          this.closeDialog();
          this.snackbarService.openSnackBar(ex.error.message, 'error');
        },
      });
    }
  }

  private validateDataRequired(): boolean {
    if (this.number.hasError('required')) {
      return true;
    } else {
      return false;
    }
  }
}
