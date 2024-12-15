import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgApexchartsModule } from 'ng-apexcharts';
import { RouterModule } from '@angular/router';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatHeaderRow, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { InventoryRoutingModule } from './inventory-routing.module';
import { CategoryItemSetupComponent } from './category-item-setup/category-item-setup.component';
import { MatIconModule } from '@angular/material/icon';
import { ItemPurchaseOrderComponent } from './item-purchase-order/item-purchase-order.component';
import { ItemGrnComponent } from './item-grn/item-grn.component';

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(InventoryRoutingModule),
    MaterialModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatNativeDateModule,
    MatHeaderRow,
    MatIconModule,
    TablerIconsModule.pick(TablerIcons),
  ],
  declarations: [
    CategoryItemSetupComponent,
    ItemPurchaseOrderComponent,
    ItemGrnComponent
  ],
  exports: [TablerIconsModule],
})
export class InventoryModule {}

