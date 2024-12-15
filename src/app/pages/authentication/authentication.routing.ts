import { Routes } from '@angular/router';

import { AppSideLoginComponent } from './login/login.component';
import { AppSideRegisterComponent } from './register/register.component';
import { AuthGuard } from 'src/app/auth/AuthGuard';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AppSideLoginComponent,
      },
      {
        path: 'register',
        component: AppSideRegisterComponent,
      },
      {
        path: 'verify',
        component: OtpVerificationComponent,
      },
    ],
  },
];
