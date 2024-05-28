import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Constants } from '@constants/constants';
import { SignUp } from '@models/signup.model';
import { SnackbarService } from '@services/snackbar.service';
import { UserService } from '@services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MaterialUiModule } from '../../../material-ui/material-ui.module';
import { ResponseModel } from '@models/response-model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MaterialUiModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  name!: FormControl;
  email!: FormControl;
  contactNumber!: FormControl;
  password!: FormControl;
  confirmPassword!: FormControl;

  hide: boolean = true;
  isConfirmPassword: boolean = true;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private snackBarService: SnackbarService,
    private ngxService: NgxUiLoaderService,
    public dialogRef: MatDialogRef<SignupComponent>,
  ) {}

  ngOnInit(): void {
    this.name = new FormControl('', [
      Validators.required,
      Validators.pattern(Constants.nameRegex),
    ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(Constants.emailRegex),
    ]);
    this.contactNumber = new FormControl('');
    this.password = new FormControl('', [Validators.required]);
    this.confirmPassword = new FormControl('', [Validators.required]);
  }

  updateErrorMessage() {
    if (this.validateDataRequired()) {
      this.errorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }

  private validateDataRequired(): boolean {
    if (
      this.name.hasError('required') ||
      this.email.hasError('required') ||
      this.password.hasError('required') ||
      this.confirmPassword.hasError('required')
    ) {
      return true;
    } else {
      return false;
    }
  }

  validateDataPassword(): boolean {
    if (this.password.value != this.confirmPassword.value) {
      return true;
    } else {
      return false;
    }
  }

  handleSubmit() {
    this.ngxService.start();
    const data: SignUp = {
      name: this.name.value,
      email: this.email.value,
      contactNumber: this.contactNumber.value,
      password: this.password.value,
      confirmPassword: this.confirmPassword.value,
    };

    this.userService.signUp(data).subscribe({
      next: (res: Partial<ResponseModel>) => {
        if(res && res?.message){
          this.dialogRef.close();
          this.ngxService.stop();
          this.snackBarService.openSnackBar(res.message, '');
          this.router.navigate(['/home']);
        }
      },
      error: (ex) => {
        this.ngxService.stop();
        this.snackBarService.openSnackBar(ex.error.message , 'error');
      },
    });
  }

  dialogClose() {
    this.dialogRef.close();
  }
}
