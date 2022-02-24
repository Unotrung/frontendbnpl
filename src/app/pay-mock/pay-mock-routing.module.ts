import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartPaymentComponent} from "./start-payment/start-payment.component";
import {PayMockComponent} from "./pay-mock.component";
import { MessageSuccessComponent } from '../message-success/message-success.component';
import { MessageFailComponent } from '../message-fail/message-fail.component';
import { ModalComponent } from '../modal/modal.component';
import { TypeNidComponent } from '../type-nid/type-nid.component';
import { TypePinComponent } from '../type-pin/type-pin.component';
import { PhoneDisplayComponent } from '../phone-display/phone-display.component';
import { SetupPinComponent } from '../setup-pin/setup-pin.component';
import { CheckoutComponent } from '../checkout/checkout.component';

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
            },
            {
                path: 'message-success', component: MessageSuccessComponent
            },
            {
                path: 'message-fail', component: MessageFailComponent
            },
            {
                path: 'modal', component: ModalComponent
            },
            {
                path: 'type-nid', component: TypeNidComponent
            },
            {
                path: 'type-pin', component: TypePinComponent
            },
            {
                path: 'phone-display', component: PhoneDisplayComponent
            },
            {
                path: 'checkout', component: CheckoutComponent
            },
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayMockRoutingModule { }
