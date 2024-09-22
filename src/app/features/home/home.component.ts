import { Component } from '@angular/core';
import { MaterialUiModule } from '@material-ui/material-ui.module';
import { BillService } from '@services/bill.service';
import { SnackbarService } from '@services/snackbar.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialUiModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  billsOpen!: number;
  billsPaid!: number;

  constructor(
    private billService: BillService,
    private snackBarService: SnackbarService,
  ) {}

  ngOnInit() {
    this.billService.countByStatusOpen().subscribe({
      next: (total) => {
        this.billsOpen = total;
      },
      error: () => {
        this.snackBarService.openSnackBar(
          'Something went wrong when trying to get total open.',
          'error',
        );
      },
    });
    this.billService.countByStatusPaid().subscribe({
      next: (total) => {
        this.billsPaid = total;
      },
      error: () => {
        this.snackBarService.openSnackBar(
          'Something went wrong when trying to get total paid.',
          'error',
        );
      },
    });
  }
}
