import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialUiModule } from '@material-ui/material-ui.module';

@Component({
  selector: 'app-dialog-confirmation',
  standalone: true,
  imports: [MaterialUiModule],
  templateUrl: './dialog-confirmation.component.html',
  styleUrl: './dialog-confirmation.component.scss',
})
export class DialogConfirmationComponent implements OnInit {
  isConfirmedEmitter = new EventEmitter<boolean>();

  message: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogData: { message: string; },
  ) {}

  ngOnInit() {
    if (this.dialogData) {
      this.message = this.dialogData.message;
    }
  }

  isConfirmedHandler(isConfirmed: boolean) {
    this.isConfirmedEmitter.emit(isConfirmed);
  }
}
