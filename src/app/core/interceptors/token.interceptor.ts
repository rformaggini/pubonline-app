import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from '@services/snackbar.service';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const snackBarService = inject(SnackbarService);

  const token = localStorage.getItem('token');
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(req).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        // Handle HTTP errors
        if (err.status === 401 || err.status === 403) {
          // Specific handling for unauthorized errors
          snackBarService.openSnackBar(`Session expired, please do login again.`, 'error')
          console.error('Unauthorized request:', err);
          localStorage.clear();
          router.navigate(['/']);
        } else {
          // Handle other HTTP error codes
          console.error('HTTP error:', err);
        }
      } else {
        // Handle non-HTTP errors
        console.error('An error occurred:', err);
      }

      // Re-throw the error to propagate it further
      return throwError(() => err);
    }),
  );
};
