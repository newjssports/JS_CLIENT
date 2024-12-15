import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/AuthGuard';
import { NewUserCreationComponent } from './new-user-creation/new-user-creation.component';


export const UserManagementRoutingModule: Routes = [
  {
    path: '',
    children: [
      {
        path: 'new-user-creation',
        component: NewUserCreationComponent, canActivate: [AuthGuard],
      }
    ],
  },
];