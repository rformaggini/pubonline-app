import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { matDialogConfig } from '@configs/mat-dialog-config';
import { Login } from '@models/login.model';
import { ResponseModel } from '@models/response-model';
import { LoginService } from '@services/login.service';
import { SnackbarService } from '@services/snackbar.service';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { merge } from 'rxjs';
import { MaterialUiModule } from '../../material-ui/material-ui.module';
import { SignupComponent } from '../../shared/components/signup/signup.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleSsoDirective } from '../../shared/directives/google-sso/google-sso.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MaterialUiModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUiLoaderModule,
    GoogleSsoDirective
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;

  errorMessage: string = '';

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private loginService: LoginService,
    private snackBarService: SnackbarService,
    private ngxService: NgxUiLoaderService,
    public auth: AngularFireAuth
  ) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }

  handleLogin() {
    this.ngxService.start();
    const data: Login = {
      username: this.email.value ? this.email.value : '',
      password: this.password.value ? this.password.value : '',
    };

    this.loginService.login(data).subscribe({
      next: (res: Partial<ResponseModel<{ accessToken: string }>>) => {
        if (res.message && res.data) {
          localStorage.setItem('token', res.data.accessToken);
          this.router.navigate(['/home']);
          this.ngxService.stop();
          this.snackBarService.openSnackBar(res.message, '');
          console.log(res);
        }
      },
      error: (ex) => {
        this.ngxService.stop();
        this.snackBarService.openSnackBar(
          ex.error?.message
            ? ex.error.message
            : 'Something went wrong with login',
          'error',
        );
        console.log(ex.error?.message);
      },
    });
  }

  handleSignupAction() {
    this.matDialog.open(SignupComponent, matDialogConfig);
  }
}
