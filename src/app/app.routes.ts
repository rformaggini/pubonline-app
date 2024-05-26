import { Routes } from '@angular/router';
import { AuthGuardService } from '@guards/auth-guard.service';
import { LoginComponent } from './features/login/login.component';
import { DefaultComponent } from './shared/layout/default/default.component';
import { MasterComponent } from './shared/layout/master/master.component';
import { Role } from './core/enums/role';

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
        path: 'vacancy',
        loadComponent: () =>
          import('./features/vacancy/vacancy.component').then(
            (c) => c.VacancyComponent,
          ),
        canActivate: [AuthGuardService],
        data: {
          accessRole: [Role.ADMIN, Role.BASIC],
        },
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
