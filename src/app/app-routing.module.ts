import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: '',
        component: BlankComponent,
        children: [
          {
            path: 'client',
            loadChildren: () =>
              import('./pages/order/order.module').then(
                (m) => m.OrderModule
              ),
          },
        ],
      },
      {
        path: '',
        component: BlankComponent,
        children: [
          {
            path: 'setup',
            loadChildren: () =>
              import('./pages/setups/setup/setup.module').then(
                (m) => m.SetupModule
              ),
          },
        ],
      },
      {
        path: '',
        component: BlankComponent,
        children: [
          {
            path: 'inventory',
            loadChildren: () =>
              import('./pages/inventory/inventory.module').then(
                (m) => m.InventoryModule
              ),
          },
        ],
      },
      // {
      //   path: 'setup',
      //   loadChildren: () =>
      //     import('./pages/setups/setup/setup.module').then((m) => m.SetupModule),
      // },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.module').then((m) => m.ExtraModule),
      },
    ],
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'usermanagement',
        loadChildren: () =>
          import('./pages/user-management/user-management.module').then(
            (m) => m.UserManagementModule
          ),
      },
    ],
  },
  // {
  //   path: '',
  //   component: BlankComponent,
  //   children: [
  //     {
  //       path: 'user-management',
  //       loadChildren: () =>
  //         import('./pages/user-management/user-management.module').then(
  //           (m) => m.UserManagementModule
  //         ),
  //     },
  //   ],
  // },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
