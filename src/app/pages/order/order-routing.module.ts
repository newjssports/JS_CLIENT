
import { Routes } from '@angular/router';
import { MockupDesignComponent } from './mockup-design/mockup-design.component';
import { OrderDesignComponent } from './order-design/order-design.component';
import { AuthGuard } from 'src/app/auth/AuthGuard';

export const OrderRoutingModule: Routes = [
  {
    path: '',
    children: [
      {
        path: 'mockup',
        component: MockupDesignComponent,canActivate: [AuthGuard],
      },
      {
        path: 'order',
        component: OrderDesignComponent, canActivate: [AuthGuard],
      },
    ],
  },
];