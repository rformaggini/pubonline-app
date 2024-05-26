import { Routes } from '@angular/router';
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
      },
      {
        path: 'vacancy',
        loadComponent: () =>
          import('./features/vacancy/vacancy.component').then(
            (c) => c.VacancyComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
