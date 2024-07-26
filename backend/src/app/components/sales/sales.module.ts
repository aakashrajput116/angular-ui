import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { TranscationsComponent } from './transcations/transcations.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';

@NgModule({
  declarations: [OrdersComponent, TranscationsComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    Ng2SmartTableModule
  ]
})
export class SalesModule { }
