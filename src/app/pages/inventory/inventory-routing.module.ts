import { Routes } from '@angular/router';
import { CategoryItemSetupComponent } from './category-item-setup/category-item-setup.component';
import { ItemPurchaseOrderComponent } from './item-purchase-order/item-purchase-order.component';
import { ItemGrnComponent } from './item-grn/item-grn.component';
import { AuthGuard } from 'src/app/auth/AuthGuard';

export const InventoryRoutingModule: Routes = [
  {
    path: '',
    children: [
      {
        path: 'itemsetup',
        component: CategoryItemSetupComponent, canActivate: [AuthGuard],
      },
      {
        path: 'po',
        component: ItemPurchaseOrderComponent, canActivate: [AuthGuard],
      },
      {
        path: 'grn',
        component: ItemGrnComponent, canActivate: [AuthGuard],
      },
    ],
  },
];