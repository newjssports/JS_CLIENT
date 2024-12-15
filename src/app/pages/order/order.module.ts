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
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatNativeDateModule } from '@angular/material/core';
import { MockupDesignComponent } from './mockup-design/mockup-design.component';
import { OrderRoutingModule } from './order-routing.module';
import { OrderDesignComponent } from './order-design/order-design.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(OrderRoutingModule),
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
    TablerIconsModule.pick(TablerIcons),
  ],
  declarations: [
    MockupDesignComponent ,
    OrderDesignComponent
  ],
  exports: [TablerIconsModule],
})
export class OrderModule {}

