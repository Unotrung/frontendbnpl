import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartPaymentComponent} from "./start-payment/start-payment.component";
import {PayMockComponent} from "./pay-mock.component";
import {RegisterComponent} from "./register/register.component";
import {VerifyPinComponent} from "./verify-pin/verify-pin.component";
import {ForgotPinComponent} from "./forgot-pin/forgot-pin.component";

const routes: Routes = [
    {path: '', redirectTo: 'pay-mock', pathMatch: 'full'},
    {
        path: 'pay-mock',
        component: PayMockComponent,
        children: [
            {
                path: '', redirectTo: 'start-payment', pathMatch: 'full'
            },
            {
                path: 'start-payment', component: StartPaymentComponent
            },
            {
                path: 'register', component: RegisterComponent
            },
            {
                path: 'verify-pin', component: VerifyPinComponent
            },
            {
                path: 'forgot-pin', component: ForgotPinComponent
            }
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayMockRoutingModule { }
