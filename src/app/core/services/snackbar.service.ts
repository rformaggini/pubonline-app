import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '@configs/mat-snackbar-config';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    if (action === 'error') {
      this.snackBar.open(message, '', snackBarConfig);
    } else {
      this.snackBar.open(message, '', {
        ...snackBarConfig,
        panelClass: ['green-snackbar'],
      });
    }
  }
}
