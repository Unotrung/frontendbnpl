import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartPaymentComponent} from "./start-payment/start-payment.component";
import {PayMockComponent} from "./pay-mock.component";
import {RegisterComponent} from "./register/register.component";
import {VerifyPinComponent} from "./verify-pin/verify-pin.component";
import {CustomerConfirmInfoComponent} from "./customer-confirm-info/customer-confirm-info.component";
import {
    CustomerInformationProcessComponent
} from "./customer-information-process/customer-information-process.component";
import {CustomerInformationFinishComponent} from "./customer-information-finish/customer-information-finish.component";
import {
    CustomerInformationRegisterComponent
} from "./customer-information-register/customer-information-register.component";
import {CustomerEsignConfirmComponent} from "./customer-esign-confirm/customer-esign-confirm.component";
import {CustomerPinInstallComponent} from "./customer-pin-install/customer-pin-install.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {CheckoutDetailBillComponent} from "./checkout-detail-bill/checkout-detail-bill.component";
import {PictureSelfieComponent} from "./picture-selfie/picture-selfie.component";
import {ErrorServerComponent} from "./error-server/error-server.component";
import {CitizenCardComponent} from "./citizen-card/citizen-card.component";
import {AuthGuard} from "./auth.guard";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {ForgotPinPhoneComponent} from "./forgot-pin-phone/forgot-pin-phone.component";
import {ForgotPinCardIdComponent} from "./forgot-pin-card-id/forgot-pin-card-id.component";
import {CheckoutConfirmComponent} from "./checkout-confirm/checkout-confirm.component";
import {CheckoutFinishComponent} from "./checkout-finish/checkout-finish.component";
import {CheckoutNotEnoughCreditComponent} from "./checkout-not-enough-credit/checkout-not-enough-credit.component";

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
                path: 'customer-confirm-info', component: CustomerConfirmInfoComponent, canActivate: [AuthGuard]
            },
            {
                path: 'customer-information-process', component: CustomerInformationProcessComponent, canActivate: [AuthGuard]
            },
            {
                path: 'customer-information-finish', component: CustomerInformationFinishComponent, canActivate: [AuthGuard]
            },
            {
                path: 'customer-information-register', component: CustomerInformationRegisterComponent, canActivate: [AuthGuard]
            },
            {
                path: 'customer-confirm-info', component: CustomerConfirmInfoComponent, canActivate: [AuthGuard]
            },
            {
                path: 'customer-esign-confirm', component: CustomerEsignConfirmComponent, canActivate: [AuthGuard]
            },
            {
                path: 'customer-pin-install', component: CustomerPinInstallComponent, canActivate: [AuthGuard]
            },
            {
                path: 'checkout-detail-bill',component: CheckoutDetailBillComponent, canActivate: [AuthGuard]
            },
            // {
            //     path: 'electronic-contract', component: ElectronicContractComponent
            // },
            {
                path: 'picture-selfie', component: PictureSelfieComponent
            },
            {
                path: 'error-server', component: ErrorServerComponent
            },
            {
                path: 'citizen-card', component: CitizenCardComponent
            },
            {
                path: 'forgot-pin-phone', component: ForgotPinPhoneComponent
            },
            {
                path: 'forgot-pin-card-id', component: ForgotPinCardIdComponent
            },
            {
                path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]
            },
            {
                path: 'checkout-confirm', component: CheckoutConfirmComponent
            },
            {
                path: 'checkout-finish', component: CheckoutFinishComponent, canActivate: [AuthGuard]
            },
            {
                path: 'checkout-not-enough-credit', component: CheckoutNotEnoughCreditComponent, canActivate: [AuthGuard]
            }
        ]
    },
    {
        path: '**', component: PageNotFoundComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayMockRoutingModule { }
