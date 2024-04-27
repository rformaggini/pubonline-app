import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { DefaultComponent } from './shared/layout/default/default.component';
import { MasterComponent } from './shared/layout/master/master.component';
import { VacancyComponent } from './features/vacancy/vacancy.component';

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
        component: HomeComponent,
      },
      {
        path:'vacancy',
        component:VacancyComponent
      }
    ],
  },
];
