import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { TranscationsComponent } from './transcations/transcations.component';


const routes: Routes = [
  {
    path: '', children: [
      { path: 'orders', component: OrdersComponent },
      { path: 'transactions', component: TranscationsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
