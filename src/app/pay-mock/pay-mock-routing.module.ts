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
// import {CustomerInformationFinishComponent} from "./customer-information-finish/customer-information-finish.component";
import {
    CustomerInformationRegisterComponent
} from "./customer-information-register/customer-information-register.component";
import {CustomerEsignConfirmComponent} from "./customer-esign-confirm/customer-esign-confirm.component";
import {CustomerPinInstallComponent} from "./customer-pin-install/customer-pin-install.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {PictureSelfieComponent} from "./picture-selfie/picture-selfie.component";
import {CitizenCardComponent} from "./citizen-card/citizen-card.component";
import {AuthBnplGuard} from "./auth-bnpl.guard";
import {ForgotPinPhoneComponent} from "./forgot-pin-phone/forgot-pin-phone.component";
import {ForgotPinCardIdComponent} from "./forgot-pin-card-id/forgot-pin-card-id.component";
import {CheckoutConfirmComponent} from "./checkout-confirm/checkout-confirm.component";
import {CheckoutFinishComponent} from "./checkout-finish/checkout-finish.component";
import {CheckoutNotEnoughCreditComponent} from "./checkout-not-enough-credit/checkout-not-enough-credit.component";
import {ForgotPinOtpComponent} from "./forgot-pin-otp/forgot-pin-otp.component";
import {ForgotPinPinComponent} from "./forgot-pin-pin/forgot-pin-pin.component";
import {ForgotPinSuccessComponent} from "./forgot-pin-success/forgot-pin-success.component";
import {ForgotPinFailComponent} from "./forgot-pin-fail/forgot-pin-fail.component";

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
                path: 'customer-confirm-info', component: CustomerConfirmInfoComponent, canActivate: [AuthBnplGuard]
            },
            {
                path: 'customer-information-process', component: CustomerInformationProcessComponent, canActivate: [AuthBnplGuard]
            },
            // {
            //     path: 'customer-information-finish', component: CustomerInformationFinishComponent
            // },
            {
                path: 'customer-information-register', component: CustomerInformationRegisterComponent, canActivate: [AuthBnplGuard]
            },
            {
                path: 'customer-confirm-info', component: CustomerConfirmInfoComponent, canActivate: [AuthBnplGuard]
            },
            {
                path: 'customer-esign-confirm', component: CustomerEsignConfirmComponent, canActivate: [AuthBnplGuard]
            },
            {
                path: 'customer-pin-install', component: CustomerPinInstallComponent, canActivate: [AuthBnplGuard]
            },
            // {
            //     path: 'electronic-contract', component: ElectronicContractComponent
            // },
            {
                path: 'picture-selfie', component: PictureSelfieComponent, canActivate: [AuthBnplGuard]
            },
            {
                path: 'citizen-card', component: CitizenCardComponent, canActivate: [AuthBnplGuard]
            },
            {
                path: 'forgot-pin-phone', component: ForgotPinPhoneComponent
            },
            {
                path: 'forgot-pin-card-id', component: ForgotPinCardIdComponent
            },
            {
                path: 'checkout', component: CheckoutComponent, canActivate: [AuthBnplGuard]
            },
            {
                path: 'checkout-confirm', component: CheckoutConfirmComponent, canActivate: [AuthBnplGuard]
            },
            {
                path: 'checkout-finish', component: CheckoutFinishComponent, canActivate: [AuthBnplGuard]
            },
            {
                path: 'checkout-not-enough-credit', component: CheckoutNotEnoughCreditComponent, canActivate: [AuthBnplGuard]
            },
            {
                path: 'forgot-pin-otp', component: ForgotPinOtpComponent
            },
            {
                path: 'forgot-pin-pin', component: ForgotPinPinComponent
            },
            {
                path: 'forgot-pin-success', component: ForgotPinSuccessComponent
            },
            {
                path: 'forgot-pin-fail', component: ForgotPinFailComponent
            }
        ]
    }
    // {
    //     path: '**', component: PageNotFoundComponent
    // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayMockRoutingModule { }
