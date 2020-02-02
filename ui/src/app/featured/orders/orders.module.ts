import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [OrdersListComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule
  ]
})
export class OrdersModule { }
