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
import { CheckoutDetailBillComponent } from '../checkout-detail-bill/checkout-detail-bill.component';
import { ErrorServerComponent } from '../error-server/error-server.component';
import { ProgressbarFiftyComponent } from '../progressbar-fifty/progressbar-fifty.component';
import { ProgressbarHundredComponent } from '../progressbar-hundred/progressbar-hundred.component';
import { ElectronicContractComponent } from '../electronic-contract/electronic-contract.component';

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
                path: 'setup-pin', component: SetupPinComponent
            },
            {
                path: 'phone-display', component: PhoneDisplayComponent
            },
            {
                path: 'checkout', component: CheckoutComponent
            },
            {
                path: 'checkout-detail', component: CheckoutDetailBillComponent
            },
            {
                path: 'checkout-detail', component: CheckoutDetailBillComponent
            },
            {
                path: 'error-server', component: ErrorServerComponent
            },
            {
                path: 'progressbar-fifty', component: ProgressbarFiftyComponent
            },
            {
                path: 'progressbar-hundred', component: ProgressbarHundredComponent
            },
            {
                path: 'electronic-contract', component: ElectronicContractComponent
            },
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayMockRoutingModule { }
