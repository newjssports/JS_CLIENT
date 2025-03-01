import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupRoutingModule } from './setup-routing.module';
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
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SetupsComponent } from '../setups.component';
import { PriceListFormComponent } from '../../price-list-form/price-list-form.component';
import { PriceListItemComponent } from '../../price-list-item/price-list-item.component';
import { ProductSizeListComponent } from '../product-size-list/product-size-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AddEditFabricComponent } from './components/add-edit-fabric/add-edit-fabric.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
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
    MatExpansionModule,
    RouterModule.forChild(SetupRoutingModule),
    TablerIconsModule.pick(TablerIcons),
  ],
  declarations: [
    SetupsComponent,
    PriceListFormComponent,
    PriceListItemComponent,
    ProductSizeListComponent,
    AddEditFabricComponent
  ],
  exports: [TablerIconsModule],
})
export class SetupModule {}

