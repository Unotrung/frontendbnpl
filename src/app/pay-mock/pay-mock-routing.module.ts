import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartPaymentComponent} from "./start-payment/start-payment.component";
import {PayMockComponent} from "./pay-mock.component";

const routes: Routes = [
    {
        path: 'pay-mock',
        component: PayMockComponent,
        children: [
            {
                path: '', redirectTo: 'start-payment', pathMatch: 'prefix'
            },
            {
                path: 'start-payment', component: StartPaymentComponent
            }
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayMockRoutingModule { }
