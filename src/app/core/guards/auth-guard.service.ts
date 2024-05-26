import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { SnackbarService } from '@services/snackbar.service';
import { jwtDecode } from 'jwt-decode';
import { Role } from '../enums/role';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService,
  ) {}

  canActivate(router: ActivatedRouteSnapshot): boolean {
    let expectedRoleArray = router.data;
    expectedRoleArray = expectedRoleArray['accessRole'];
    console.log('expectedRoleArray', expectedRoleArray);
    const token = localStorage.getItem('token');
    if (token) {
      let payLoad = { scope: '' };
      try {
        payLoad = jwtDecode(token);
        console.log('payLoad', payLoad);
      } catch (error) {
        console.log('error', error);
        localStorage.clear();
        this.router.navigate(['/']);
      }

      let expectedRole = '';

      for (let index = 0; index < expectedRoleArray['length']; index++) {
        if (expectedRoleArray[index] == payLoad.scope) {
          console.log('expectedRoleArray[index]', expectedRoleArray[index]);
          console.log('payLoad.scope', payLoad.scope);
          expectedRole = payLoad.scope;
        }
      }

      if (
        payLoad.scope == Role.BASIC ||
        payLoad.scope == Role.ADMIN ||
        payLoad.scope == Role.STAFF
      ) {
        if (
          this.authService.isAuthenticated() &&
          payLoad.scope == expectedRole
        ) {
          return true;
        } else {
          this.snackbarService.openSnackBar(
            'User not unauthorized to access this route.',
            'error',
          );
          this.router.navigate(['/home']);
        }
        return false;
      }
    }
    this.router.navigate(['/']);
    localStorage.clear();
    return false;
  }
}
