import { Component, EventEmitter, Output } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MaterialUiModule } from '@material-ui/material-ui.module';
import { DialogConfirmationComponent } from '@shared-components/dialog-confirmation/dialog-confirmation.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialUiModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() collapsed = new EventEmitter();

  constructor(
    private confirmDialog: MatDialog,
    private router: Router,
    private ngxService: NgxUiLoaderService,
  ) {}

  expandMenu() {
    this.collapsed.emit();
  }

  logout() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'logout',
    };
    const dialogRef = this.confirmDialog.open(
      DialogConfirmationComponent,
      dialogConfig,
    );
    dialogRef.componentInstance.isConfirmedEmitter.subscribe({
      next: (isConfirmed: boolean) => {
        this.ngxService.start();
        if (isConfirmed) {
          dialogRef.close();
          localStorage.clear();
          this.router.navigate(['/']);
        } else {
          dialogRef.close();
        }
        this.ngxService.stop();
      },
    });
  }
}
