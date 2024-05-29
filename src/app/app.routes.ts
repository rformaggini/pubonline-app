import { Routes } from '@angular/router';
import { Role } from '@enums/role';
import { AuthGuardService } from '@guards/auth-guard.service';
import { LoginComponent } from './features/login/login.component';
import { DefaultComponent } from './shared/layout/default/default.component';
import { MasterComponent } from './shared/layout/master/master.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
    ],
  },
  {
    path: '',
    component: MasterComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home.component').then((c) => c.HomeComponent),
        canActivate: [AuthGuardService],
        data: {
          accessRole: [Role.ADMIN, Role.BASIC, Role.STAFF],
        },
      },
      {
        path: 'category',
        loadComponent: () =>
          import('./features/category/category.component').then(
            (c) => c.CategoryComponent,
          ),
        canActivate: [AuthGuardService],
        data: {
          accessRole: [Role.ADMIN],
        },
      },
      {
        path: 'product',
        loadComponent: () =>
          import('./features/product/product.component').then(
            (c) => c.ProductComponent,
          ),
        canActivate: [AuthGuardService],
        data: {
          accessRole: [Role.ADMIN],
        },
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
