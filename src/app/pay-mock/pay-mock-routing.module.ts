import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartPaymentComponent} from "./start-payment/start-payment.component";
import {PayMockComponent} from "./pay-mock.component";
import {RegisterComponent} from "./register/register.component";
import {VerifyPinComponent} from "./verify-pin/verify-pin.component";
import {ForgotPinComponent} from "./forgot-pin/forgot-pin.component";
import {CustomerConfirmInfoComponent} from "./customer-confirm-info/customer-confirm-info.component";
import {
    CustomerInformationProcessComponent
} from "./customer-information-process/customer-information-process.component";
import {CustomerInformationFinishComponent} from "./customer-information-finish/customer-information-finish.component";
import {
    CustomerInformationRegisterComponent
} from "./customer-information-register/customer-information-register.component";
import {CustomerEsignConfirmComponent} from "./customer-esign-confirm/customer-esign-confirm.component";

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
            },
            {
                path: 'customer-confirm-info', component: CustomerConfirmInfoComponent
            },
            {
                path: 'customer-information-process', component: CustomerInformationProcessComponent
            },
            {
                path: 'customer-information-finish', component: CustomerInformationFinishComponent
            },
            {
                path: 'customer-information-register', component: CustomerInformationRegisterComponent
            },
            {
                path: 'customer-confirm-info', component: CustomerConfirmInfoComponent
            },
            {
                path: 'customer-esign-confirm', component: CustomerEsignConfirmComponent
            }
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayMockRoutingModule { }