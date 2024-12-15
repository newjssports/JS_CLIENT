import { Routes } from '@angular/router';
import { SetupsComponent } from '../setups.component';
import { PriceListFormComponent } from '../../price-list-form/price-list-form.component';
import { ProductSizeListComponent } from '../product-size-list/product-size-list.component';
import { AuthGuard } from 'src/app/auth/AuthGuard';

export const SetupRoutingModule: Routes = [
  {
    path: '',
    children: [
      {
        path: 'product',
        component: SetupsComponent, canActivate: [AuthGuard],
      },
      {
        path: 'pricelist',
        component: PriceListFormComponent, canActivate: [AuthGuard],
      },
      {
        path: 'sizepricelist',
        component: ProductSizeListComponent, canActivate: [AuthGuard],
      },
    ],
  },
];