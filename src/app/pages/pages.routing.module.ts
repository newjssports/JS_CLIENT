import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../auth/AuthGuard';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: AppDashboardComponent, canActivate: [AuthGuard],
    data: {
      title: 'Starter Page',
    },
    
  },
];
